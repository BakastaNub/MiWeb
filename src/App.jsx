import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Hero from './components/Hero';
import SobreMi from './components/SobreMi';
import Habilidades from './components/Habilidades';
import Proyectos from './components/Proyectos';
import Contacto from './components/Contacto';
import PrivateRoute from './components/PrivateRoute';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import './index.css';

function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <SobreMi />
      <Habilidades />
      <Proyectos />
      <Contacto />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
