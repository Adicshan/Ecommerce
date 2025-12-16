import React, { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Product.css";

function Product({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProduct() {
      const res = await fetch(`https://ecommerce-83qh.onrender.com/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    }
    loadProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-5">Loading...</p>;





const handleAddToCart = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔒 Check login
  if (!user || !user.email) {
    navigate("/login");
    return;
  }

  // ✅ Logged in → add to cart
 addToCart({
  ...product,
  userEmail: user.email,
});

};


  return (
<div className="product-page">
    <div className="container mt-4">
      <div className="row">

        <div className="col-md-6 col-12 justify-content-center d-flex mb-4">
         
          <img
            src={product.imageUrl}
            alt="product"
            className="imgFluid rounded shadow"
            style={{ maxWidth: "450px" }}
          />

        </div>

    <div className="col-md-6 col-12">
  <h2 className="fw-bold">{product.name}</h2>

  {/* Category */}
  <span className="badge bg-secondary mt-2">
    {product.category}
  </span>

  {/* Description */}
  <p className="text-muted mt-3">
    {product.description}
  </p>

  {/* Shirt Details */}
  <div className="mt-3">
    <p className="mb-1">
      <strong>Fabric:</strong> {product.fabric}
    </p>

    <p className="mb-1">
      <strong>Fit:</strong> {product.fit}
    </p>

    {product.dimensions && (
      <p className="mb-1">
        <strong>Dimensions:</strong> {product.dimensions}
      </p>
    )}
  </div>

  {/* Sizes */}
  <div className="mt-3">
    <strong>Available Sizes:</strong>
    <div className="d-flex gap-2 mt-2">

        <span
     
          className="badge border border-dark text-dark px-3 py-2"
          style={{ cursor: "pointer" }}
        >
          M
        </span>

    </div>
  </div>

  {/* Price */}
  <h3 className="text-danger fw-bold mt-4" style={{color:"black"}}>
    ₹{product.price}
  </h3>

  {/* Add to Cart */}
  <button
    className="btn btn-dark btn-lg mt-4 px-5"
    onClick={handleAddToCart}
  >
    Add to Cart
  </button>
</div>

      </div>
    </div>

</div>
  );
}

export default Product;
