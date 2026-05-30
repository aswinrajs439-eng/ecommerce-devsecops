import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#111827",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          marginBottom: "60px",
          borderRadius: "20px",
          background:
            "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "15px",
          }}
        >
          DevShop
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            opacity: 0.9,
          }}
        >
          Modern E-Commerce Platform Built with React, Node.js & AWS
        </p>
      </div>

      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Featured Products
      </h2>

      <div
        style={{
          display: "flex",
          gap: "25px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;