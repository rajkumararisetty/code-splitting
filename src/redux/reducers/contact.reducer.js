import { createSlice } from '@reduxjs/toolkit'

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    isLoading: false,
    data: []
  },
  reducers: {
    getAllContacts(state) {
      state.isLoading = true;
    },
    getAllContactsSuccess(state, payload) {
      state.isLoading = false;
      state.data = payload.payload;
    },
    getAllContactsFailure(state) {
      state.isLoading = false;
    },
  }
})

export const { getAllContacts, getAllContactsSuccess, getAllContactsFailure } = contactSlice.actions
export default contactSlice.reducer