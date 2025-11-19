const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || 'Error en la petición');
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  list: () => request('/items'),
  get: (id) => request(`/items/${id}`),
  create: (data) =>
    request('/items', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) =>
    request(`/items/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => request(`/items/${id}`, { method: 'DELETE' })
};
