// src/data/catalogo.js
// Este archivo centraliza el catálogo para reutilizarlo en Inicio y en Producto.

// Exportamos un array con los productos disponibles
export const PRODUCTOS = [
  // =============== ROPA ===============
  {
    id: "KimonoLlamasRojo",               // Identificador único del producto
    nombre: "Kimono Llamas Rojo", // Nombre visible
    categoria: "ropa",        // Categoría (para filtros)
    precio: 45,                   // Precio base en EUR
    img: "/assets/Japo/Kimono/kimono4.webp", // Ruta a imagen (pon tu archivo si lo tienes)
    variantes: {}, // Sin variantes, este producto no tiene opciones seleccionables
  },
  {
    id: "Acid",
    nombre: "Top Acid",
    categoria: "ropa",
    precio: 17,
    img: "/assets/lettering/Acid/acid-1.webp",
    variantes: {
      talla: ["S", "M", "L", "XL"], // Tallas disponibles
    },
  },

  {
    id: "CamisetaGabber",
    nombre: "Camiseta Gabber",
    categoria: "ropa",
    precio: 25,
    img: "/assets/lettering/Camiseta-Gabber/camiseta-lettering-1.webp",
    variantes: {
      talla: ["S", "M", "L", "XL"], // Tallas disponibles
    },
  },
  {
    id: "CropTop",
    nombre: "Crop Top",
    categoria: "ropa",
    precio: 17,
    img: "/assets/lettering/CropTop/Croptop2.webp",
    variantes: {
      talla: ["S", "M", "L", "XL"], // Tallas disponibles
    },
  },
  {
    id: "Top-Gabber",
    nombre: "Top Gabber",
    categoria: "ropa",
    precio: 17,
    img: "/assets/lettering/Top-Gabber/top-gabber-3.jpg",
    variantes: {
      talla: ["S", "M", "L", "XL"], // Tallas disponibles
    },
  },
  {
    id: "Top-Gabber-Cortado",
    nombre: "Top Gabber 2",
    categoria: "ropa",
    precio: 17,
    img: "/assets/lettering/Top-Gabber-Cortado/top-gabber-cortado-1.webp",
    variantes: {
      talla: ["S", "M", "L", "XL"], // Tallas disponibles
    },
  },

  // =============== LLAVEROS ===============
  {
    id: "key-amulet",
    nombre: "Llavero Amuleto Onmyōdō",
    categoria: "llaveros",
    precio: 15,
    img: "/assets/key-amulet.jpg",
    variantes: {}, // Sin variantes
  },

  // =============== MASCARAS ===============
  {
    id: "mascara-oni",
    nombre: "Mascara Oni",
    categoria: "mascaras",
    precio: 89,
    img: "/assets/hoodie-sigil.jpg",
    variantes: {                  // Opciones seleccionables en la ficha
      color: ["negra", "blanca", "roja"], // Colores disponibles
      talla: ["adulto", "infantil"],      // Tallas disponibles
    },
  },

  // =============== LÁMINAS ===============
  {
    id: "print-templo",
    nombre: "Lámina Templo Nocturno",
    categoria: "laminas",
    precio: 24,
    img: "/assets/print-templo.jpg",
    variantes: {
      tamaño: ["A4", "A3"], // Tamaños ofrecidos
    },
  },
];

// Exportamos un mapa {id -> producto} para búsquedas rápidas por id
export const MAPA_PRODUCTOS = Object.fromEntries(
  PRODUCTOS.map((p) => [p.id, p]) // Convierte el array en pares [id, producto]
);
