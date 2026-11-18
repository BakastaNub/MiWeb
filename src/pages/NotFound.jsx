import { Link } from 'react-router-dom';
import { ArrowLeft } from '../components/Icons';

export default function NotFound() {
  return (
    <section className="not-found">
      <p className="section__label">
        <span>404</span> Página no encontrada
      </p>
      <h1>Esta página no existe.</h1>
      <p>
        Puede que el enlace haya cambiado o que el proyecto ya no esté
        disponible.
      </p>
      <Link to="/" className="button button--primary">
        <ArrowLeft size={18} />
        Volver al inicio
      </Link>
    </section>
  );
}
