import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseAdmin } from '../lib/supabase';

const TECH_OPTIONS = ['html', 'css', 'js', 'sass', 'react', 'node', 'mysql', 'supabase'];

export default function Admin() {
  const navigate = useNavigate();
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ nombre: '', descripcion: '', url: '', tecnologias: [] });
  const [isAdding, setIsAdding] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    const userSession = sessionStorage.getItem('adminUser');
    if (!userSession) {
      navigate('/admin/login');
      return;
    }
    setAdminUser(JSON.parse(userSession));
    fetchProyectos();
  }, []);

  const fetchProyectos = async () => {
    try {
      const { data, error: fetchError } = await supabaseAdmin
        .from('proyectos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (fetchError) {
        console.error('Fetch error:', fetchError);
        setError(fetchError.message);
        setLoading(false);
        return;
      }
      
      setProyectos(data || []);
      setError(null);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError(err.message);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminUser');
    navigate('/');
  };

  const toggleTech = (tech) => {
    setForm(prev => ({
      ...prev,
      tecnologias: prev.tecnologias.includes(tech)
        ? prev.tecnologias.filter(t => t !== tech)
        : [...prev.tecnologias, tech]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editingId) {
      const { error: updateError } = await supabaseAdmin
        .from('proyectos')
        .update(form)
        .eq('id', editingId);
      
      if (updateError) {
        alert('Error al actualizar: ' + updateError.message);
        return;
      }
      setEditingId(null);
    } else {
      const { error: insertError } = await supabaseAdmin
        .from('proyectos')
        .insert([form]);
      
      if (insertError) {
        alert('Error al insertar: ' + insertError.message);
        return;
      }
      setIsAdding(false);
    }
    
    setForm({ nombre: '', descripcion: '', url: '', tecnologias: [] });
    fetchProyectos();
  };

  const handleEdit = (proyecto) => {
    setForm({
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      url: proyecto.url,
      tecnologias: proyecto.tecnologias || []
    });
    setEditingId(proyecto.id);
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar este proyecto?')) {
      const { error: deleteError } = await supabaseAdmin.from('proyectos').delete().eq('id', id);
      
      if (deleteError) {
        alert('Error al eliminar: ' + deleteError.message);
        return;
      }
      fetchProyectos();
    }
  };

  const handleCancel = () => {
    setForm({ nombre: '', descripcion: '', url: '', tecnologias: [] });
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="admin">
      <header className="admin__header">
        <div className="admin__header-left">
          <h1>Panel de Administración</h1>
          {adminUser && (
            <span className="admin__user-email">{adminUser.email}</span>
          )}
        </div>
        <button onClick={handleLogout} className="admin__logout">Cerrar Sesión</button>
      </header>

      <main className="admin__main">
        <section className="admin__form-section">
          <h2>{editingId ? 'Editar Proyecto' : 'Agregar Proyecto'}</h2>
          {!isAdding && !editingId && (
            <button onClick={() => setIsAdding(true)} className="admin__add-btn">
              + Agregar Proyecto
            </button>
          )}
          
          {(isAdding || editingId) && (
            <form onSubmit={handleSubmit} className="admin__form">
              <div className="admin__field">
                <label>Nombre</label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  required
                />
              </div>
              
              <div className="admin__field">
                <label>Descripción</label>
                <textarea
                  value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                  required
                />
              </div>
              
              <div className="admin__field">
                <label>URL</label>
                <input
                  type="url"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  required
                />
              </div>
              
              <div className="admin__field">
                <label>Tecnologías</label>
                <div className="admin__techs">
                  {TECH_OPTIONS.map(tech => (
                    <button
                      key={tech}
                      type="button"
                      className={`admin__tech-btn ${form.tecnologias.includes(tech) ? 'active' : ''}`}
                      onClick={() => toggleTech(tech)}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="admin__actions">
                <button type="submit" className="admin__submit">
                  {editingId ? 'Actualizar' : 'Guardar'}
                </button>
                <button type="button" onClick={handleCancel} className="admin__cancel">
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </section>

        <section className="admin__list-section">
          <h2>Proyectos ({proyectos.length})</h2>
          {error && (
            <div className="admin__error">
              <p>Error: {error}</p>
              <p>Verifica que las políticas RLS permitan operaciones en la tabla proyectos.</p>
            </div>
          )}
          {loading ? (
            <p>Cargando...</p>
          ) : proyectos.length === 0 && !error ? (
            <p className="admin__empty">No hay proyectos. Agrega uno nuevo.</p>
          ) : (
            <div className="admin__list">
              {proyectos.map(proyecto => (
                <div key={proyecto.id} className="admin__item">
                  <div className="admin__item-info">
                    <h3>{proyecto.nombre}</h3>
                    <p>{proyecto.descripcion}</p>
                    <span className="admin__item-url">{proyecto.url}</span>
                    <div className="admin__item-techs">
                      {proyecto.tecnologias?.map(t => (
                        <span key={t} className="admin__tech-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="admin__item-actions">
                    <button onClick={() => handleEdit(proyecto)} className="admin__edit">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(proyecto.id)} className="admin__delete">
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
