import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderForm.css";

function OrderForm({ cart,clearCart }) {
  const [saved, setSaved] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    mobile: "",
  });

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // 🧮 Calculate grand total (simple)
  const totalAmount = cart.reduce((sum, item) => {
  return sum + Number(item.price) * Number(item.quantity || 1);
}, 0);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.address || !formData.mobile) {
    alert("Fill all fields!");
    return;
  }

  const ordersArray = cart.map((item) => ({
  productId: item._id,
  name: item.name,
  price: Number(item.price),
  quantity: item.quantity || 1,
  totalPrice: Number(item.price) * Number(item.quantity || 1),
}));


  const finalData = {
    email: user.email,
    name: formData.name,
    mobile: formData.mobile,
    address: formData.address,
    orders: ordersArray,
  };

  try {
    const res = await fetch("http://localhost:5000/api/orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalData),
    });

   if (res.ok) {
  setSaved("Order placed successfully! Redirecting...");

  

  setTimeout(() => {
    clearCart(); // ✅ Clears cart state properly
    navigate("/account");
  }, 2000);
}
 else {
      alert("Failed!");
    }
  } catch (error) {
    alert("Error saving order!");
  }

  setFormData({ name: "", address: "", mobile: "" });
};


  return (
    <div id="orderForm">
<div  className="container">
      <div className="row">

        <div className="col-md-6 col-12 d-flex flex-column justify-content-center mb-4">

  <h2 className="mb-4 text-center">Shipping Details</h2>
  <p>{saved}</p>

  <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-white">

    <div className="mb-3">
      <label className="form-label">Full Name</label>
      <input
        type="text"
        name="name"
        className="form-control"
        value={formData.name}
        onChange={handleChange}
        required
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Address</label>
      <textarea
        name="address"
        className="form-control"
        rows="3"
        value={formData.address}
        onChange={handleChange}
        required
      ></textarea>
    </div>

    <div className="mb-3">
      <label className="form-label">Mobile Number</label>
      <input
        type="tel"
        name="mobile"
        className="form-control"
        value={formData.mobile}
        onChange={handleChange}
        required
      />
    </div>

    <button type="submit" className="btn btn-dark w-100 py-2 mt-2">
      Place Order
    </button>

  </form>

</div>


       <div className="col-md-6 col-12">
  <h2 className="mb-4 text-center">Order Summary</h2>

  <div className="p-4 shadow rounded bg-white">

    {cart.length === 0 ? (
      <p className="text-center text-muted">No items in cart.</p>
    ) : (
      <>
        {/* Scrollable list */}
        <div
          style={{
            maxHeight: "350px",
            overflowY: "auto",
            paddingRight: "8px",
          }}
        >
          <ul className="list-unstyled">
            {cart.map((item) => (
              <li
                key={`${item._id}-${item.userEmail}`}
                className="d-flex align-items-center mb-3 p-3 border rounded"
              >
                {/* Product Image */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="me-3"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

                {/* Product Details */}
                <div className="w-100">
                  <p className="fw-bold mb-1">{item.name}</p>

                  <div className="d-flex justify-content-between text-muted">
                    <span>Price: ₹{item.price}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>

                  <p className="fw-bold mt-1 text-end">
                    Item Total: ₹{item.price * item.quantity}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <hr />

        <h3 className="text-end fw-bold mt-3">
          Grand Total: ₹{totalAmount}
        </h3>
      </>
    )}

  </div>
</div>


      </div>
    </div>


</div>
  );
}

export default OrderForm;
