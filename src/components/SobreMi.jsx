const FACTS = [
  { label: 'Ubicación', value: 'Valencia, España' },
  { label: 'Especialidad', value: 'Desarrollo web y bases de datos' },
  { label: 'Disponibilidad', value: 'Proyectos freelance' },
];

export default function SobreMi() {
  return (
    <section id="sobre-mi" className="section about" aria-labelledby="sobre-mi-title">
      <div className="section__head">
        <p className="section__label">
          <span>01</span> Sobre mí
        </p>
      </div>

      <div className="about__grid">
        <div className="about__intro">
          <h2 id="sobre-mi-title" className="section__title">
            Técnica, criterio y detalle en cada proyecto.
          </h2>
          <p className="about__lead">
            Soy Wilder, desarrollador web freelance con formación en informática
            y especialización en gestión de bases de datos.
          </p>
        </div>

        <div className="about__body">
          <p>
            Llevo años construyendo soluciones donde el diseño y los datos van de
            la mano: desde landings y portfolios hasta aplicaciones conectadas a
            MySQL y Supabase. Me interesa que cada interfaz sea fácil de usar y
            que lo que hay debajo sea igual de sólido.
          </p>
          <p>
            Trabajo con HTML, CSS, JavaScript, React y Node.js, y cuido la
            optimización de consultas y la estructura de la información tanto
            como la tipografía o el espaciado. Si buscas a alguien que entienda el
            proyecto completo, no solo una parte, hablemos.
          </p>
        </div>
      </div>

      <div className="about__layout">
        <figure className="about__figure">
          <img
            src="/img/about.png"
            alt="Wilder Cermeño trabajando en un proyecto web"
            loading="lazy"
            width="900"
            height="900"
          />
          <figcaption>Valencia · Freelance · Disponible</figcaption>
        </figure>

        <dl className="about__facts">
          {FACTS.map((fact) => (
            <div key={fact.label} className="about__fact">
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
