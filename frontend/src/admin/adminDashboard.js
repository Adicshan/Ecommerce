import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./adminDashboard.css";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

 


  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTable, setActiveTable] = useState("orders"); // NEW

  const navigate = useNavigate();

  const fetchData = async (endpoint, setter) => {
    try {
 
      const res = await fetch(`https://ecommerce-83qh.onrender.com${endpoint}`);
      const data = await res.json();
      setter(data);
    } catch {
      console.log("error");
    }
  
  };

  useEffect(() => {
    fetchData("/api/admin/products", setProducts);
    fetchData("/api/admin/orders", setOrders);
  }, []);


  const handleDelete = async (productId) => {
  const pin = prompt("Enter 4-digit Admin PIN to delete this product:");

  if (!pin || pin.length !== 4) {
    alert("Invalid PIN ❌");
    return;
  }

  try {
    const res = await fetch("https://ecommerce-83qh.onrender.com/api/admin/products/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, pin})
    });

    const data = await res.json();

    if (data.success) {
      alert("Product deleted successfully ✔");

      // Remove deleted product from UI
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } else {
      alert(data.message || "Failed to delete ❌");
    }

  } catch {
    alert("Server error ❌");
  }
};


/* -----------------------------
   ORDERS TABLE COMPONENT
----------------------------- */
function OrdersTable({ orders }) {
  if (!orders.length) return <p>No orders found</p>;

  return (
   <table id="adminTable" className="table table-bordered table-hover">
  <thead className="table-dark">
    <tr>
      <th>Order ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Mobile</th>
      <th>Address</th>
      <th>Items</th>

      <th>Date</th>
    </tr>
  </thead>

  <tbody>
    {orders.map((o, index) => (
      <tr key={index}>
        <td>{o._id}</td>
        <td>{o.name || "—"}</td>
        <td>{o.email || "—"}</td>
        <td>{o.mobile || "—"}</td>
        <td>{o.address || "—"}</td>

        {/* ITEMS LIST */}
        <td style={{ width: "260px" }}>
          {o.items?.length > 0 ? (
            <ul style={{ paddingLeft: "18px", margin: 0 }}>
              {o.items.map((item, i) => (
                <li key={i} style={{ marginBottom: "8px" }}>
                  <img
                    src={item.image}
                    alt=""
                    style={{ width: "40px", height: "40px", marginRight: "8px", borderRadius: "4px" }}
                  />
                  <strong>{item.name}</strong><br />
                  Total: ₹{item.totalPrice}
                </li>
              ))}
            </ul>
          ) : (
            "No Items"
          )}
        </td>

       
        {/* DATE */}
        <td>{o.createdAt ? new Date(o.createdAt).toLocaleString() : "—"}</td>
      </tr>
    ))}
  </tbody>
</table>

  );
}

/* -----------------------------
   PRODUCTS TABLE COMPONENT
----------------------------- */
function ProductsTable({ products }) {
  if (!products.length) return <p>No products found</p>;

  return (
    <table className="table table-striped table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
  {products.map((p, index) => (
    <tr key={index}>
      <td>
        <img
          src={p.imageUrl}
          alt="error"
          style={{ width: "80px", height: "80px", borderRadius: "4px" }}
        />
      </td>

      <td>{p.name}</td>
      <td>₹{p.price}</td>
      <td>{p.category}</td>

      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(p._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

    </table>
  );
}

  return (
    <div className="admin-wrapper">
      {/* HAMBURGER FOR MOBILE */}
      <div className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`} >
        {["overview"].map((tab) => (
          <div
            key={tab}
            className={`sidebar-btn ${activeTab === tab ? "active" : ""}` }
            onClick={() => {
              setActiveTab(tab);
              setSidebarOpen(false);
            }}
            style={{marginTop:"15px"}}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </div>
        ))}

        <div
          className="add-product-btn"
          onClick={() => {
            navigate("/admin/add-product");
            setSidebarOpen(false);
          }}
        >
          + Add Product
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <div className="container">
          <div className="row">

            {/* TOP BUTTONS */}
            <div className="top col-12">
              <button
                className={`top-btn ${activeTable === "orders" ? "active" : ""}`}
                onClick={() => setActiveTable("orders")}
              >
                Orders
              </button>

              <button
                className={`top-btn ${activeTable === "products" ? "active" : ""}`}
                onClick={() => setActiveTable("products")}
              >
                Products
              </button>
            </div>

            {/* TABLE SECTION */}
            <div className="table col-12 mt-3">
              {activeTable === "orders" ? (
                <OrdersTable orders={orders} />
              ) : (
                <ProductsTable products={products} />
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}



export default AdminDashboard;
