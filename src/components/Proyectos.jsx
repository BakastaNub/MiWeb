import { useState } from 'react';
import proyectos from '../data/proyectos.json';

const techIcons = {
  html: { icon: 'fab fa-html5', color: '#ff7300' },
  css: { icon: 'fab fa-css3', color: '#1572B6' },
  js: { icon: 'fab fa-js', color: '#F7DF1E' },
  sass: { icon: 'fab fa-sass', color: '#CC6699' },
  react: { icon: 'fab fa-react', color: '#61DAFB' },
  node: { icon: 'fab fa-node-js', color: '#339933' },
  mysql: { icon: 'fas fa-server', color: '#4479A1' },
  supabase: { icon: 'fas fa-boxes-stacked', color: '#3ECF8E' },
};

const getDomain = (url) => {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
};

const getFaviconUrl = (url) => {
  const domain = getDomain(url);
  return `https://geticon.dev/api/icon?domain=${domain}&size=64`;
};

export default function Proyectos() {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (index) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section id="proyectos" className="proyectos">
      <h2 className="section__title">Proyectos</h2>
      <div className="proyectos__grid">
        {proyectos.map((proyecto, index) => (
          <div
            key={index}
            className={`proyecto-card ${flippedCards[index] ? 'flipped' : ''}`}
            onClick={() => toggleFlip(index)}
            onMouseEnter={() => window.innerWidth >= 768 && toggleFlip(index)}
            onMouseLeave={() => window.innerWidth >= 768 && toggleFlip(index)}
          >
            <div className="proyecto-card__inner">
              <div className="proyecto-card__front">
                <div className="proyecto-card__icon">
                  <img
                    src={getFaviconUrl(proyecto.url)}
                    alt={proyecto.nombre}
                    loading="lazy"
                  />
                </div>
                <h3>{proyecto.nombre}</h3>
                <span className="proyecto-card__domain">{getDomain(proyecto.url)}</span>
              </div>
              <div className="proyecto-card__back">
                <h3>{proyecto.nombre}</h3>
                <p>{proyecto.descripcion}</p>
                <div className="proyecto-card__techs">
                  {proyecto.tecnologias.map((tech) => (
                    <span
                      key={tech}
                      className="proyecto-card__tech"
                      style={{ color: techIcons[tech]?.color || '#22d3ee' }}
                    >
                      <i className={techIcons[tech]?.icon} />
                    </span>
                  ))}
                </div>
                <a
                  href={proyecto.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proyecto-card__btn"
                >
                  Ver Proyecto
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}