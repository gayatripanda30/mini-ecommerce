import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../../data/products";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { add } = useCart();
  const { toggle, contains } = useWishlist();
  const isFav = contains(product.id);
  const navigate = useNavigate();

  if (!product) return <div>Product not found</div>;

  return (
    <div className="details-page">
      <div className="details-grid">
        <div className="details-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="details-info">
          <h2>{product.name}</h2>
          <div className="details-price">₹{product.price.toFixed(2)}</div>
          <p className="details-desc">{product.description}</p>

          <div className="details-actions">
            <button
              className={`btn wishlist-icon ${isFav ? "fav" : ""}`}
              onClick={() => toggle(product)}
              aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
              title={isFav ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isFav ? "❤️" : "🤍"}
            </button>

            <button className="btn primary" onClick={() => add(product, 1)}>
              Add to cart
            </button>
            <button
              className="btn buy-now"
              onClick={() => {
                add(product, 1);
                navigate("/cart");
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
