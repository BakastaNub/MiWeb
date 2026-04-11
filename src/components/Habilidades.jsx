import habilidades from '../data/habilidades.json';

const getIconClass = (icono) => {
  if (icono.startsWith('fab')) return icono;
  if (icono.startsWith('fas')) return icono;
  
  const brandIcons = ['fa-node', 'fa-github', 'fa-css3', 'fa-html5', 'fa-js', 'fa-react', 'fa-sass', 'fa-git-alt'];
  if (brandIcons.includes(icono)) return `fab ${icono}`;
  return `fas ${icono}`;
};

export default function Habilidades() {
  const categories = Object.keys(habilidades);

  return (
    <section id="habilidades" className="habilidades">
      <h2 className="section__title">Habilidades</h2>
      <div className="habilidades__container">
        {categories.map((category) => (
          <div key={category} className="habilidades__category">
            <h3 className="habilidades__category-title">{category}</h3>
            <div className="habilidades__grid">
              {habilidades[category].map((skill, index) => (
                <div key={index} className="habilidades__skill">
                  <i
                    className={getIconClass(skill.icono)}
                    style={{ color: skill.color }}
                  />
                  <span>{skill.nombre}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}