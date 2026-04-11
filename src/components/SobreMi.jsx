export default function SobreMi() {
  return (
    <section id="sobre-mi" className="sobre-mi">
      <div className="sobre-mi__container">
        <div className="sobre-mi__image">
          <img src="/img/about.png" alt="Wilsolution" loading="lazy" />
        </div>
        <div className="sobre-mi__content">
          <h2 className="section__title">Sobre Mí</h2>
          <p className="sobre-mi__description">
            Técnico Superior en Informática con Especialización en Gestión de Bases de Datos y Desarrollo Web
          </p>
          <p>
            Soy un profesional apasionado por las tecnologías de la información, con una sólida formación en la gestión y optimización de bases de datos, especialmente en MySQL y SQL. He desarrollado una amplia experiencia en el diseño, implementación y mantenimiento de soluciones de bases de datos que respaldan operaciones eficientes y garantizan la integridad de los datos.
          </p>
          <p>
            Mi enfoque en la optimización de consultas ha permitido mejorar significativamente el rendimiento de los sistemas de información en diversos proyectos. Además, tengo habilidades destacadas en desarrollo web, trabajando con SCSS, HTML y JavaScript para crear aplicaciones atractivas y funcionales.
          </p>
          <div className="sobre-mi__info">
            <div className="sobre-mi__item">
              <span className="sobre-mi__label">Ubicación</span>
              <span>Valencia, España</span>
            </div>
            <div className="sobre-mi__item">
              <span className="sobre-mi__label">Enfoque</span>
              <span>Desarrollo Web & Base de Datos</span>
            </div>
            <div className="sobre-mi__item">
              <span className="sobre-mi__label">Disponibilidad</span>
              <span>Disponible para proyectos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}