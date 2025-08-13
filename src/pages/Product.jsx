// src/pages/Product.jsx
// Página de producto individual: permite elegir variantes y añadir al carrito.
import "../styles/producto.css";  // Estilos específicos de la página de producto
import { useMemo, useState } from "react";        // Hooks de React
import { useNavigate, useParams } from "react-router-dom"; // Para leer :id y navegar
import { MAPA_PRODUCTOS } from "../data/catalogo.js";      // Mapa id->producto
import { useCart } from "../store/CartContext.jsx";        // Hook del carrito


export default function Product() {           // Componente de la ficha
  const { id } = useParams();                 // Lee el parámetro :id de la URL
  const navigate = useNavigate();             // Para botón "Volver"
  const { addItem } = useCart();              // Para añadir al carrito

  // Busca el producto por id (useMemo para no recalcular en cada render)
  const producto = useMemo(() => MAPA_PRODUCTOS[id], [id]);

  // Si el id no existe, mostramos un fallback muy simple
  if (!producto) {
    return (
      <main className="inicio">
        <p>Producto no encontrado.</p>
        <button className="btn-outline" onClick={() => navigate("/inicio")}>Volver</button>
      </main>
    );
  }

  // Estado local con las opciones elegidas (por defecto: primera de cada variante)
  const [opciones, setOpciones] = useState(() => {
        // Convierte {talla:[...], color:[...]} a {talla: 'primera', color:'primera'}
    return Object.fromEntries(
      Object.entries(producto.variantes || {}).map(([k, arr]) => [
        k,
        Array.isArray(arr) ? arr[0] : arr,
      ])
    );
  });

  // Handler para cambiar una opción concreta
  const actualizarOpcion = (clave, valor) => {
    setOpciones((prev) => ({ ...prev, [clave]: valor })); // Clona y actualiza la clave
  };

  // Formatea precio en euros
  const eur = (n) => n.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

  // Añadir a carrito con las opciones elegidas
  const añadir = () => {
    addItem(producto, opciones);  // Usa el contexto del carrito
    navigate("/inicio");          // Vuelve a la tienda tras añadir
  };

  return (
    <main className="inicio"> {/* Reutilizamos contenedor base */}
      <button className="btn-outline" onClick={() => navigate(-1)}>&larr; Volver</button> {/* Volver atrás */}

      <section className="producto"> {/* Layout de ficha */}
        <div className="producto__media"> {/* Imagen a la izquierda */}
          {producto.img ? (
            <img src={producto.img} alt={producto.nombre} />
          ) : (
            <div className="producto__placeholder">{producto.nombre}</div>
          )}
        </div>

        <div className="producto__info"> {/* Info a la derecha */}
          <h1 className="producto__title">{producto.nombre}</h1>       {/* Nombre */}
          <p className="producto__price">{eur(producto.precio)}</p>    {/* Precio */}

          {/* Renderiza selectores de variantes si existen */}
          {Object.keys(producto.variantes || {}).length > 0 && (
            <div className="producto__opts">
              {Object.entries(producto.variantes).map(([clave, valores]) => (
                <div key={clave} className="producto__opt">
                  <label className="producto__label">
                    {clave.charAt(0).toUpperCase() + clave.slice(1)}     {/* Capitaliza la clave */}
                  </label>
                  <div className="producto__choices">
                    {valores.map((v) => {
                      const activo = opciones[clave] === v;             // ¿Esta opción está seleccionada?
                      return (
                        <button
                          key={v}
                          type="button"
                          className={`choice ${activo ? "is-active" : ""}`} // Marca activo si coincide
                          onClick={() => actualizarOpcion(clave, v)}        // Cambia selección
                        >
                          {v}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="producto__cta"> {/* Botones de acción */}
            <button className="btn-add" onClick={añadir}>Añadir al carrito</button> {/* Añade y vuelve */}
            <button className="btn-outline" onClick={() => navigate("/inicio")}>Seguir comprando</button> {/* Vuelve sin añadir */}
          </div>
        </div>
      </section>
    </main>
  );
}
