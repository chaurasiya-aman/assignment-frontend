import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "user",
  });

  const API_URL = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${API_URL}/user/register`, formData);

      if(result.data.success) {
        console.log(result.data);
        navigate("/user/login");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        alert(error.response.data.message)
      } else {
        console.log(error.message);
        alert(error.message)
      }
    } finally {
      setFormData({
        fullname: "",
        email: "",
        password: "",
        role: "user",
      });
    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "50px auto",
      padding: "30px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f9f9f920"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#f0e1e1" }}>
        Register Your Details
      </h2>

      <form onSubmit={formHandler} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="fullname" style={{ marginBottom: "5px", fontWeight: "bold" }}>Fullname :</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Tony Stark"
            onChange={inputHandler}
            value={formData.fullname}
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none"
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="email" style={{ marginBottom: "5px", fontWeight: "bold" }}>Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="tonystark@gmail.com"
            onChange={inputHandler}
            value={formData.email}
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none"
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="password" style={{ marginBottom: "5px", fontWeight: "bold" }}>Password :</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            onChange={inputHandler}
            value={formData.password}
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none"
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ fontWeight: "bold" }}>Role :</span>
          <label>
            <input
              type="radio"
              name="role"
              value="user"
              checked={formData.role === "user"}
              onChange={inputHandler}
            /> User
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={formData.role === "admin"}
              onChange={inputHandler}
            /> Admin
          </label>
        </div>
        <a href="/user/login">login?</a>

        <button type="submit" style={{
          padding: "10px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#007bff",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "0.3s"
        }}
        onMouseOver={e => e.target.style.backgroundColor = "#0056b3"}
        onMouseOut={e => e.target.style.backgroundColor = "#007bff"}
        >
          Register
        </button>

      </form>
    </div>
  );
};

export default Register;