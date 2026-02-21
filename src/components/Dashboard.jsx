import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const API_URL = import.meta.env.VITE_URL;

  const styles = {
    padding: "5px 10px",
    fontSize: "12px",
    borderRadius: "4px",
    border: "1px solid #333",
    cursor: "pointer",
    marginLeft: "5px",
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/task/deleteTask/${id}`, {
        withCredentials: true,
      });

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = async (id, task) => {
    try {
      const newTitle = prompt("Edit Title:", task.title);
      const newDescription = prompt("Edit Description:", task.description);

      if (!newTitle) return;

      const res = await axios.put(
        `${API_URL}/task/editTask/${id}`,
        { title: newTitle, description: newDescription },
        { withCredentials: true },
      );

      setTasks(
        tasks.map((task) =>
          task._id === id
            ? { ...task, title: newTitle, description: newDescription }
            : task,
        ),
      );
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  const logout = async () => {
    await axios.post(
      `${API_URL}/user/logout`,
      {},
      {
        withCredentials: true,
      },
    );
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleToggleDone = async (id) => {
    try {
      const res = await axios.put(
        `${API_URL}/task/toggleTask/${id}`,
        {},
        { withCredentials: true },
      );

      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, isDone: !task.isDone } : task,
        ),
      );
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };
  useEffect(() => {
    axios
      .get(`${API_URL}/task/getTasks`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h3 style={{ padding: "0 1em" }}>This is the Dashboard</h3>
        <button onClick={logout} style={styles}>logout</button>
        <button onClick={() => navigate("/admin/getAllUser")} style={styles}>
          Get All Users
        </button>
      </div>
      <div>
        <div>
          <h4>Create new task: </h4>
          <button onClick={() => navigate("/task/addTask")}>Create Task</button>
          <br /> <br />
        </div>
      </div>
      <div>
        <h3>My Tasks</h3>
        {tasks.length === 0 && <p>No Task scheduled</p>}
        {tasks.map((task) => (
          <div
            key={task._id}
            style={{ border: "2px solid white", padding: "1em", margin: "5px" }}
          >
            <h4
              style={{
                display: "inline",
                textDecoration: task.isDone ? "line-through" : "none",
                color: task.isDone ? "gray" : "white",
              }}
            >
              {task.title} :
            </h4>
            <p
              style={{
                display: "inline",
                textDecoration: task.isDone ? "line-through" : "none",
                color: task.isDone ? "gray" : "white",
              }}
            >
              {" "}
              {task.description}
            </p>
            <br />
            <br />
            <button style={styles} onClick={() => handleDelete(task._id)}>
              Delete
            </button>

            <button style={styles} onClick={() => handleEdit(task._id, task)}>
              Edit
            </button>

            <button style={styles} onClick={() => handleToggleDone(task._id)}>
              {task.isDone ? <>Not Done</> : <>Done</>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
