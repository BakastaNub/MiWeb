import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  getDominio,
  getFavicon,
  getTechLabel,
  getProyecto,
  getSiguienteProyecto,
} from '../lib/content';
import { ArrowLeft, ArrowUpRight } from '../components/Icons';
import NotFound from './NotFound';

export default function ProyectoDetalle() {
  const { slug } = useParams();
  const proyecto = getProyecto(slug);
  const siguiente = proyecto ? getSiguienteProyecto(slug) : null;

  useEffect(() => {
    if (!proyecto) return;
    document.title = `${proyecto.nombre} — Wilder Cermeño`;
    return () => {
      document.title = 'Wilder Cermeño — Desarrollador web freelance | Wilsolution';
    };
  }, [proyecto]);

  if (!proyecto) return <NotFound />;

  return (
    <article className="project-detail">
      <div className="project-detail__inner">
        <Link to="/#proyectos" className="back-link">
          <ArrowLeft size={18} />
          Volver a proyectos
        </Link>

        <header className="project-detail__header">
          <div className="project-detail__icon">
            <img src={getFavicon(proyecto.url, 128)} alt="" />
          </div>
          <p className="project-detail__domain">{getDominio(proyecto.url)}</p>
          <h1>{proyecto.nombre}</h1>
          <p className="project-detail__summary">{proyecto.descripcion}</p>

          <div className="project-detail__meta">
            {proyecto.anio && (
              <div>
                <span>Año</span>
                <strong>{proyecto.anio}</strong>
              </div>
            )}
            <div>
              <span>Stack</span>
              <strong>
                {proyecto.tecnologias.map(getTechLabel).join(' · ') || '—'}
              </strong>
            </div>
            <div>
              <span>Sitio</span>
              <a href={proyecto.url} target="_blank" rel="noopener noreferrer">
                Visitar web
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </header>

        <div className="prose">
          {proyecto.contenido ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {proyecto.contenido}
            </ReactMarkdown>
          ) : (
            <p>{proyecto.descripcion}</p>
          )}
        </div>

        {siguiente && siguiente.slug !== proyecto.slug && (
          <aside className="project-detail__next">
            <p className="section__label">
              <span>→</span> Siguiente proyecto
            </p>
            <Link to={`/proyectos/${siguiente.slug}`} className="next-link">
              <span>{siguiente.nombre}</span>
              <ArrowUpRight size={22} />
            </Link>
          </aside>
        )}
      </div>
    </article>
  );
}
