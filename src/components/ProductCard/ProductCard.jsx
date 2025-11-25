import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { add } = useCart();
  const { toggle, contains } = useWishlist();
  const isFav = contains(product.id);

  return (
    <article className="pcard">
      <Link to={`/product/${product.id}`} className="pcard-image-link">
        <img src={product.image} alt={product.name} className="pcard-image" />
      </Link>

      <div className="pcard-body">
        <h3 className="pcard-title">{product.name}</h3>
        <p className="pcard-desc">{product.description}</p>

        <div className="pcard-footer">
          <div className="pcard-price">₹{product.price.toFixed(2)}</div>
          <div className="pcard-actions">
            <button
              className={`pcard-btn wishlist-btn ${isFav ? "fav" : ""}`}
              onClick={() => toggle(product)}
              aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isFav ? "❤️" : "🤍"}
            </button>

            <Link to={`/product/${product.id}`} className="pcard-btn outline">
              View
            </Link>
            <button className="pcard-btn primary" onClick={() => add(product, 1)}>
              Add
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
