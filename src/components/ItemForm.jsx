import React, { useEffect, useState } from 'react';

export function ItemForm({ onSubmit, selected, onCancel }) {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: ''
  });

  useEffect(() => {
    if (selected) {
      setForm({
        nombre: selected.nombre ?? '',
        descripcion: selected.descripcion ?? '',
        precio: selected.precio ?? '',
        stock: selected.stock ?? ''
      });
    } else {
      setForm({ nombre: '', descripcion: '', precio: '', stock: '' });
    }
  }, [selected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selected ? 'Editar producto' : 'Nuevo producto'}</h2>
      <label>Nombre</label>
      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        required
      />

      <label>Descripción</label>
      <textarea
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
      />

      <label>Precio</label>
      <input
        type="number"
        name="precio"
        value={form.precio}
        onChange={handleChange}
        step="0.01"
      />

      <label>Stock</label>
      <input
        type="number"
        name="stock"
        value={form.stock}
        onChange={handleChange}
      />

      <button type="submit" className="primary">
        {selected ? 'Guardar cambios' : 'Crear'}
      </button>
      {selected && (
        <button type="button" className="secondary" onClick={onCancel}>
          Cancelar
        </button>
      )}
    </form>
  );
}
