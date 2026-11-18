import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../lib/adminApi';
import { TECNOLOGIAS } from '../lib/content';
import './Admin.css';

const EMPTY_PROJECT = {
  slug: '',
  nombre: '',
  descripcion: '',
  url: '',
  tecnologias: [],
  imagen: '',
  anio: '',
  destacado: false,
  contenido: '',
};

const EMPTY_PAGE = {
  slug: '',
  titulo: '',
  resumen: '',
  fecha: new Date().toISOString().slice(0, 10),
  publicada: true,
  contenido: '',
};

const GIT_COMMANDS = [
  'git add src/data',
  'git commit -m "Actualiza contenido de la web"',
  'git push',
].join('\n');

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function Admin() {
  const [tab, setTab] = useState('proyectos');
  const [data, setData] = useState({ proyectos: [], paginas: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [projectDraft, setProjectDraft] = useState(null);
  const [projectIndex, setProjectIndex] = useState(-1);
  const [pageDraft, setPageDraft] = useState(null);
  const [pageOriginalSlug, setPageOriginalSlug] = useState('');
  const [git, setGit] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const payload = await adminApi.getData();
      setData({
        proyectos: payload.proyectos || [],
        paginas: payload.paginas || [],
      });
      setError('');
    } catch (err) {
      setError(
        `${err.message}. El panel solo funciona con "npm run dev" en tu equipo.`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    document.title = 'Panel local — Wilsolution';
  }, []);

  useEffect(() => {
    if (tab !== 'git') return;
    adminApi
      .getGit()
      .then(setGit)
      .catch((err) => setError(err.message));
  }, [tab]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(''), 4000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const startNewProject = () => {
    setProjectDraft({ ...EMPTY_PROJECT, tecnologias: [] });
    setProjectIndex(-1);
  };

  const editProject = (proyecto, index) => {
    setProjectDraft({ ...proyecto, tecnologias: [...proyecto.tecnologias] });
    setProjectIndex(index);
  };

  const handleProjectChange = (field, value) => {
    setProjectDraft((draft) => ({ ...draft, [field]: value }));
  };

  const handleProjectName = (value) => {
    setProjectDraft((draft) => {
      const shouldSyncSlug = !draft.slug || draft.slug === slugify(draft.nombre);
      return {
        ...draft,
        nombre: value,
        slug: shouldSyncSlug ? slugify(value) : draft.slug,
      };
    });
  };

  const toggleTech = (tech) => {
    setProjectDraft((draft) => ({
      ...draft,
      tecnologias: draft.tecnologias.includes(tech)
        ? draft.tecnologias.filter((item) => item !== tech)
        : [...draft.tecnologias, tech],
    }));
  };

  const saveProject = async (event) => {
    event.preventDefault();
    if (!projectDraft) return;
    setSaving(true);
    try {
      const proyectos = [...data.proyectos];
      if (projectIndex >= 0) {
        proyectos[projectIndex] = projectDraft;
      } else {
        proyectos.push(projectDraft);
      }
      const payload = await adminApi.saveProyectos(proyectos);
      setData((current) => ({ ...current, proyectos: payload.proyectos }));
      setProjectDraft(null);
      setProjectIndex(-1);
      setNotice('Proyecto guardado en src/data/proyectos.json.');
      if (tab === 'git') {
        adminApi.getGit().then(setGit).catch(() => {});
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async (index) => {
    const proyecto = data.proyectos[index];
    if (!window.confirm(`¿Eliminar "${proyecto.nombre}" del listado?`)) return;
    setSaving(true);
    try {
      const proyectos = data.proyectos.filter((_, i) => i !== index);
      const payload = await adminApi.saveProyectos(proyectos);
      setData((current) => ({ ...current, proyectos: payload.proyectos }));
      setNotice('Proyecto eliminado. Revisa el cambio y commitea.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const startNewPage = () => {
    setPageDraft({ ...EMPTY_PAGE });
    setPageOriginalSlug('');
  };

  const editPage = (pagina) => {
    setPageDraft({ ...pagina });
    setPageOriginalSlug(pagina.slug);
  };

  const handlePageChange = (field, value) => {
    setPageDraft((draft) => {
      const shouldSyncSlug = !draft.slug || draft.slug === slugify(draft.titulo);
      return {
        ...draft,
        [field]: value,
        ...(field === 'titulo' && shouldSyncSlug ? { slug: slugify(value) } : {}),
      };
    });
  };

  const savePage = async (event) => {
    event.preventDefault();
    if (!pageDraft) return;
    setSaving(true);
    try {
      await adminApi.savePagina(pageDraft);
      if (pageOriginalSlug && pageOriginalSlug !== pageDraft.slug) {
        await adminApi.deletePagina(pageOriginalSlug);
      }
      await loadData();
      setPageDraft(null);
      setPageOriginalSlug('');
      setNotice('Página guardada en src/data/paginas/.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const deletePage = async (slug) => {
    if (!window.confirm(`¿Eliminar la página "${slug}"?`)) return;
    setSaving(true);
    try {
      await adminApi.deletePagina(slug);
      await loadData();
      setNotice('Página eliminada.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const copyCommands = async () => {
    try {
      await navigator.clipboard.writeText(GIT_COMMANDS);
      setNotice('Comandos copiados al portapapeles.');
    } catch {
      setNotice('No se pudo copiar. Selecciona el texto manualmente.');
    }
  };

  return (
    <div className="admin">
      <header className="admin__header">
        <div>
          <p className="admin__eyebrow">Wilsolution · panel local</p>
          <h1>Gestor de contenido</h1>
        </div>
        <div className="admin__header-actions">
          <span className="admin__badge">Solo desarrollo</span>
          <Link to="/" className="admin__link">
            Ver web →
          </Link>
        </div>
      </header>

      <p className="admin__note">
        Los cambios se escriben directamente en <code>src/data</code>. Cuando
        termines, revisa el diff y commitea desde la pestaña Git.
      </p>

      <nav className="admin__tabs" aria-label="Secciones del panel">
        <button
          type="button"
          className={tab === 'proyectos' ? 'is-active' : ''}
          onClick={() => setTab('proyectos')}
        >
          Proyectos <span>{data.proyectos.length}</span>
        </button>
        <button
          type="button"
          className={tab === 'paginas' ? 'is-active' : ''}
          onClick={() => setTab('paginas')}
        >
          Páginas <span>{data.paginas.length}</span>
        </button>
        <button
          type="button"
          className={tab === 'git' ? 'is-active' : ''}
          onClick={() => setTab('git')}
        >
          Git
        </button>
      </nav>

      {notice && <p className="admin__notice">{notice}</p>}
      {error && <p className="admin__error">{error}</p>}

      {loading ? (
        <p className="admin__empty">Cargando contenido…</p>
      ) : (
        <main className="admin__main">
          {tab === 'proyectos' && (
            <section className="admin__section">
              <div className="admin__section-head">
                <h2>Proyectos</h2>
                <button
                  type="button"
                  className="admin__primary"
                  onClick={startNewProject}
                >
                  + Nuevo proyecto
                </button>
              </div>

              {projectDraft && (
                <form className="admin__form" onSubmit={saveProject}>
                  <div className="admin__form-head">
                    <h3>
                      {projectIndex >= 0 ? 'Editar proyecto' : 'Nuevo proyecto'}
                    </h3>
                    <button
                      type="button"
                      className="admin__ghost"
                      onClick={() => setProjectDraft(null)}
                    >
                      Cerrar
                    </button>
                  </div>

                  <div className="admin__grid">
                    <label>
                      Nombre
                      <input
                        value={projectDraft.nombre}
                        onChange={(event) => handleProjectName(event.target.value)}
                        required
                      />
                    </label>
                    <label>
                      Slug
                      <span className="admin__slug">
                        <input
                          value={projectDraft.slug}
                          onChange={(event) =>
                            handleProjectChange('slug', event.target.value)
                          }
                          pattern="[a-z0-9-]+"
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleProjectChange('slug', slugify(projectDraft.nombre))
                          }
                        >
                          Generar
                        </button>
                      </span>
                    </label>
                    <label>
                      URL del proyecto
                      <input
                        type="url"
                        value={projectDraft.url}
                        onChange={(event) =>
                          handleProjectChange('url', event.target.value)
                        }
                        required
                      />
                    </label>
                    <label>
                      Año (opcional)
                      <input
                        value={projectDraft.anio}
                        onChange={(event) =>
                          handleProjectChange('anio', event.target.value)
                        }
                        placeholder="2026"
                      />
                    </label>
                    <label className="admin__wide">
                      Descripción corta
                      <textarea
                        rows={2}
                        value={projectDraft.descripcion}
                        onChange={(event) =>
                          handleProjectChange('descripcion', event.target.value)
                        }
                        required
                      />
                    </label>
                    <label className="admin__wide">
                      Imagen (opcional, URL o /img/…)
                      <input
                        value={projectDraft.imagen}
                        onChange={(event) =>
                          handleProjectChange('imagen', event.target.value)
                        }
                        placeholder="Se usa el favicon del proyecto si está vacío"
                      />
                    </label>
                  </div>

                  <fieldset className="admin__techs">
                    <legend>Tecnologías</legend>
                    {TECNOLOGIAS.map((tech) => (
                      <button
                        key={tech.value}
                        type="button"
                        className={
                          projectDraft.tecnologias.includes(tech.value)
                            ? 'is-active'
                            : ''
                        }
                        onClick={() => toggleTech(tech.value)}
                      >
                        {tech.label}
                      </button>
                    ))}
                  </fieldset>

                  <label className="admin__check">
                    <input
                      type="checkbox"
                      checked={projectDraft.destacado}
                      onChange={(event) =>
                        handleProjectChange('destacado', event.target.checked)
                      }
                    />
                    Destacar al principio del listado
                  </label>

                  <label className="admin__field">
                    Contenido del caso (Markdown)
                    <textarea
                      rows={10}
                      value={projectDraft.contenido}
                      onChange={(event) =>
                        handleProjectChange('contenido', event.target.value)
                      }
                      placeholder="## El reto…"
                    />
                  </label>

                  <div className="admin__actions">
                    <button type="submit" className="admin__primary" disabled={saving}>
                      {saving ? 'Guardando…' : 'Guardar proyecto'}
                    </button>
                    {projectIndex >= 0 && (
                      <Link
                        to={`/proyectos/${projectDraft.slug}`}
                        className="admin__ghost"
                        target="_blank"
                      >
                        Previsualizar
                      </Link>
                    )}
                  </div>
                </form>
              )}

              <ul className="admin__list">
                {data.proyectos.map((proyecto, index) => (
                  <li key={proyecto.slug}>
                    <div>
                      <h3>{proyecto.nombre}</h3>
                      <p>{proyecto.descripcion}</p>
                      <span>{proyecto.url}</span>
                    </div>
                    <div className="admin__item-actions">
                      <button type="button" onClick={() => editProject(proyecto, index)}>
                        Editar
                      </button>
                      <button
                        type="button"
                        className="admin__danger"
                        onClick={() => deleteProject(index)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tab === 'paginas' && (
            <section className="admin__section">
              <div className="admin__section-head">
                <h2>Páginas</h2>
                <button type="button" className="admin__primary" onClick={startNewPage}>
                  + Nueva página
                </button>
              </div>

              {pageDraft && (
                <form className="admin__form" onSubmit={savePage}>
                  <div className="admin__form-head">
                    <h3>{pageOriginalSlug ? 'Editar página' : 'Nueva página'}</h3>
                    <button
                      type="button"
                      className="admin__ghost"
                      onClick={() => setPageDraft(null)}
                    >
                      Cerrar
                    </button>
                  </div>

                  <div className="admin__grid">
                    <label>
                      Título
                      <input
                        value={pageDraft.titulo}
                        onChange={(event) => handlePageChange('titulo', event.target.value)}
                        required
                      />
                    </label>
                    <label>
                      Slug
                      <span className="admin__slug">
                        <input
                          value={pageDraft.slug}
                          onChange={(event) =>
                            handlePageChange('slug', event.target.value)
                          }
                          pattern="[a-z0-9-]+"
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handlePageChange('slug', slugify(pageDraft.titulo))
                          }
                        >
                          Generar
                        </button>
                      </span>
                    </label>
                    <label>
                      Fecha
                      <input
                        type="date"
                        value={pageDraft.fecha}
                        onChange={(event) =>
                          handlePageChange('fecha', event.target.value)
                        }
                      />
                    </label>
                    <label className="admin__wide">
                      Resumen
                      <textarea
                        rows={2}
                        value={pageDraft.resumen}
                        onChange={(event) =>
                          handlePageChange('resumen', event.target.value)
                        }
                      />
                    </label>
                  </div>

                  <label className="admin__check">
                    <input
                      type="checkbox"
                      checked={pageDraft.publicada}
                      onChange={(event) =>
                        handlePageChange('publicada', event.target.checked)
                      }
                    />
                    Publicada
                  </label>

                  <label className="admin__field">
                    Contenido (Markdown)
                    <textarea
                      rows={12}
                      value={pageDraft.contenido}
                      onChange={(event) =>
                        handlePageChange('contenido', event.target.value)
                      }
                      placeholder="Escribe el contenido de la página…"
                    />
                  </label>

                  <div className="admin__actions">
                    <button type="submit" className="admin__primary" disabled={saving}>
                      {saving ? 'Guardando…' : 'Guardar página'}
                    </button>
                    {pageOriginalSlug && (
                      <Link
                        to={`/paginas/${pageOriginalSlug}`}
                        className="admin__ghost"
                        target="_blank"
                      >
                        Previsualizar
                      </Link>
                    )}
                  </div>
                </form>
              )}

              <ul className="admin__list">
                {data.paginas.map((pagina) => (
                  <li key={pagina.slug}>
                    <div>
                      <h3>{pagina.titulo}</h3>
                      <p>{pagina.resumen}</p>
                      <span>
                        /paginas/{pagina.slug} · {pagina.publicada ? 'Publicada' : 'Borrador'}
                      </span>
                    </div>
                    <div className="admin__item-actions">
                      <button type="button" onClick={() => editPage(pagina)}>
                        Editar
                      </button>
                      <button
                        type="button"
                        className="admin__danger"
                        onClick={() => deletePage(pagina.slug)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tab === 'git' && (
            <section className="admin__section">
              <div className="admin__section-head">
                <h2>Revisar y commitear</h2>
                <button type="button" className="admin__ghost" onClick={() => adminApi.getGit().then(setGit)}>
                  Actualizar
                </button>
              </div>

              <div className="admin__commands">
                <pre>{GIT_COMMANDS}</pre>
                <button type="button" className="admin__primary" onClick={copyCommands}>
                  Copiar comandos
                </button>
              </div>

              {git ? (
                <>
                  <h3 className="admin__subtitle">Estado</h3>
                  <pre className="admin__pre">{git.status || 'Sin cambios pendientes.'}</pre>
                  <h3 className="admin__subtitle">Diff de src/data</h3>
                  <pre className="admin__pre">{git.diff || 'Sin diferencias.'}</pre>
                  <h3 className="admin__subtitle">Últimos commits</h3>
                  <pre className="admin__pre">{git.log}</pre>
                </>
              ) : (
                <p className="admin__empty">Cargando información de Git…</p>
              )}
            </section>
          )}
        </main>
      )}
    </div>
  );
}
