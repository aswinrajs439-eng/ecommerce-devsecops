import API from "../services/api";

function ProductCard({ product }) {
  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      await API.post(
        "/cart",
        {
          productId: product.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product added to cart");
    } catch (error) {
      console.log(error);
      alert("Failed to add to cart");
    }
  };

  return (
    <div
      style={{
        background: "#1f2937",
        padding: "20px",
        borderRadius: "18px",
        width: "280px",
        textAlign: "center",
        color: "white",
        boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
        transition: "0.3s",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "220px",
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />

      <h2>{product.name}</h2>

      <p
        style={{
          color: "#d1d5db",
        }}
      >
        {product.description}
      </p>

      <h3
        style={{
          color: "#60a5fa",
        }}
      >
        ${product.price}
      </h3>

      <p>Stock: {product.stock}</p>

      <button
        onClick={addToCart}
        style={{
          padding: "12px 24px",
          background: "#2563eb",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          color: "white",
          marginTop: "10px",
          fontWeight: "bold",
          width: "100%",
        }}
      >
        Add To Cart
      </button>
    </div>
  );
}

export default ProductCard;