import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMonth: 1,
  filteredDatas: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    changeData: (state, action) => {
      state.selectedMonth = action.payload;
    },
    loadData: (state, action) => {
      state.filteredDatas = action.payload;
    },
    addData: (state, action) => {
      const addedData = [...state.filteredDatas, action.payload];

      state.selectedMonth = action.payload.date.slice(5, 7);
      state.filteredDatas = addedData;
    },
    modifyData: (state, action) => {
      const modifiedData = [...state.filteredDatas].map(
        (data) => {
          if (data.id === action.payload.recordId)
            return { ...data, ...action.payload.formData };
          return data;
        },
        [...state.filteredDatas]
      );

      state.filteredDatas = modifiedData;
    },
    deleteData: (state, action) => {
      const eliminatedData = [...state.filteredDatas].filter(
        (data) => data.id !== action.payload
      );

      state.filteredDatas = eliminatedData;
    },
  },
});
export const { changeData, addData, modifyData, deleteData, loadData } =
  dataSlice.actions;
export default dataSlice.reducer;
