import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, CloseIcon } from './Icons';

const LINKS = [
  { hash: '#sobre-mi', label: 'Sobre mí' },
  { hash: '#habilidades', label: 'Habilidades' },
  { hash: '#proyectos', label: 'Proyectos' },
  { hash: '#contacto', label: 'Contacto' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const hrefFor = (hash) => (isHome ? hash : `/${hash}`);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <Link
          to="/"
          className="brand"
          aria-label="Wilsolution, inicio"
          onClick={() => setOpen(false)}
        >
          <img
            src="/wilsolution.svg"
            alt=""
            className="brand__logo"
            width="54"
            height="34"
          />
          <span className="brand__text">
            Wilsolution<span className="brand__dot">.</span>
          </span>
        </Link>

        <nav className="nav__links" aria-label="Navegación principal">
          {LINKS.map((link) => (
            <a key={link.hash} href={hrefFor(link.hash)} className="nav__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a
            className="nav__cta"
            href={hrefFor('#contacto')}
            aria-label="Ir a contacto"
          >
            Hablemos
          </a>
          <button
            className="nav__toggle"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      <div id="menu-movil" className={`nav__mobile ${open ? 'is-open' : ''}`}>
        <nav aria-label="Navegación móvil">
          {LINKS.map((link) => (
            <a
              key={link.hash}
              href={hrefFor(link.hash)}
              className="nav__mobile-link"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="nav__mobile-note">Valencia, España · Freelance</p>
      </div>
    </header>
  );
}
