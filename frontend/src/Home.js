import { useEffect, useState } from "react";
import React from "react";
import "./Home.css";
//import products from "./products.json";
import { Link } from "react-router-dom";
const cartIcon = `${process.env.PUBLIC_URL}/images/shopping-cart.png`;




function Home({ addToCart, cartCount}) {
const [searchText, setSearchText] = useState("");
const [isMenuOpen, setIsMenuOpen] = useState(false);
const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
const [productList, setProductList] = useState([]);
const [activeCategory, setActiveCategory] = useState("");



  // LOAD PRODUCTS FROM BACKEND
  useEffect(() => {
    if (searchText === "") {
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
  }
  }, [searchText]);

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


      {/* Products Grid Section */}
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
              <p className="product-name">{item.name}</p>

              {/* PRODUCT PRICE */}
              <p className="product-price">₹{item.price}</p>

            </div>
          </Link>
        ))

      ): (
          <p>No products available.</p>
        )}

      </div>
    </section>


      {/* Footer */}
      <footer className="footer">
  <div className="footer-content">
    <div className="footer-section">
      <h3 className="seller-name">About Adicshan</h3>
      
     
    </div>

    <div className="footer-section">
      <h3>Contact Us</h3>
      <p>📍 Address: Nand Gaon, Patna, 800023, Bihar, India 🇮🇳</p>
      <p>📞 Phone: +91 9608045844</p>
      <p>✉️ Email: adityakr8816616@gmail.com</p>
    </div>

    <div className="footer-section">
      <h3>Working Hours</h3>
      <p>Mon - Sat: 10:00 AM - 7:30 PM</p>
      
    </div>
  </div>

  <p className="footer-bottom">
    © 2025 <strong>Adicshan</strong>
  </p>
</footer>


    </div>
  );
}

export default Home;
