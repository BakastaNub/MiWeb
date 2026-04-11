import { useState } from 'react';

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
  };

  const SOCIAL_LINKS = [
    { href: 'https://github.com/BakastaNub', icon: 'fab fa-github', label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/bakastanub', icon: 'fab fa-linkedin', label: 'LinkedIn' },
    { href: 'https://www.facebook.com/BakastaNub/', icon: 'fab fa-facebook', label: 'Facebook' },
    { href: 'https://www.instagram.com/wilsolution26', icon: 'fab fa-instagram', label: 'Instagram' },
  ];

  return (
    <footer id="contacto" className="contacto">
      <div className="contacto__container">
        <h2 className="section__title">Contacto</h2>
        
        <div className="contacto__info">
          <div className="contacto__item">
            <i className="fas fa-phone" />
            <span>+34 672 557 569</span>
          </div>
          <div className="contacto__item">
            <i className="fas fa-envelope" />
            <span>wildercermenoes@gmail.com</span>
          </div>
          <div className="contacto__item">
            <i className="fas fa-map-marker-alt" />
            <span>Valencia, España</span>
          </div>
        </div>

        <form className="contacto__form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="mensaje"
            placeholder="Mensaje"
            value={form.mensaje}
            onChange={handleChange}
            required
          />
          <button type="submit" className="contacto__btn">Enviar</button>
        </form>

        <div className="contacto__social">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              <i className={link.icon} />
            </a>
          ))}
        </div>
      </div>
      
      <div className="contacto__bottom">
        <p>&copy; {new Date().getFullYear()} Wilder Cermeño | Wilsolution. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}