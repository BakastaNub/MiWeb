import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getDominio,
  getFavicon,
  getFaviconFallback,
  getTechLabel,
} from '../lib/content';
import { ArrowUpRight } from './Icons';

export default function ProjectCard({ proyecto, index }) {
  const [icon, setIcon] = useState(() => getFavicon(proyecto.url, 128));
  const [failed, setFailed] = useState(false);
  const tienePagina = Boolean(proyecto.contenido?.trim());

  const handleError = () => {
    if (failed) return;
    setFailed(true);
    setIcon(getFaviconFallback(proyecto.url, 128));
  };

  const content = (
    <>
      <div className="card__media">
        <span className="card__index">{String(index + 1).padStart(2, '0')}</span>
        <div className="card__icon">
          <img src={icon} alt="" loading="lazy" onError={handleError} />
        </div>
      </div>

      <div className="card__body">
        <div className="card__title-row">
          <h3 className="card__title">{proyecto.nombre}</h3>
          <span className="card__arrow" aria-hidden="true">
            <ArrowUpRight size={20} />
          </span>
        </div>
        <p className="card__description">{proyecto.descripcion}</p>
        <div className="card__meta">
          <span className="card__domain">{getDominio(proyecto.url)}</span>
          <ul className="card__tags" aria-label="Tecnologías">
            {proyecto.tecnologias.map((tech) => (
              <li key={tech}>{getTechLabel(tech)}</li>
            ))}
          </ul>
        </div>
        <span className="card__hint">
          {tienePagina ? 'Ver caso completo' : 'Visitar sitio'}
        </span>
      </div>
    </>
  );

  return (
    <article className="card">
      {tienePagina ? (
        <Link to={`/proyectos/${proyecto.slug}`} className="card__hit">
          {content}
        </Link>
      ) : (
        <a
          href={proyecto.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card__hit"
        >
          {content}
        </a>
      )}
    </article>
  );
}
