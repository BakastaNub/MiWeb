import { ArrowUpRight } from './Icons';

const FACTS = [
  { label: 'Base', value: 'Valencia, España' },
  { label: 'Enfoque', value: 'Web y datos' },
  { label: 'Estado', value: 'Disponible' },
];

export default function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero__grid">
        <div className="hero__content">
          <p className="eyebrow">
            <span className="eyebrow__dot" />
            Desarrollador web freelance
          </p>

          <h1 id="hero-title" className="hero__title">
            <span>Wilder</span>
            <span className="hero__title-accent">Cermeño</span>
          </h1>

          <p className="hero__lead">
            Diseño y construyo sitios web claros, rápidos y bien resueltos.
            Desarrollo frontend, aplicaciones React y soluciones con bases de
            datos para negocios y proyectos personales.
          </p>

          <div className="hero__actions">
            <a className="button button--primary" href="#proyectos">
              Ver proyectos
              <ArrowUpRight size={18} />
            </a>
            <a className="button button--ghost" href="#contacto">
              Hablemos de tu idea
            </a>
          </div>

          <dl className="hero__facts">
            {FACTS.map((fact) => (
              <div key={fact.label} className="hero__fact">
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="hero__portrait">
          <div className="hero__portrait-frame">
            <img
              src="/img/perfil.jpg"
              alt="Retrato de Wilder Cermeño"
              width="720"
              height="900"
            />
          </div>
          <figcaption className="hero__caption">
            <span className="hero__caption-dot" />
            Disponible para nuevos proyectos · 2026
          </figcaption>
        </figure>
      </div>

      <div className="hero__marquee" aria-hidden="true">
        <span>Frontend</span>
        <span>·</span>
        <span>Bases de datos</span>
        <span>·</span>
        <span>Diseño web</span>
        <span>·</span>
        <span>React</span>
        <span>·</span>
        <span>Freelance</span>
      </div>
    </section>
  );
}
