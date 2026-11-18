import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import ProyectoDetalle from './pages/ProyectoDetalle';
import Pagina from './pages/Pagina';
import NotFound from './pages/NotFound';

const Admin = import.meta.env.DEV ? lazy(() => import('./pages/Admin')) : null;

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos/:slug" element={<ProyectoDetalle />} />
          <Route path="/paginas/:slug" element={<Pagina />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {import.meta.env.DEV && Admin && (
          <Route
            path="/admin"
            element={
              <Suspense fallback={<div className="admin-loading">Cargando panel…</div>}>
                <Admin />
              </Suspense>
            }
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}
