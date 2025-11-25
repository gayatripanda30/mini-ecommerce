import React from "react";
import { useWishlist } from "../../context/WishlistContext";
import ProductCard from "../ProductCard/ProductCard";
import { useCart } from "../../context/CartContext";
import "./Wishlist.css";

export default function Wishlist() {
  const { items, remove, clear } = useWishlist();
  const { add } = useCart();

  if (!items || items.length === 0)
    return <div className="wishlist-empty">No items in your wishlist.</div>;

  return (
    <section className="wishlist-page container">
      <h1 className="page-title">Your Wishlist</h1>
      <div className="wishlist-actions">
        <button className="btn outline" onClick={() => clear()}>
          Clear wishlist
        </button>
      </div>

      <div className="wishlist-grid">
        {items.map((p) => (
          <div key={p.id} className="wishlist-item">
            <ProductCard product={p} />
            <div className="wishlist-item-actions">
              <button className="btn" onClick={() => add(p, 1)}>
                Add to cart
              </button>
              <button className="btn outline" onClick={() => remove(p.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
