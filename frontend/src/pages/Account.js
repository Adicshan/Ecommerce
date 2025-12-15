// src/pages/Account.js
import React, { useState, useEffect } from "react";
import "../Home.css";                // same CSS used by Home
// same products list
import { Link, useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();


  const [productList, setProductList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [searchText,setSearchText]=useState("");

  // LOAD PRODUCTS FROM BACKEND
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProductList(data);
      } catch (err) {
        console.error("Failed to load products", err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) console.log("user saved");
    else navigate("/login");
  }, [navigate]);


   const handleSearch = async () => {
  if (!searchText.trim()) return;

  const res = await fetch(
    `http://localhost:5000/api/products?search=${searchText}`
  );
  const data = await res.json();
  setProductList(data);
};



  
  const fetchCategoryProducts = async (category) => {
  try {
    const res = await fetch(`http://localhost:5000/api/products?category=${category}`);
    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    setProductList(data);
  } catch (err) {
    console.error(err);
    setProductList([]); // clear list on error
  }
};


const handleCategoryClick = (category) => {
  setActiveCategory(category);
  fetchCategoryProducts(category);
};



  return (
    <div className="home-container">
     

      <div id="category" className="container">
  <div className="row mt-2 mb-4">

    <div
      className={`cate col-md-3 col-6 justify-content-center d-flex 
        ${activeCategory === "Formal" ? "active-cate" : ""}`}
      onClick={() => handleCategoryClick("Formal")}
    >
      Formal
    </div>

    <div
      className={`cate col-md-3 col-6 justify-content-center d-flex 
        ${activeCategory === "Casual" ? "active-cate" : ""}`}
      onClick={() => handleCategoryClick("Casual")}
    >
      Casual
    </div>

    <div
      className={`cate col-md-3 col-6 justify-content-center d-flex 
        ${activeCategory === "Sports" ? "active-cate" : ""}`}
      onClick={() => handleCategoryClick("Sports")}
    >
      Sports
    </div>

    <div
      className={`cate col-md-3 col-6 justify-content-center d-flex 
        ${activeCategory === "Kids" ? "active-cate" : ""}`}
      onClick={() => handleCategoryClick("Kids")}
    >
      Kids
    </div>

  </div>
</div>



 <div
  id="searchInput"
  className="col-md-6 col-12 d-flex justify-content-center mb-4"
>
  <input
    type="text"
    className="search-product"
    placeholder="Search products..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
  />

  <button onClick={handleSearch} className="searchBtn">
    <img
      src={`${process.env.PUBLIC_URL}/images/search.png`}
      alt="Search"
      className="search-icon"
    />
  </button>
</div>

      {/* Products Grid (same as Home) */}
      <section className="products-section">
        <div className="product-grid">
          {productList && productList.length > 0 ? (
                    productList.map((item) => (
                    <Link
                      to={`/product/${item._id}`}
                      key={item._id}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="product-card">
          
                        {/* PRODUCT IMAGE */}
                        <img
                          src={item.imageUrl}  // Cloudinary URL stored in MongoDB
                          alt={item.name}
                          className="product-img"
                        />
          
                        {/* PRODUCT NAME */}
                        <p className="product-name" style={{fontSize:"12px"}}>{item.name}</p>
          
                        {/* PRODUCT PRICE */}
                        <p className="product-price" style={{position:"relative",bottom:"10px"}}>₹{item.price}</p>
          
                      </div>
                    </Link>
                  ))
          
                ): (
                    <p>No products available.</p>
                  )}
        </div>
      </section>

      {/* Footer (same content as Home) */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="seller-name">About KSR Enterprises</h3>
            <p>
              🌸 At <strong>KSR Enterprises</strong>, style meets affordability.
              We offer beautifully crafted blouse pieces, ladies’ attire, and premium cloth cutouts.
            </p>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>📍 Address: Chintamani, 563125, Karnataka, India 🇮🇳</p>
            <p>📞 Phone: +91 8197178185, 8197192502</p>
            <p>✉️ Email: bharathi.g2014@gmail.com</p>
          </div>

          <div className="footer-section">
            <h3>Working Hours</h3>
            <p>Mon - Sat: 10:00 AM - 7:30 PM</p>
          </div>
        </div>

        <p className="footer-bottom">
          © 2025 <strong>KSR Enterprises</strong> | Woven with elegance 💖
        </p>
      </footer>
    </div>
  );
}

export default Account;
