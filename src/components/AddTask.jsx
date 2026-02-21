import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const API_URL = import.meta.env.VITE_URL;

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setTask((prevTask) => ({
      ...prevTask,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!task.title?.trim() || !task.description?.trim()) {
        alert("All fields are required");
        return;
      }
      console.log(task);

      const res = await axios.post(`${API_URL}/task/addTask`, task, {withCredentials: true});

      if (res.data.success) {
        alert("Taske added successfully");
        navigate("/user/dashboard");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
      alert(error.message);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <label htmlFor="title">Title: </label><br />
      <input
        type="text"
        placeholder="Enter task..."
        value={task.title}
        onChange={inputHandler}
        name="title"
        style={{
          padding: "10px",
          width: "70%",
          marginRight: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
        id="title"
      />
      <br />
      <br />

      <label htmlFor="title">Description: </label>
      <input
        type="text"
        placeholder="Enter task..."
        value={task.description}
        onChange={inputHandler}
        name="description"
        style={{
          padding: "10px",
          width: "70%",
          marginRight: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
        id="description"
      />
      <br />
      <br />

      <button
        type="submit"
        style={{
          padding: "10px 15px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#4CAF50",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Add
      </button>
    </form>

    <button onClick={()=> navigate("/user/dashboard")}>Back To Dashboard</button>
    </>
  );
}

export default AddTask;
