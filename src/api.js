// src/api.js
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:4000/api/items"; // para desarrollo local

async function request(path = "", options = {}) {
  const url = `${BASE_URL}${path}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  };

  const res = await fetch(url, config);

  if (!res.ok) {
    // Para ayudarte a depurar si algo falla
    const text = await res.text().catch(() => "");
    console.error("Error en la petición:", res.status, text);
    throw new Error(`Error en la petición (HTTP ${res.status})`);
  }

  // 204 = No Content
  if (res.status === 204) return null;

  return await res.json();
}

export const api = {
  list: () => request(""),
  create: (data) =>
    request("", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    request(`/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  remove: (id) =>
    request(`/${id}`, {
      method: "DELETE",
    }),
};
