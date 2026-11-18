import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { loadEnv } from 'vite';

const execFileAsync = promisify(execFile);
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_BODY = 2 * 1024 * 1024;

function send(res, status, payload, type = 'application/json; charset=utf-8') {
  res.statusCode = status;
  res.setHeader('Content-Type', type);
  res.setHeader('Cache-Control', 'no-store');
  res.end(typeof payload === 'string' ? payload : JSON.stringify(payload));
}

function isLocal(request) {
  const address = request.socket.remoteAddress || '';
  return (
    address === '127.0.0.1' ||
    address === '::1' ||
    address === '::ffff:127.0.0.1'
  );
}

async function readBody(request) {
  let body = '';
  for await (const chunk of request) {
    body += chunk;
    if (body.length > MAX_BODY) {
      throw new Error('El contenido supera el tamaño máximo permitido.');
    }
  }
  if (!body) return {};
  return JSON.parse(body);
}

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(file, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return fallback;
    throw error;
  }
}

async function writeJson(file, data) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.tmp`;
  await fs.writeFile(temporary, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  await fs.rename(temporary, file);
}

function cleanText(value, field) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`El campo "${field}" es obligatorio.`);
  }
  return value.trim();
}

function normalizeTechnologies(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.map((item) => String(item).trim()).filter(Boolean))];
}

function validateProject(input, index) {
  const slug = cleanText(input.slug, `slug del proyecto ${index + 1}`);
  if (!SLUG_RE.test(slug)) {
    throw new Error(`Slug inválido en el proyecto ${index + 1}: "${slug}".`);
  }

  const url = cleanText(input.url, `url del proyecto ${index + 1}`);
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error();
  } catch {
    throw new Error(`URL inválida en el proyecto ${index + 1}: "${url}".`);
  }

  return {
    slug,
    nombre: cleanText(input.nombre, `nombre del proyecto ${index + 1}`),
    descripcion: cleanText(input.descripcion, `descripción del proyecto ${index + 1}`),
    url,
    tecnologias: normalizeTechnologies(input.tecnologias),
    imagen: typeof input.imagen === 'string' ? input.imagen.trim() : '',
    anio: String(input.anio || '').trim(),
    destacado: Boolean(input.destacado),
    contenido: typeof input.contenido === 'string' ? input.contenido : '',
  };
}

function validatePage(input) {
  const slug = cleanText(input.slug, 'slug de la página');
  if (!SLUG_RE.test(slug)) {
    throw new Error(`Slug inválido: "${slug}". Usa minúsculas y guiones.`);
  }

  return {
    slug,
    titulo: cleanText(input.titulo, 'título de la página'),
    resumen: typeof input.resumen === 'string' ? input.resumen.trim() : '',
    fecha: typeof input.fecha === 'string' ? input.fecha.trim() : '',
    publicada: input.publicada !== false,
    contenido: typeof input.contenido === 'string' ? input.contenido : '',
  };
}

async function readPages(directory) {
  try {
    const files = await fs.readdir(directory);
    const pages = await Promise.all(
      files
        .filter((file) => file.endsWith('.json'))
        .map(async (file) => {
          const data = await readJson(path.join(directory, file), {});
          return { ...data, slug: data.slug || file.replace(/\.json$/, '') };
        })
    );
    return pages.sort((a, b) => String(b.fecha).localeCompare(String(a.fecha)));
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function gitInfo(root) {
  try {
    const [status, diff, log] = await Promise.all([
      execFileAsync('git', ['status', '--short'], { cwd: root }),
      execFileAsync('git', ['diff', '--', 'src/data'], { cwd: root }),
      execFileAsync('git', ['log', '--oneline', '-6'], { cwd: root }),
    ]);
    return {
      status: status.stdout.trim(),
      diff: diff.stdout.trim(),
      log: log.stdout.trim(),
    };
  } catch (error) {
    return { status: '', diff: '', log: '', error: error.message };
  }
}

export default function contentApiPlugin() {
  return {
    name: 'wilsolution-content-api',
    apply: 'serve',
    configureServer(server) {
      const root = server.config.root;
      const proyectosFile = path.join(root, 'src', 'data', 'proyectos.json');
      const pagesDirectory = path.join(root, 'src', 'data', 'paginas');
      const env = loadEnv(server.config.mode, root, '');
      const whatsapp = (env.WHATSAPP_NUMBER || process.env.WHATSAPP_NUMBER || '')
        .replace(/\D/g, '');

      server.middlewares.use(async (request, response, next) => {
        const url = new URL(request.url, 'http://localhost');
        const pathname = decodeURIComponent(url.pathname);

        if (pathname === '/api/whatsapp') {
          const text =
            url.searchParams.get('text') ||
            'Hola Wilder, vi tu web y me gustaría hablar de un proyecto.';

          if (!whatsapp) {
            return send(
              response,
              503,
              'WhatsApp no está configurado en local. Añade WHATSAPP_NUMBER a tu .env.'
            );
          }

          response.statusCode = 302;
          response.setHeader(
            'Location',
            `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`
          );
          response.setHeader('Cache-Control', 'no-store');
          return response.end();
        }

        if (!pathname.startsWith('/__dev/')) return next();

        if (!isLocal(request)) {
          return send(response, 403, { error: 'Solo disponible en local.' });
        }

        try {
          if (methodIs(request, 'GET') && pathname === '/__dev/data') {
            const [proyectos, paginas] = await Promise.all([
              readJson(proyectosFile, []),
              readPages(pagesDirectory),
            ]);
            return send(response, 200, { proyectos, paginas });
          }

          if (methodIs(request, 'PUT') && pathname === '/__dev/proyectos') {
            const body = await readBody(request);
            if (!Array.isArray(body.proyectos)) {
              return send(response, 400, { error: 'Formato de proyectos inválido.' });
            }
            const proyectos = body.proyectos.map(validateProject);
            const slugs = new Set();
            for (const proyecto of proyectos) {
              if (slugs.has(proyecto.slug)) {
                return send(response, 400, {
                  error: `Slug duplicado: "${proyecto.slug}".`,
                });
              }
              slugs.add(proyecto.slug);
            }
            await writeJson(proyectosFile, proyectos);
            return send(response, 200, { ok: true, proyectos });
          }

          if (methodIs(request, 'PUT') && pathname === '/__dev/paginas') {
            const body = await readBody(request);
            const page = validatePage(body.pagina || {});
            await writeJson(path.join(pagesDirectory, `${page.slug}.json`), page);
            return send(response, 200, { ok: true, pagina: page });
          }

          if (methodIs(request, 'DELETE') && pathname === '/__dev/paginas') {
            const slug = url.searchParams.get('slug') || '';
            if (!SLUG_RE.test(slug)) {
              return send(response, 400, { error: 'Slug inválido.' });
            }
            await fs.rm(path.join(pagesDirectory, `${slug}.json`), { force: true });
            return send(response, 200, { ok: true });
          }

          if (methodIs(request, 'GET') && pathname === '/__dev/git') {
            return send(response, 200, await gitInfo(root));
          }

          return send(response, 404, { error: 'Ruta no encontrada.' });
        } catch (error) {
          return send(response, 400, { error: error.message });
        }
      });
    },
  };
}

function methodIs(request, method) {
  return request.method === method;
}
