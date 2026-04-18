import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (!input.trim()) return;
    setTasks([...tasks, { text: input, done: false }]);
    setInput("");
  }

  function toggleTask(index) {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  }

  function removeTask(index) {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>To-Do App</h1>

        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite uma tarefa..."
          />
          <button style={styles.addButton} onClick={addTask}>
            +
          </button>
        </div>

        <ul style={styles.list}>
          {tasks.map((task, index) => (
            <li key={index} style={styles.item}>
              <span
                onClick={() => toggleTask(index)}
                style={{
                  ...styles.text,
                  textDecoration: task.done ? "line-through" : "none",
                  opacity: task.done ? 0.5 : 1
                }}
              >
                {task.text}
              </span>

              <button
                style={styles.deleteButton}
                onClick={() => removeTask(index)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #1e1e2f, #12121a)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif"
  },
  card: {
    background: "#1f1f2e",
    padding: "30px",
    borderRadius: "15px",
    width: "350px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
  },
  title: {
    color: "#fff",
    textAlign: "center",
    marginBottom: "20px"
  },
  inputGroup: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    background: "#2a2a3d",
    color: "#fff"
  },
  addButton: {
    background: "#6c5ce7",
    border: "none",
    borderRadius: "8px",
    padding: "0 15px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "20px"
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#2a2a3d",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px"
  },
  text: {
    color: "#fff",
    cursor: "pointer"
  },
  deleteButton: {
    background: "#ff4757",
    border: "none",
    borderRadius: "6px",
    padding: "5px 10px",
    color: "#fff",
    cursor: "pointer"
  }
};

export default App;