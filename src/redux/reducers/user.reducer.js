import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: null,
  avatar: null,
  nickname: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.id = action.payload.userId;
      state.avatar = action.payload.avatar;
      state.nickname = action.payload.nickname;
    },
    logOut: (state) => {
      state.id = null;
      state.avatar = null;
      state.nickname = null;
    },
    modifyProfile: (state, action) => {
      state.avatar = action.payload.avatar;
      state.nickname = action.payload.nickname;
    },
  },
});
export const { logIn, logOut, modifyProfile } = userSlice.actions;

export default userSlice.reducer;
