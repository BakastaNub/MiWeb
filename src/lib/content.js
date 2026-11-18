import proyectosData from '../data/proyectos.json';
import habilidadesData from '../data/habilidades.json';

const pageModules = import.meta.glob('../data/paginas/*.json', { eager: true });

export const TECH_LABELS = {
  html: 'HTML',
  css: 'CSS',
  js: 'JavaScript',
  sass: 'SASS',
  react: 'React',
  node: 'Node.js',
  mysql: 'MySQL',
  sql: 'SQL',
  supabase: 'Supabase',
  next: 'Next.js',
  vite: 'Vite',
  git: 'Git',
  netlify: 'Netlify',
  typescript: 'TypeScript',
  tailwind: 'Tailwind',
};

export const TECNOLOGIAS = Object.keys(TECH_LABELS).map((value) => ({
  value,
  label: TECH_LABELS[value],
}));

export const proyectos = proyectosData
  .map((proyecto) => ({
    ...proyecto,
    tecnologias: proyecto.tecnologias || [],
    destacado: Boolean(proyecto.destacado),
    contenido: proyecto.contenido || '',
  }))
  .sort((a, b) => Number(b.destacado) - Number(a.destacado));

export const paginas = Object.entries(pageModules)
  .map(([file, module]) => {
    const data = module.default || module;
    const fallbackSlug = file.split('/').pop().replace(/\.json$/, '');
    return {
      ...data,
      slug: data.slug || fallbackSlug,
      publicada: data.publicada !== false,
    };
  })
  .filter((pagina) => pagina.publicada)
  .sort((a, b) => String(b.fecha).localeCompare(String(a.fecha)));

export const habilidades = habilidadesData;

export function getProyecto(slug) {
  return proyectos.find((proyecto) => proyecto.slug === slug);
}

export function getPagina(slug) {
  return paginas.find((pagina) => pagina.slug === slug);
}

export function getSiguienteProyecto(slug) {
  const index = proyectos.findIndex((proyecto) => proyecto.slug === slug);
  if (index === -1) return null;
  return proyectos[(index + 1) % proyectos.length];
}

export function getDominio(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function getFavicon(url, size = 128) {
  return `https://geticon.dev/api/icon?domain=${encodeURIComponent(
    getDominio(url)
  )}&size=${size}`;
}

export function getFaviconFallback(url, size = 128) {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
    getDominio(url)
  )}&sz=${size}`;
}

export function getTechLabel(tech) {
  return TECH_LABELS[tech] || tech;
}

export function formatFecha(fecha) {
  if (!fecha) return '';
  const date = new Date(`${fecha}T00:00:00`);
  if (Number.isNaN(date.getTime())) return fecha;
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
