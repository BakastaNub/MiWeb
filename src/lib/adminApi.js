async function request(path, options = {}) {
  const response = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  let payload = {};
  try {
    payload = await response.json();
  } catch {
    payload = {};
  }

  if (!response.ok) {
    throw new Error(payload.error || `Error ${response.status}`);
  }

  return payload;
}

export const adminApi = {
  getData() {
    return request('/__dev/data');
  },
  saveProyectos(proyectos) {
    return request('/__dev/proyectos', {
      method: 'PUT',
      body: JSON.stringify({ proyectos }),
    });
  },
  savePagina(pagina) {
    return request('/__dev/paginas', {
      method: 'PUT',
      body: JSON.stringify({ pagina }),
    });
  },
  deletePagina(slug) {
    return request(`/__dev/paginas?slug=${encodeURIComponent(slug)}`, {
      method: 'DELETE',
    });
  },
  getGit() {
    return request('/__dev/git');
  },
};
