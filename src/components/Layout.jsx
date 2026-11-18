import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import Contacto from './Contacto';

export default function Layout() {
  return (
    <div className="site">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Nav />
      <main id="contenido" className="site__main">
        <Outlet />
      </main>
      <Contacto />
    </div>
  );
}
