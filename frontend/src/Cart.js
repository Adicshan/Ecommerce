import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart, clearCart }) {
  const navigate = useNavigate();

  // ➕ Increase quantity
  const increaseQty = (productId, userEmail) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId && item.userEmail === userEmail
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ➖ Decrease quantity (min = 1)
  const decreaseQty = (productId, userEmail) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId &&
        item.userEmail === userEmail &&
        item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // ❌ Remove single item
  const removeItem = (productId, userEmail) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item._id === productId && item.userEmail === userEmail)
      )
    );
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page" style={{backgroundColor:"white"}}>
    <div className="container">
      <div className="row">

        {/* LEFT: CART ITEMS */}
        <div className="col-md-8 col-12 mb-4">
          <h2 className="mb-4">Your Cart</h2>

          {cart.length === 0 && <p>No items in cart.</p>}

          <div style={{ maxHeight: "420px", overflowY: "auto" }}>
            {cart.map((item) => (
              <div
                key={`${item._id}-${item.userEmail}`}
                className="d-flex mb-4 pb-3 border-bottom align-items-center"
              >
                {/* IMAGE */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 6,
                    objectFit: "cover",
                    marginRight: 15,
                  }}
                />

                {/* DETAILS */}
                <div className="flex-grow-1">
                  <h6 className="mb-1">{item.name}</h6>
                  <p className="mb-1 text-muted">₹{item.price} each</p>

                  {/* Quantity Controls */}
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <button
                      className="btn btn-outline-dark btn-sm"
                      onClick={() =>
                        decreaseQty(item._id, item.userEmail)
                      }
                    >
                      −
                    </button>

                    <span className="fw-bold">{item.quantity}</span>

                    <button
                      className="btn btn-outline-dark btn-sm"
                      onClick={() =>
                        increaseQty(item._id, item.userEmail)
                      }
                    >
                      +
                    </button>
                  </div>

                  <p className="fw-bold mt-2">
                    Subtotal: ₹{item.price * item.quantity}
                  </p>
                </div>

                {/* REMOVE BUTTON */}
                <button
                  className="btn btn-sm  ms-3"
                  style={{backgroundColor:"aliceblue"}}
                  onClick={() =>
                    removeItem(item._id, item.userEmail)
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="col-md-4 col-12 mt-4">
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 20,
            }}
          >
            <h5 className="mb-3">Order Summary</h5>

            <p className="d-flex justify-content-between">
              <span>Total Items</span>
              <strong>{cart.length}</strong>
            </p>

            <p className="d-flex justify-content-between">
              <span>Total Amount</span>
              <strong>₹{totalAmount}</strong>
            </p>

            <button
              className="btn btn-dark w-100 mt-3"
              disabled={cart.length === 0}
              onClick={() => navigate("/order")}
            >
              Proceed to Checkout
            </button>

            {cart.length > 0 && (
              <button
                className="btn btn-outline-dark w-100 mt-2"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
    </div>
  );
}

export default Cart;
