import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./reducers/data.reducer";
import modalReducer from "./reducers/modal.reducer";
import popupReducer from "./reducers/popup.reducer";
import userReducer from "./reducers/user.reducer";
const store = configureStore({
  reducer: {
    data: dataReducer,
    popup: popupReducer,
    modal: modalReducer,
    user: userReducer,
  },
});

export default store;
