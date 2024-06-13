import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isVisible: false,
  message: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalOpen: (state, action) => {
      state.isVisible = true;
      state.message = action.payload.message;
    },
    modalClose: (state) => {
      state.isVisible = false;
      state.message = "";
    },
  },
});

export const { modalOpen, modalClose } = modalSlice.actions;
export default modalSlice.reducer;
