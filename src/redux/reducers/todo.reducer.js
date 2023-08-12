import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    saved: {
      isLoading: false,
      data: []
    },
    local: []
  },
  reducers: {
    getAllTodos(state) {
      state.saved.isLoading = true;
    },
    getAllTodosSuccess(state, payload) {
      state.saved.isLoading = false;
      state.saved.data = payload.payload;
    },
    getAllTodosFailure(state) {
      state.saved.isLoading = false;
    },
    saveToLocalTodos(state, payload) {
      state.local.unshift(payload.payload)
    },
    removeFromLocalTodo(state, payload) {
      const index = state.local.findIndex(({id}) => payload.payload === id);
      state.local.splice(index, 1);
    }
  }
})

export const { getAllTodos, getAllTodosSuccess, getAllTodosFailure, saveToLocalTodos, removeFromLocalTodo } = todoSlice.actions
export default todoSlice.reducer