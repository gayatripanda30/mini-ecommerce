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

  function formatDeliveryDate(addDays = 5) {
    const d = new Date();
    d.setDate(d.getDate() + addDays);
    return d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
  }

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

          <div className="delivery-info">
            <div className="delivery-box">
              <div className="delivery-icon">🚚</div>
              <div className="delivery-text">
                <div className="delivery-date">Delivery by <strong>{formatDeliveryDate(5)}</strong></div>
                <div className="delivery-desc">Free Delivery on orders above ₹100</div>
              </div>
            </div>
          </div>

          <div className="product-info">
            <div className="info-title">Product Details</div>
            <div className="info-row">
              <span className="info-key">Material</span>
              <span className="info-value">Premium Quality</span>
            </div>
            <div className="info-row">
              <span className="info-key">Warranty</span>
              <span className="info-value">1 Year Warranty</span>
            </div>
            <div className="info-row">
              <span className="info-key">Return Policy</span>
              <span className="info-value">30 Days Easy Return</span>
            </div>
            <div className="info-row">
              <span className="info-key">Availability</span>
              <span className="info-value in-stock">In Stock</span>
            </div>
          </div>

          <div className="variants-section">
            <div className="variants-title">Available Variants</div>
            
            {product.colors && product.colors.length > 0 && (
              <div className="variant-group">
                <div className="variant-label">Color</div>
                <div className="variant-options">
                  {product.colors.map((color, idx) => (
                    <button key={idx} className="variant-btn color-variant" title={color}>
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.styles && product.styles.length > 0 && (
              <div className="variant-group">
                <div className="variant-label">Style</div>
                <div className="variant-options">
                  {product.styles.map((style, idx) => (
                    <button key={idx} className="variant-btn style-variant">
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
