import { createSelector } from 'reselect';

const savedTodos = (state) => state.todo.saved.data;
const localTodos = (state) => state.todo.local;

export const getTotalTodosSelector = createSelector(
    savedTodos,
    localTodos,
  (st, lt) => {
    return {
      totalTodos: st.length + lt.length,
      totalSavedTodos: st.length,
      totalLocalTodos: lt.length,
      savedTodos: st,
      localTodos: lt,
    };
  }
);