import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  WhatsAppIcon,
} from './Icons';

const REDES = [
  {
    href: 'https://github.com/BakastaNub',
    label: 'GitHub',
    Icon: GitHubIcon,
  },
  {
    href: 'https://www.linkedin.com/in/bakastanub',
    label: 'LinkedIn',
    Icon: LinkedInIcon,
  },
  {
    href: 'https://www.facebook.com/BakastaNub/',
    label: 'Facebook',
    Icon: FacebookIcon,
  },
  {
    href: 'https://www.instagram.com/wilsolution26',
    label: 'Instagram',
    Icon: InstagramIcon,
  },
];

const WHATSAPP_MESSAGE =
  'Hola Wilder, vi tu web y me gustaría hablar sobre un proyecto.';

export default function Contacto() {
  const whatsappHref = `/api/whatsapp?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <footer id="contacto" className="contact" aria-labelledby="contacto-title">
      <div className="contact__inner">
        <div className="contact__head">
          <p className="section__label section__label--light">
            <span>04</span> Contacto
          </p>
          <h2 id="contacto-title" className="contact__title">
            ¿Construimos algo juntos?
          </h2>
          <p className="contact__lead">
            Cuéntame qué necesitas y te responderé lo antes posible. Puedes
            escribirme por WhatsApp o por email.
          </p>
        </div>

        <div className="contact__actions">
          <a
            className="button button--accent"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={20} />
            Escribir por WhatsApp
          </a>
          <a className="button button--outline" href="mailto:admin@wilsolution.com">
            <MailIcon size={18} />
            admin@wilsolution.com
          </a>
        </div>

        <div className="contact__details">
          <p className="contact__location">
            <MapPinIcon size={18} />
            Valencia, España
          </p>

          <ul className="contact__social">
            {REDES.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact__bottom">
          <p>
            © {new Date().getFullYear()} Wilder Cermeño · Wilsolution
          </p>
          <p className="contact__signature">Diseñado y desarrollado en Valencia.</p>
        </div>
      </div>
    </footer>
  );
}
