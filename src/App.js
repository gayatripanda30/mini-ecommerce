import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Wishlist from "./components/Wishlist/Wishlist";
import Cart from "./components/Cart/Cart";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="app-root">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="container">
        <Routes>
          <Route path="/" element={<ProductList searchQuery={searchQuery} />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </div>
  );
}
