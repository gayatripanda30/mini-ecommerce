import React, { createContext, useContext, useEffect, useState } from "react";

const CART_KEY = "mini_ecom_cart_v1";
const CartContext = createContext(null);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = (product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + qty } : p
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  const remove = (productId) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateQty = (productId, qty) => {
    setItems((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, qty: Math.max(1, qty) } : p))
    );
  };

  const clear = () => setItems([]);

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, add, remove, updateQty, clear, total }}
    >
      {children}
    </CartContext.Provider>
  );
}
