import { useEffect, useState } from "react";
import API from "../services/api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(data);
    } catch (error) {
      console.log(error);
    }
  };
const removeFromCart = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await API.delete(`/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchCart();

  } catch (error) {
    console.log(error);
  }
};
const placeOrder = async () => {
  try {
    const token = localStorage.getItem("token");

    await API.post(
      "/orders",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Order placed successfully");

    fetchCart();

  } catch (error) {
    console.log(error);
  }
};
  
const totalPrice = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  return (
    <div
      style={{
        padding: "40px",
        color: "white",
      }}
    >
      <h1>My Cart</h1>

      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            background: "#1e1e1e",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>{item.product.name}</h2>

          <p>{item.product.description}</p>

          <h3>${item.product.price}</h3>

          <p>Quantity: {item.quantity}</p>
          <button
  onClick={() => removeFromCart(item.id)}
  style={{
    marginTop: "10px",
    padding: "10px 20px",
    background: "red",
    border: "none",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
  }}
>
  Remove
</button>
        </div>
      ))}

      <h2 style={{ marginTop: "30px" }}>
        Total: ${totalPrice}
      </h2>
      <button
  onClick={placeOrder}
  style={{
    marginTop: "20px",
    padding: "12px 25px",
    background: "green",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
  }}
>
  Place Order
</button>
    </div>
  );
}

export default Cart;