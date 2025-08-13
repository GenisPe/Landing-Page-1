import "../styles/hero.css"; // Estilos específicos del hero
import { useEffect, useRef } from "react";      // Hooks de React
import { useNavigate } from "react-router-dom"; // Para navegar a /inicio

export default function Hero() {
  const videoRef = useRef(null);                // Referencia al <video>
  const navigate = useNavigate();               // Función para cambiar de ruta

  useEffect(() => {                             // Intento de autoplay
    const v = videoRef.current;
    if (!v) return;
    (async () => { try { await v.play(); } catch { v.controls = true; } })();
  }, []);

  const irAInicio = () => navigate("/inicio");  // Click → /inicio

  return (
    <section className="hero">
      <video ref={videoRef} className="hero__video" src="/assets/video1.mov" poster="/assets/NOCTIUMBLANCO.png" muted loop playsInline preload="metadata" autoPlay/>
      <div className="hero__overlay" />
      <div className="hero__content">
        <div className="hero__card">
          <div className="hero__logo" aria-label="Logo Noctium">
            <img src="/assets/LogoInicio.png" alt="Logo Noctium" style={{width:"50%"}}/>
          </div>
          <button id="botonhero" className="hero__cta" onClick={irAInicio}>༺  DESCÚBRENOS  ༻</button>
        </div>
      </div>
    </section>
  );
}
