/* eslint-disable react/prop-types */
import React from "react";
import { useDispatch } from "react-redux";
import { removeFromLocalTodo } from "../../redux/reducers/todo.reducer";

const TodoListItem = ({ todo, disableDelete = false }) => {
  const dispatch = useDispatch();
  return (
    <li>
      {todo.task}
      {!disableDelete && <span
        className="remove-button"
        onClick={() => dispatch(removeFromLocalTodo(todo.id))}
      >
        &#10060; {/* Cross Icon */}
      </span>}
    </li>
  );
};

const MemoTodoListItem = React.memo(TodoListItem);
export default MemoTodoListItem;
