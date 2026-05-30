import { useEffect, useState } from "react";
import API from "../services/api";

function Admin() {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product added");

      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
      });

      fetchProducts();

    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product deleted");

      fetchProducts();

    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        color: "white",
      }}
    >
      <h1>Admin Dashboard</h1>

      <form
        onSubmit={addProduct}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "400px",
          marginTop: "30px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            background: "orange",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Product
        </button>
      </form>

      <div
        style={{
          marginTop: "50px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "#1e1e1e",
              padding: "20px",
              borderRadius: "10px",
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
              onClick={() => deleteProduct(product.id)}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                background: "red",
                border: "none",
                borderRadius: "5px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;