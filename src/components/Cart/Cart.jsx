import React from "react";
import { useCart } from "../../context/CartContext";
import "./Cart.css";

export default function Cart() {
  const { items, remove, updateQty, clear, total } = useCart();

  const subtotal = total; // sum of price*qty from context
  const itemsCount = items.reduce((s, i) => s + i.qty, 0);
  const discount = 0; // placeholder - could be promotional discounts
  const platformFee = parseFloat((subtotal * 0.02).toFixed(2)); // 2% platform fee
  const totalAmount = parseFloat((subtotal - discount + platformFee).toFixed(2));

  function formatDeliveryDate(addDays = 5) {
    const d = new Date();
    d.setDate(d.getDate() + addDays);
    return d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">My Cart</h1>

      {items.length === 0 ? (
        <div className="cart-empty">My cart is empty.</div>
      ) : (
        <>
          <div className="cart-list">
            {items.map((item) => (
              <div className="cart-row" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-thumb" />

                <div className="cart-meta">
                  <div className="cart-name">{item.name}</div>
                  <div className="cart-price">₹{(item.price * item.qty).toFixed(2)}</div>

                  <div className="cart-delivery">Delivery by <strong>{formatDeliveryDate(5)}</strong></div>

                  <div className="cart-qty">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    <button className="remove-btn" onClick={() => remove(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="price-details">
              <div className="pd-title">Price Details</div>
              <div className="pd-row">
                <div className="pd-key">Price ({itemsCount} item{itemsCount !== 1 ? "s" : ""})</div>
                <div className="pd-value">₹{subtotal.toFixed(2)}</div>
              </div>
              <div className="pd-row">
                <div className="pd-key">Discounts</div>
                <div className="pd-value">- ₹{discount.toFixed(2)}</div>
              </div>
              <div className="pd-row">
                <div className="pd-key">Platform fee</div>
                <div className="pd-value">₹{platformFee.toFixed(2)}</div>
              </div>
              <div className="pd-total-row">
                <div className="pd-key">Total Amount</div>
                <div className="pd-value">₹{totalAmount.toFixed(2)}</div>
              </div>
            </div>

            <div className="summary-actions">
              <button className="btn" onClick={clear}>Clear cart</button>
              <button className="btn primary">Place Order</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
