import { useEffect, useRef, useState } from "react"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTodos,
  saveToLocalTodos,
} from "../../redux/reducers/todo.reducer";
import TodoManagerHeader from "./TodoManagerHeader";
import "./TodoManager.css";
import MemoTodoListItem from "./TodoListItem";

function TodoManager() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const localTodoCounter = useRef(1);
  const [newTodo, setNewTodo] = useState("");

  const todoList = useSelector((state) => state.todo.saved.data);
  const localList = useSelector((state) => state.todo.local);

  useEffect(() => {
    dispatch(getAllTodos());
  }, []);

  const handleAddTodo = () => {
    dispatch(
      saveToLocalTodos({ task: newTodo, id: localTodoCounter.current++ })
    );
    setNewTodo("");
  };

  const disableSubmit = newTodo.trim() === "";

  return (
    <div className="todo-container">
      <TodoManagerHeader />
      <button className="nav-button" onClick={() => navigate("/")}>
        Go Back to Home
      </button>
      <h2>Todo List</h2>
      <div className="add-todo">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
          className="todo-input"
        />
        <button
          disabled={disableSubmit}
          onClick={disableSubmit ? null : handleAddTodo}
        >
          Add Todo
        </button>
      </div>
      <ul className="todo-list">
        {localList.map((todo) => (
          <MemoTodoListItem todo={todo} key={todo.id} />
        ))}
        {todoList.map((todo, index) => (
          <li key={index}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoManager;
