import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const API_URL = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/user/login`, formData, {
        withCredentials: true,
      });

      if (res.data.success) {
        setFormData({
          email: "",
          password: "",
        });

        localStorage.setItem("userId", res._id);
        navigate("/user/dashboard");
      }
      console.log(res.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        alert(error.response.data.message)
      } else {
        console.log(error.message);
        alert(error.message)
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f920",
      }}
    >
      <h2
        style={{ textAlign: "center", marginBottom: "20px", color: "#f0e1e1" }}
      >
        Login
      </h2>
      <form
        onSubmit={formHandler}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            htmlFor="email"
            style={{ marginBottom: "5px", fontWeight: "bold" }}
          >
            Email :
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="tonystark@gmail.com"
            onChange={inputHandler}
            value={formData.email}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            htmlFor="password"
            style={{ marginBottom: "5px", fontWeight: "bold" }}
          >
            Password :
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            onChange={inputHandler}
            value={formData.password}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
        </div>
        <a href="/user/register">register?</a>

        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
