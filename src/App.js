import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todolist, setTodolist] = useState([]); // List of todos
  const [todoname, setTodo] = useState(""); // Current todo text
  const [editTodoId, setEditTodoId] = useState(null); // ID of the todo being edited

  // Load todos from local storage when the component mounts
  useEffect(() => {
    const savedTodos = localStorage.getItem("todolist");
    if (savedTodos) {
      setTodolist(JSON.parse(savedTodos)); // Parse and set todos from local storage
    }
  }, []);

  // Save todos to local storage whenever the todo list changes
  useEffect(() => {
    if (todolist.length > 0) {
      localStorage.setItem("todolist", JSON.stringify(todolist));
    }
  }, [todolist]);

  // Handle input change
  const getTodo = (e) => {
    setTodo(e.target.value); // Update input value
  };

  // Add a new todo
  const addTodo = () => {
    if (todoname.trim() === "") {
      alert("Todo name cannot be empty");
      return;
    }

    setTodolist((prevList) => [
      ...prevList,
      { id: new Date().getTime().toString(), todoname, completed: false },
    ]);

    setTodo(""); // Clear the input field
  };

  // Delete a todo
  const deleteTodo = (id) => {
    const newList = todolist.filter((todo) => todo.id !== id);
    setTodolist(newList);
  };

  // Mark a todo as completed
  const toggleComplete = (id) => {
    const updatedTodos = todolist.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodolist(updatedTodos);
  };

  // Prepare to edit a todo
  const editTodo = (id) => {
    const todoToEdit = todolist.find((todo) => todo.id === id);
    setTodo(todoToEdit.todoname); // Set the input field with the todo name
    setEditTodoId(id); // Save the ID of the todo being edited
  };

  // Save the edited todo
  const saveEditedTodo = () => {
    if (todoname.trim() === "") {
      alert("Todo name cannot be empty");
      return;
    }

    const updatedTodos = todolist.map((todo) =>
      todo.id === editTodoId ? { ...todo, todoname } : todo
    );

    setTodolist(updatedTodos); // Update the todo list
    setTodo(""); // Clear the input field
    setEditTodoId(null); // Clear the edit ID
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Todo"
          value={todoname} // Bind input field to todoname state
          onChange={getTodo}
          required
        />
        {editTodoId ? (
          <button type="button" onClick={saveEditedTodo}>
            Save
          </button>
        ) : (
          <button type="button" onClick={addTodo}>
            Add
          </button>
        )}
        <hr />
        <ul style={{ border: "1px solid black", listStyleType: "none" }}>
          {todolist.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed} // Checkbox reflects completed status
                onChange={() => toggleComplete(todo.id)} // Toggle completed status
              />
              <p
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.todoname}
              </p>
              <button
                onClick={() => editTodo(todo.id)}
                style={{ height: "30px", alignSelf: "center" }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{ height: "30px", alignSelf: "center" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
