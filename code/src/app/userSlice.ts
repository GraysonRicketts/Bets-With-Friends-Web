import { createSlice } from "@reduxjs/toolkit";
import { fakedMembers } from "./fakedData";

export const userSlice = createSlice({
  name: "user",
  initialState: fakedMembers[0],
  reducers: {
    login: (state) => {},
    logout: (state) => {},
  },
});

// Action creators are generated for each case reducer function
// export const { login, logout } = userSlice.actions

export default userSlice.reducer;
