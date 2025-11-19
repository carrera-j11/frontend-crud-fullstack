import React from 'react';

export function ItemTable({ items, onEdit, onDelete }) {
  return (
    <div>
      <h2>Listado de productos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.descripcion}</td>
              <td>${item.precio}</td>
              <td>{item.stock}</td>
              <td>
                <button className="secondary" onClick={() => onEdit(item)}>
                  Editar
                </button>
                <button className="danger" onClick={() => onDelete(item.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="6">No hay productos registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
