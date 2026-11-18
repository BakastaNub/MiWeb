# Wilsolution — web personal de Wilder Cermeño

Portafolio y web de servicios de desarrollo web freelance. Sitio estático en
React + Vite, desplegado en Netlify, con contenido versionado en archivos JSON
dentro del repositorio.

## Stack

- React 19 + Vite
- React Router
- React Markdown + remark-gfm para los casos de proyecto y páginas
- CSS propio (sin frameworks)
- Netlify Functions para el enlace privado de WhatsApp

## Desarrollo

```bash
npm install
npm run dev
```

La web estará en `http://localhost:5173`.

## Contenido

- `src/data/proyectos.json`: proyectos del portafolio. Cada uno puede tener
  `slug`, `nombre`, `descripcion`, `url`, `tecnologias`, `imagen`, `anio`,
  `destacado` y `contenido` en Markdown.
- `src/data/paginas/*.json`: páginas independientes (se publican en
  `/paginas/:slug`).
- `src/data/habilidades.json`: categorías y tecnologías.

Los proyectos con `contenido` generan una página de detalle en
`/proyectos/:slug`. Si no hay imagen propia, se usa el favicon del sitio del
proyecto.

## Panel local

Con `npm run dev` puedes abrir `http://localhost:5173/admin`.

El panel escribe directamente en `src/data` y muestra el diff de Git para que
revises y commitees tú. No existe en producción: solo está disponible en el
servidor de desarrollo local.

## Contacto

- WhatsApp mediante `/api/whatsapp`, que redirige a `wa.me` usando la variable
  de entorno `WHATSAPP_NUMBER` configurada en Netlify. El número no aparece en
  el código ni en el HTML.
- Email: admin@wilsolution.com
- Redes sociales enlazadas en el pie de página.

## Build y despliegue

```bash
npm run build
npm run preview
```

Netlify usa `netlify.toml`:

- build: `npm run build`
- publish: `dist`
- functions: `netlify/functions`
- redirect `/api/whatsapp` → función
- fallback SPA a `index.html`

## Variables de entorno

| Variable | Dónde | Uso |
| --- | --- | --- |
| `WHATSAPP_NUMBER` | Netlify (y `.env` local opcional) | Número con prefijo de país, solo dígitos |

## Estructura

```
src/
  components/   navegación, secciones, tarjetas, iconos y contacto
  data/         proyectos, habilidades y páginas
  lib/          contenido y cliente del panel local
  pages/        inicio, detalle, página, 404 y admin
  index.css     sistema visual completo
tools/          plugin de Vite para el panel local
netlify/        función de WhatsApp
```
