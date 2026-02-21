const DisplayTask = ({ task }) => {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "10px"
    }}>
      <h3>{task.title}</h3>
      <hr />
      {task.description && <p>{task.description}</p>}
      <hr />
      <p>Status: {task.status}</p>
      <button>Edit</button>
      &nbsp;&nbsp;&nbsp;
      <button>Delete</button>
    </div>
  );
};

export default DisplayTask;