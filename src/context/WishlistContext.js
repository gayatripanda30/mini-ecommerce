import React, { createContext, useContext, useEffect, useState } from "react";

const WISHLIST_KEY = "mini_ecom_wishlist_v1";
const WishlistContext = createContext(null);

export function useWishlist() {
  return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(WISHLIST_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = (product) => {
    setItems((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const remove = (productId) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const toggle = (product) => {
    setItems((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const clear = () => setItems([]);

  const contains = (productId) => items.some((p) => p.id === productId);

  const count = items.length;

  return (
    <WishlistContext.Provider
      value={{ items, add, remove, toggle, clear, contains, count }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistContext;
