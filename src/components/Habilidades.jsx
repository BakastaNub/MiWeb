import { habilidades } from '../lib/content';

export default function Habilidades() {
  const categorias = Object.entries(habilidades);

  return (
    <section
      id="habilidades"
      className="section skills"
      aria-labelledby="habilidades-title"
    >
      <div className="section__head">
        <p className="section__label">
          <span>02</span> Habilidades
        </p>
      </div>

      <div className="skills__header">
        <h2 id="habilidades-title" className="section__title">
          Tecnologías con las que trabajo.
        </h2>
        <p className="section__intro">
          Herramientas que uso a diario para llevar un proyecto desde la idea
          hasta la publicación, cuidando el frontend, el backend y los datos.
        </p>
      </div>

      <div className="skills__grid">
        {categorias.map(([categoria, items]) => (
          <div key={categoria} className="skills__group">
            <h3 className="skills__category">{categoria}</h3>
            <ul className="skills__list">
              {items.map((skill) => (
                <li key={skill.nombre} className="skills__item">
                  <span
                    className="skills__dot"
                    style={{ backgroundColor: skill.color }}
                    aria-hidden="true"
                  />
                  {skill.nombre}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
