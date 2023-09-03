import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'test',
  initialState: {
    saved: {
      isLoading: false,
      data: []
    },
    local: []
  },
  reducers: {}
})

export default todoSlice.reducer