import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMonth: 1,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    changeData: (state, action) => {
      state.selectedMonth = action.payload;
    },
  },
});
export const { changeData } = dataSlice.actions;
export default dataSlice.reducer;
