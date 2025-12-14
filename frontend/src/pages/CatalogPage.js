import React from "react";
import "./catalog.css"; // CSS file

const catalogs = [
  {
    id: 1,
    title: "Designer Blouse Collection",
    img: "https://via.placeholder.com/350?text=Blouse+1",
    price: "₹499 – ₹1299",
  },
  {
    id: 2,
    title: "Bridal Blouse Designs",
    img: "https://via.placeholder.com/350?text=Blouse+2",
    price: "₹999 – ₹2999",
  },
  {
    id: 3,
    title: "Party Wear Blouse Styles",
    img: "https://via.placeholder.com/350?text=Blouse+3",
    price: "₹699 – ₹1699",
  },
  {
    id: 4,
    title: "Simple Daily Wear Designs",
    img: "https://via.placeholder.com/350?text=Blouse+4",
    price: "₹299 – ₹799",
  },
];

export default function CatalogPage() {
  return (
    <div className="catalog-page">
      <h2 className="catalog-title">Our Blouse Catalog</h2>

      <div className="catalog-grid">
        {catalogs.map((item) => (
          <div key={item.id} className="catalog-card">
            <img src={item.img} alt={item.title} className="catalog-image" />

            <h3 className="catalog-name">{item.title}</h3>
            <p className="catalog-price">{item.price}</p>

            <button className="catalog-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}
