import "./App.css"
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard";
import AddTask from "./components/AddTask";
import GetAllUsers from "./components/GetUser";

function App() {
  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <Routes>
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />

        <Route path="/user/dashboard" element={<Dashboard />} />

        <Route path="/task/addTask" element={<AddTask />} />
        <Route path="/admin/getAllUser" element={<GetAllUsers />} />

        <Route path="*" element={<Navigate to="/user/login" />} />
      </Routes>
    </div>
  );
}

export default App;