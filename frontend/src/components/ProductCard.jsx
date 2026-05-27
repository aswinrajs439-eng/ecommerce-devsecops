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
        background: "#1e1e1e",
        padding: "20px",
        borderRadius: "10px",
        width: "250px",
        textAlign: "center",
        color: "white",
        boxShadow: "0 0 10px rgba(255,255,255,0.1)",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />

      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <h3>${product.price}</h3>

      <p>Stock: {product.stock}</p>

      <button
        onClick={addToCart}
        style={{
          padding: "10px 20px",
          background: "orange",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          color: "white",
          marginTop: "10px",
        }}
      >
        Add To Cart
      </button>
    </div>
  );
}

export default ProductCard;