import React, { useEffect, useState } from 'react';
import { api } from './api.js';
import { ItemForm } from './components/ItemForm.jsx';
import { ItemTable } from './components/ItemTable.jsx';

function App() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('');

  const loadItems = async () => {
    try {
      const data = await api.list();
      setItems(data);
      setStatus('Datos cargados correctamente ✅');
    } catch (err) {
      setStatus('Error al cargar datos: ' + err.message);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleCreateOrUpdate = async (form) => {
    try {
      if (selected) {
        await api.update(selected.id, form);
        setStatus('Producto actualizado correctamente ✅');
      } else {
        await api.create(form);
        setStatus('Producto creado correctamente ✅');
      }
      setSelected(null);
      loadItems();
    } catch (err) {
      setStatus('Error: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Seguro que deseas eliminar este producto?')) return;
    try {
      await api.remove(id);
      setStatus('Producto eliminado correctamente ✅');
      loadItems();
    } catch (err) {
      setStatus('Error: ' + err.message);
    }
  };

  return (
    <div className="container">
      <h1>Sistema de Gestión de Productos</h1>
      <p>
        Front-end en React y Back-end en Node/Express. Lista para desplegar en
        Railway (API) y Vercel (Front).
      </p>

      <div className="grid">
        <ItemForm
          onSubmit={handleCreateOrUpdate}
          selected={selected}
          onCancel={() => setSelected(null)}
        />
        <ItemTable
          items={items}
          onEdit={setSelected}
          onDelete={handleDelete}
        />
      </div>

      <div className="status">{status}</div>
    </div>
  );
}

export default App;
