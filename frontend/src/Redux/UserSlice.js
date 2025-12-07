import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userData: null,
};
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});
export const { setUserData } = UserSlice.actions;
export default UserSlice.reducer;
