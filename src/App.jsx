import Nav from './components/Nav';
import Hero from './components/Hero';
import SobreMi from './components/SobreMi';
import Habilidades from './components/Habilidades';
import Proyectos from './components/Proyectos';
import Contacto from './components/Contacto';
import './index.css';

function App() {
  return (
    <main>
      <Nav />
      <Hero />
      <SobreMi />
      <Habilidades />
      <Proyectos />
      <Contacto />
    </main>
  );
}

export default App;