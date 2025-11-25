import React from "react";
import products from "../../data/products";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

export default function ProductList({ searchQuery = "" }) {
  const q = (searchQuery || "").trim().toLowerCase();
  // Partial-match behavior: show products whose title, description, or
  // category contains the search query (case-insensitive). If query is empty, show all.
  const filtered = q
    ? products.filter((p) => {
        const name = p.name ? p.name.toLowerCase() : "";
        const desc = p.description ? p.description.toLowerCase() : "";
        const category = p.category ? p.category.toLowerCase() : "";
        return name.includes(q) || desc.includes(q) || category.includes(q);
      })
    : products;

  return (
    <section>
      <h1 className="page-title">Products</h1>
      <div className="product-grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
