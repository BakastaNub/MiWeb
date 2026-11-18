import { useMemo, useState } from 'react';
import { getTechLabel, proyectos } from '../lib/content';
import ProjectCard from './ProjectCard';

export default function Proyectos() {
  const tecnologias = useMemo(() => {
    const set = new Set();
    proyectos.forEach((proyecto) => {
      proyecto.tecnologias.forEach((tech) => set.add(tech));
    });
    return [...set].sort((a, b) => getTechLabel(a).localeCompare(getTechLabel(b)));
  }, []);

  const [filtro, setFiltro] = useState('todos');

  const visibles =
    filtro === 'todos'
      ? proyectos
      : proyectos.filter((proyecto) => proyecto.tecnologias.includes(filtro));

  return (
    <section
      id="proyectos"
      className="section projects"
      aria-labelledby="proyectos-title"
    >
      <div className="section__head">
        <p className="section__label">
          <span>03</span> Proyectos
        </p>
      </div>

      <div className="projects__header">
        <h2 id="proyectos-title" className="section__title">
          Trabajo seleccionado.
        </h2>
        <p className="section__intro">
          Una muestra de webs y aplicaciones que he diseñado y desarrollado.
          Entra en cada proyecto para ver el contexto y las decisiones técnicas.
        </p>
      </div>

      <div className="projects__filters" role="group" aria-label="Filtrar proyectos">
        <button
          type="button"
          className={`filter ${filtro === 'todos' ? 'is-active' : ''}`}
          onClick={() => setFiltro('todos')}
          aria-pressed={filtro === 'todos'}
        >
          Todos
          <span className="filter__count">{proyectos.length}</span>
        </button>
        {tecnologias.map((tech) => {
          const count = proyectos.filter((proyecto) =>
            proyecto.tecnologias.includes(tech)
          ).length;
          return (
            <button
              key={tech}
              type="button"
              className={`filter ${filtro === tech ? 'is-active' : ''}`}
              onClick={() => setFiltro(tech)}
              aria-pressed={filtro === tech}
            >
              {getTechLabel(tech)}
              <span className="filter__count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="projects__grid">
        {visibles.map((proyecto, index) => (
          <ProjectCard key={proyecto.slug} proyecto={proyecto} index={index} />
        ))}
      </div>
    </section>
  );
}
