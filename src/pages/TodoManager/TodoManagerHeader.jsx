import React from "react";
import { useSelector } from "react-redux";
import "./TodoManager.css";
// import { getTotalTodosSelector } from "../../selectors/todoSelector";

function TodoManagerHeader() {
  const saved = useSelector(
    state => state.todo.saved
  );
  return (
    <>
      {/* <div className="server-count-header">Server Count: {totalSavedTodos}</div> */}
      <div className="server-count-header">Server Count: {saved.data.length}</div>
      {/* <div className="server-count-header">Local Count: {totalLocalTodos}</div> */}
    </>
  );
}

const MemoizedTodoManagerHeader = React.memo(TodoManagerHeader);
export default MemoizedTodoManagerHeader;
