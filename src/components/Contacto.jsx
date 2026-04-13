import { useState } from 'react';
import { supabase } from '../lib/supabase';

const SOCIAL_LINKS = [
  { href: 'https://github.com/BakastaNub', icon: 'fab fa-github', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/bakastanub', icon: 'fab fa-linkedin', label: 'LinkedIn' },
  { href: 'https://www.facebook.com/BakastaNub/', icon: 'fab fa-facebook', label: 'Facebook' },
  { href: 'https://www.instagram.com/wilsolution26', icon: 'fab fa-instagram', label: 'Instagram' },
];

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          nombre: form.nombre,
          email: form.email,
          mensaje: form.mensaje
        }]);

      if (error) throw error;

      setStatus('success');
      setForm({ nombre: '', email: '', mensaje: '' });
      
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('Error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <footer id="contacto" className="contacto" aria-labelledby="contacto-titulo">
      <div className="contacto__container">
        <h2 id="contacto-titulo" className="section__title">Contacto</h2>
        <p>¿Tienes un proyecto en mente? Contáctame para discutir cómo puedo ayudarte a construir tu sitio web o aplicación.</p>
        
        <div className="contacto__info">
          <div className="contacto__item">
            <i className="fas fa-phone" />
            <span>+34 672 557 569</span>
          </div>
          <div className="contacto__item">
            <i className="fas fa-envelope" />
            <span>admin@wilsolution.com</span>
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
          
          {status === 'success' && (
            <div className="contacto__success">
              ¡Mensaje enviado con éxito! Te responderé pronto.
            </div>
          )}
          
          {status === 'error' && (
            <div className="contacto__error">
              Error al enviar. Intenta de nuevo.
            </div>
          )}
          
          <button type="submit" className="contacto__btn" disabled={status === 'loading'}>
            {status === 'loading' ? 'Enviando...' : 'Enviar'}
          </button>
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
