// src/App.jsx
import "./styles/base.css"; // Estilos globales
import { Routes, Route } from "react-router-dom";     // Rutas SPA
import Hero from "./pages/Hero.jsx";                  // <-- ./ (no ../)
import Inicio from "./pages/Inicio.jsx";              // <-- ./ (no ../)
import Product from "./pages/Product.jsx";            // <-- nombre y extensión correctos
import { CartProvider } from "./store/CartContext.jsx"; // <-- ./ (no ../)

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/producto/:id" element={<Product />} /> {/* ficha */}
      </Routes>
    </CartProvider>
  );
}
