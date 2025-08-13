// src/components/MiniCart.jsx
// Mini-carrito: botón flotante con contador y un panel lateral con el detalle.

import { useState } from "react";        // Hook para manejar el toggle abrir/cerrar
import { useCart } from "../store/CartContext.jsx"; // Importa el hook del carrito

export default function MiniCart() {     // Componente principal del mini-carrito
  const { items, increase, decrease, removeAt, clear, total, itemCount } = useCart(); // Extrae funciones y datos del carrito
  const [open, setOpen] = useState(false); // Estado local para abrir/cerrar el panel

  // Utilidad para formatear el total en euros
  const eur = (n) => n.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

  return (
    <>
      {/* Botón flotante que abre/cierra el panel */}
      <button
        className="cart-fab"           // Clase para estilos (definidos en styles.css)
        onClick={() => setOpen((v) => !v)} // Al pulsar, invierte el estado (abre/cierra)
        aria-expanded={open}           // Atributo accesible que indica si está abierto
      >
        Carrito ({itemCount})          {/* Muestra el número de unidades */}
      </button>

      {/* Panel lateral: solo se renderiza si open=true */}
      {open && (
        <aside className="cart-panel" role="dialog" aria-label="Carrito">
          {/* Cabecera del panel con título y botón cerrar */}
          <div className="cart-panel__header">
            <h2>Tu carrito</h2>                             {/* Título del panel */}
            <button className="cart-panel__close" onClick={() => setOpen(false)}>×</button> {/* Cerrar */}
          </div>

          {/* Contenido: listado de items o un vacío */}
          <div className="cart-panel__body">
            {items.length === 0 ? (                        // Si no hay items...
              <p className="cart-empty">Tu carrito está vacío.</p> // Mensaje de vacío
            ) : (
              <ul className="cart-list">                   // Lista de productos en el carrito
                {items.map((it, idx) => (
                  <li key={idx} className="cart-item">     {/* Elemento de la lista */}
                    <div className="cart-item__info">
                      <strong>{it.nombre}</strong>         {/* Nombre del producto */}
                      {/* Si hay opciones (variantes) las mostramos como texto */}
                      {it.opciones && Object.keys(it.opciones).length > 0 && (
                        <small className="cart-item__opts">
                          {Object.entries(it.opciones)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(" • ")}
                        </small>
                      )}
                      <span className="cart-item__price">{eur(it.precio)}</span> {/* Precio unitario */}
                    </div>

                    {/* Controles de cantidad y eliminar */}
                    <div className="cart-item__actions">
                      <button onClick={() => decrease(idx)} aria-label="Restar">−</button> {/* Resta cantidad */}
                      <span className="cart-item__qty">{it.qty}</span>                      {/* Cantidad actual */}
                      <button onClick={() => increase(idx)} aria-label="Sumar">+</button>   {/* Suma cantidad */}
                      <button className="cart-item__remove" onClick={() => removeAt(idx)} aria-label="Eliminar">
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Pie con total y acciones generales */}
          <div className="cart-panel__footer">
            <div className="cart-total">
              <span>Total</span>
              <strong>{eur(total)}</strong>  {/* Total del carrito */}
            </div>
            <div className="cart-actions">
              <button className="btn-clear" onClick={clear} disabled={items.length === 0}>
                Vaciar
              </button>
              <button className="btn-checkout" disabled={items.length === 0}>
                Ir a pagar
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}

import "../styles/components/minicart.css";
