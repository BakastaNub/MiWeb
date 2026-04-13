export default function Hero() {
  return (
    <section id="inicio" className="hero" role="banner" aria-label="Presentación principal">
      <video autoPlay muted loop className="hero__video" aria-hidden="true">
        <source src="/video/perfil.mp4" type="video/mp4" />
      </video>
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__title">
          <span className="hero__name">Wilder Cermeño <span className="hero__brand">| Wilsolution</span></span>
          <span className="hero__subtitle">Freelancer Desarrollador Web</span>
        </h1>
        <p className="hero__text">Diseño y Desarrollo Web Profesional - Creando experiencias digitales innovadoras en Valencia, España</p>
      </div>
    </section>
  );
}