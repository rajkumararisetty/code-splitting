import React from "react";
import { useSelector } from "react-redux";
import "./TodoManager.css";

function TodoManagerHeader() {
  const todoList = useSelector((state) => state.todo.saved.data);

  return (
    <div className="server-count-header">Server Count: {todoList.length}</div>
  );
}

const MemoizedTodoManagerHeader = React.memo(TodoManagerHeader);
export default MemoizedTodoManagerHeader;
