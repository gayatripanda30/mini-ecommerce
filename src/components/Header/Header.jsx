import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import "./Header.css";

export default function Header({ searchQuery, setSearchQuery }) {
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.qty, 0);
  const { count: wishlistCount } = useWishlist();

  return (
    <header className="header">
      <div className="header-inner container">
        <Link to="/" className="logo">
          MiniShop
        </Link>

        <input
          type="search"
          className="search-input"
          placeholder="Search products..."
          value={searchQuery || ""}
          onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
        />

        <nav className="header-nav">
          <Link to="/" className="nav-link">
            Products
          </Link>
          <Link to="/wishlist" className="wishlist-link">
            Wishlist
            <span className="wishlist-badge">{wishlistCount}</span>
          </Link>
          <Link to="/cart" className="cart-link">
            🛒 Cart
            <span className="cart-badge">{count}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
