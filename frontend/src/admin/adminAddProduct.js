// src/admin/AdminAddProduct.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminAddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    fabric: "",
    fit: "",
    dimensions: "",
    sizes: [],
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  // ---------------- HANDLE INPUT CHANGE ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ---------------- SIZE SELECTION ----------------
  const handleSizeChange = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  // ---------------- IMAGE ----------------
  const handleFileChange = (e) => {
    const img = e.target.files[0];
    if (!img) return;

    setFile(img);
    setPreview(URL.createObjectURL(img));
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.fabric ||
      !formData.fit ||
      formData.sizes.length === 0 ||
      !file
    ) {
      setError("Please fill all required fields.");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "sizes") {
        data.append("sizes", JSON.stringify(formData.sizes));
      } else {
        data.append(key, formData[key]);
      }
    });
    data.append("image", file);

    try {
      setLoading(true);
      const res = await fetch("https://ecommerce-83qh.onrender.com/api/admin/products", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to add product");

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3 className="mb-4 text-center">Add New Shirt Product</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">

            {/* Product Name */}
            <div className="col-md-6 col-12">
              <label className="form-label">Product Name</label>
              <input
                className="form-control"
                name="name"
                onChange={handleChange}
              />
            </div>

            {/* Category */}
            <div className="col-md-6 col-12">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                name="category"
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="Formal">Formal</option>
                <option value="Casual">Casual</option>
                <option value="Sports">Sports</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            {/* Price */}
            <div className="col-md-4 col-12">
              <label className="form-label">Price (₹)</label>
              <input
                className="form-control"
                name="price"
                type="number"
                onChange={handleChange}
              />
            </div>

            {/* Fabric */}
            <div className="col-md-4 col-12">
              <label className="form-label">Fabric</label>
              <input
                className="form-control"
                name="fabric"
                placeholder="Cotton / Linen"
                onChange={handleChange}
              />
            </div>

            {/* Fit */}
            <div className="col-md-4 col-12">
              <label className="form-label">Fit</label>
              <select
                className="form-select"
                name="fit"
                onChange={handleChange}
              >
                <option value="">Select Fit</option>
                <option value="Slim">Slim</option>
                <option value="Regular">Regular</option>
                <option value="Oversized">Oversized</option>
              </select>
            </div>

            {/* Dimensions */}
            <div className="col-12">
              <label className="form-label">Dimensions</label>
              <input
                className="form-control"
                name="dimensions"
                placeholder="Chest x Length x Sleeve"
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="3"
                name="description"
                onChange={handleChange}
              />
            </div>

            {/* Sizes */}
            <div className="col-12">
              <label className="form-label">Available Sizes</label>
              <div className="d-flex gap-3">
                {sizeOptions.map((size) => (
                  <div className="form-check" key={size}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={() => handleSizeChange(size)}
                    />
                    <label className="form-check-label">{size}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="col-12">
              <label className="form-label">Product Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {preview && (
              <div className="col-12 text-center">
                <img
                  src={preview}
                  alt="preview"
                  style={{ width: "150px", marginTop: "10px" }}
                />
              </div>
            )}

            {/* Submit */}
            <div className="col-12 text-center mt-3">
              <button className="btn btn-primary px-5" disabled={loading}>
                {loading ? "Saving..." : "Add Product"}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminAddProduct;
