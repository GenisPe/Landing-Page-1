// src/store/CartContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";

// 1) Contexto interno (no lo exportamos)
const CartContext = createContext(null);

// 2) Hook público para leer el contexto (sí lo exportamos)
export const useCart = () => useContext(CartContext);

// 3) Clave interna de localStorage (no exportar)
const STORAGE_KEY = "noctium_cart";

// 4) Proveedor del carrito (sí lo exportamos)
export function CartProvider({ children }) {
  // Estado inicial desde localStorage
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Persistencia en localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Añadir (agrupa por mismas opciones)
  const addItem = (producto, opciones = {}) => {
    setItems(prev => {
      const idx = prev.findIndex(
        it => it.id === producto.id &&
          JSON.stringify(it.opciones||{}) === JSON.stringify(opciones||{})
      );
      if (idx !== -1) {
        const clone = [...prev];
        clone[idx] = { ...clone[idx], qty: clone[idx].qty + 1 };
        return clone;
      }
      return [...prev, {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        qty: 1,
        opciones
      }];
    });
  };

  // Controles de cantidad
  const decrease = (index) => {
    setItems(prev => {
      const clone = [...prev];
      const next = clone[index].qty - 1;
      if (next <= 0) clone.splice(index, 1);
      else clone[index] = { ...clone[index], qty: next };
      return clone;
    });
  };
  const increase = (index) => {
    setItems(prev => {
      const clone = [...prev];
      clone[index] = { ...clone[index], qty: clone[index].qty + 1 };
      return clone;
    });
  };
  const removeAt = (index) => {
    setItems(prev => {
      const clone = [...prev];
      clone.splice(index, 1);
      return clone;
    });
  };
  const clear = () => setItems([]);

  // Derivados memorizados
  const itemCount = useMemo(() => items.reduce((a, it) => a + it.qty, 0), [items]);
  const total     = useMemo(() => items.reduce((a, it) => a + it.precio * it.qty, 0), [items]);

  // Valor del contexto
  const value = { items, addItem, increase, decrease, removeAt, clear, itemCount, total };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
