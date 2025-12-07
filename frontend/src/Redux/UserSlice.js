import { createSlice } from "@reduxjs/toolkit";
const UserSlice = createSlice({
  name: "user",
  initialValue: { userData: null },
  reducer: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});
export const { setUserData } = UserSlice.actions;
export default UserSlice.reducer;
