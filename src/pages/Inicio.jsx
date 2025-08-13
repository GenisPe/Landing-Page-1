// src/pages/Inicio.jsx
// Página de INICIO con header de imagen (lettering), navbar superpuesto
// con botón de volver (izq) y categorías (dcha, hamburguesa en móvil),
// y el grid de productos igual que antes.

import { useMemo, useState } from "react";                        // Hooks de estado/memo
import { useNavigate } from "react-router-dom";                   // Navegación para el botón "Volver"
import { PRODUCTOS } from "../data/catalogo.js";                  // Datos del catálogo
import { useCart } from "../store/CartContext.jsx";               // Hook del carrito (para "Añadir")
import MiniCart from "../components/MiniCart.jsx";                // Mini-carrito flotante
import "../styles/inicio.css";                                    // Estilos de esta página

// Definición de filtros (categorías) que mostraremos en el navbar/hamburguesa
const FILTROS = [
  { key: "all", label: "Todo" },          // Muestra todos los productos
  { key: "mascaras", label: "Máscaras" }, // Solo máscaras
  { key: "llaveros", label: "Llaveros" }, // Solo llaveros
  { key: "ropa", label: "Ropa" },         // Solo ropa
  { key: "laminas", label: "Láminas" },   // Solo láminas
];

export default function Inicio() {                                         // Componente principal
  const [filtro, setFiltro] = useState("all");                             // Estado del filtro activo
  const [menuOpen, setMenuOpen] = useState(false);                         // Estado del menú hamburguesa (abierto/cerrado)
  const navigate = useNavigate();                                          // Para volver al Hero "/"
  const { addItem } = useCart();                                           // Para añadir al carrito

  // Lista filtrada según el filtro actual
  const productosFiltrados = useMemo(() => {
    if (filtro === "all") return PRODUCTOS;                                // Devuelve todo si filtro = "all"
    return PRODUCTOS.filter((p) => p.categoria === filtro);                // Si no, filtra por categoría exacta
  }, [filtro]);

  // Formatea un número como precio en euros
  const eur = (n) => n.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

  // Añade al carrito con opciones por defecto (primera variante disponible en cada clave)
  const addDefault = (p) => {
    const opts = Object.fromEntries(                                       // Construye objeto {clave: primeraOpcion}
      Object.entries(p.variantes || {}).map(([k, arr]) => [k, Array.isArray(arr) ? arr[0] : arr])
    );
    addItem(p, opts);                                                      // Añade al carrito
  };

  // Al pulsar un filtro desde el menú: selecciona filtro y cierra hamburguesa
  const seleccionarFiltro = (key) => {
    setFiltro(key);                                                        // Cambia el filtro activo
    setMenuOpen(false);                                                    // Cierra el menú si estaba abierto
  };

  return (
    <main className="inicio">                                              {/* Contenedor de la página */}
      <MiniCart />                                                         {/* Mini-carrito flotante */}

      {/* ===== Header con imagen de lettering + navbar superpuesto ===== */}
      <header className="inicio-hero">                                     {/* Bloque superior */}
        <div className="inicio-hero__overlay" />                           {/* Overlay oscuro sutil sobre el fondo */}
        <img                                                                
          className="inicio-hero__bg"                                      // Imagen principal (lettering)
          src="/assets/SinMargenNoctium.png"                                      // Ruta al lettering (cámbiala si usas otra)
          alt="Noctium — Lettering"                                        // Texto alternativo accesible
          loading="eager"                                                  // Carga prioritaria (está arriba del todo)
        />

        {/* Navbar superpuesto sobre la imagen */}
        <nav className="inicio-hero__nav" aria-label="Navegación de catálogo">
          <button
            type="button"
            className="nav__back"                                          // Botón de volver (izquierda)
            onClick={() => navigate("/")}                                  // Vuelve al Hero "/"
            aria-label="Volver a portada"
          >
            ← Inicio                                                        {/* Puedes cambiar por un ícono SVG si prefieres */}
          </button>

          <div className="nav__spacer" />                                  {/* Empuja el contenido a los extremos */}

          {/* Contenedor de categorías (chips).
              - En desktop se muestra en línea.
              - En móvil se oculta y se muestra como dropdown cuando menuOpen=true. */}
          <div className={`nav__filters ${menuOpen ? "is-open" : ""}`}>
            {FILTROS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`chip ${filtro === f.key ? "is-active" : ""}`}  // Marca el activo
                onClick={() => seleccionarFiltro(f.key)}                   // Aplica filtro y cierra menú
              >
                {f.label}                                                  {/* Texto visible del chip */}
              </button>
            ))}
          </div>

          {/* Botón hamburguesa (solo visible en móvil por CSS) */}
          <button
            type="button"
            className={`nav__hamburger ${menuOpen ? "is-open" : ""}`}      // Cambia a "X" con CSS cuando está abierto
            aria-expanded={menuOpen}                                       // Atributo accesible (true/false)
            aria-label="Abrir categorías"
            onClick={() => setMenuOpen((v) => !v)}                         // Abre/cierra el menú
          >
            <span />                                                       {/* Línea 1 */}
            <span />                                                       {/* Línea 2 */}
            <span />                                                       {/* Línea 3 */}
          </button>
        </nav>
      </header>

      {/* ===== Catálogo (grid de tarjetas) — sin cambios ===== */}
      <section className="inicio__catalogo" id="catalogo">                 {/* Contenedor del grid */}
        <div className="grid">                                             {/* Rejilla de tarjetas */}
          {productosFiltrados.map((p) => (
            <article key={p.id} className="card">                          {/* Tarjeta */}
              <div className="card__media" aria-label={`Imagen de ${p.nombre}`}>
                {p.img ? (
                  <img src={p.img} alt={p.nombre} loading="lazy" />       // Muestra imagen si existe
                ) : (
                  <span className="card__placeholder">{p.nombre}</span>    // Si no, placeholder
                )}
              </div>

              <header className="card__body">                             {/* Texto de la tarjeta */}
                <h3 className="card__title">{p.nombre}</h3>               {/* Nombre */}
                <div className="card__meta">
                  <span className="card__price">{eur(p.precio)}</span>     {/* Precio */}
                  <span className="card__tag">{p.categoria}</span>         {/* Categoría */}
                </div>
              </header>

              <div className="card__actions">                              {/* Botones */}
                <button className="btn-add" onClick={() => addDefault(p)} type="button">
                  Añadir
                </button>
                <button
                  className="btn-outline"
                  onClick={() => navigate(`/producto/${p.id}`)}
                  type="button"
                >
                  Ver
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="inicio-hero__caption ">
          <p>En Noctium no producimos en cadena: creamos piezas de autor. Cada máscara, llavero, prenda y lámina nace del trazo de La Nuit Tatto, trabajando a mano y por encargo. Dibujamos, modelamos, pintamos y envejecemos pieza a pieza, cuidando volúmenes, pátinas y texturas. Las pequeñas variaciones no son defectos: son la huella del proceso y lo que convierte cada objeto en único e irrepetible.
Seleccionamos materiales de calidad y respetamos los tiempos de curado y acabado para que cada obra tenga presencia, durabilidad y carácter. Puedes personalizar colores, motivos y detalles; la pieza final se entrega sellada y numerada con el sello Noctium y acompañada de certificado de autenticidad. Arte para llevar, hecho a mano, de nuestro taller a tus manos.
          </p>
        </div>
      </section>
    </main>
        
  );
}
