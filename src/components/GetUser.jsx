import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/admin/get-all-user`, {
          withCredentials: true,
        });

        setUsers(res.data.users);
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login");
        } else if (error.response?.status === 403) {
          alert("Access Denied - Admin Only");
        } else {
          console.error("Error fetching users:", error);
        }
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Users</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((user) => (
          <div
            key={user._id}
            style={{
              border: "1px solid white",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "5px",
            }}
          >
            <p><strong>Name:</strong> {user.fullname}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        ))
      )}

      <br /><br />
      <button onClick={()=> navigate("/user/dashboard")}>Back to dashboard</button>
    </div>
  );
};

export default GetAllUsers;