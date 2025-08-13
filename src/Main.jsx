import React from "react";                 // React para JSX
import { createRoot } from "react-dom/client"; // API moderna de render
import { BrowserRouter } from "react-router-dom"; // Enrutador SPA
import App from "./App.jsx";               // Componente raíz
import "./styles/base.css"; // Estilos globales

createRoot(document.getElementById("root")) // Monta en #root
  .render(
    <React.StrictMode>                    {/* Modo estricto en dev */}
      <BrowserRouter>                     {/* Habilita rutas / y /inicio */}
        <App />                          
      </BrowserRouter>
    </React.StrictMode>
  );
