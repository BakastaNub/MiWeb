import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatFecha, getPagina } from '../lib/content';
import { ArrowLeft } from '../components/Icons';
import NotFound from './NotFound';

export default function Pagina() {
  const { slug } = useParams();
  const pagina = getPagina(slug);

  useEffect(() => {
    if (!pagina) return;
    document.title = `${pagina.titulo} — Wilder Cermeño`;
    return () => {
      document.title = 'Wilder Cermeño — Desarrollador web freelance | Wilsolution';
    };
  }, [pagina]);

  if (!pagina) return <NotFound />;

  return (
    <article className="project-detail">
      <div className="project-detail__inner">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} />
          Volver al inicio
        </Link>

        <header className="project-detail__header">
          {pagina.fecha && (
            <p className="project-detail__domain">{formatFecha(pagina.fecha)}</p>
          )}
          <h1>{pagina.titulo}</h1>
          {pagina.resumen && <p className="project-detail__summary">{pagina.resumen}</p>}
        </header>

        <div className="prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {pagina.contenido || ''}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
