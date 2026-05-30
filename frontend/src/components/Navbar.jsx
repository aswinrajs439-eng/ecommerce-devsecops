import { Link } from "react-router-dom";

function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav
      style={{
        background: "#111",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>DevShop</h2>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none" }}
        >
          Home
        </Link>

        <Link
          to="/cart"
          style={{ color: "white", textDecoration: "none" }}
        >
          Cart
        </Link>

        <Link
          to="/login"
          style={{ color: "white", textDecoration: "none" }}
        >
          Login
        </Link>

        <Link
           to="/orders"
           style={{ color: "white", textDecoration: "none"}}
        >
          Orders
        </Link>

        <Link
          to="/register"
          style={{ color: "white", textDecoration: "none" }}
        >

          Register
        </Link>

        <button
          onClick={logout}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "8px 12px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
