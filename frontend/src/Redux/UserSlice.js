import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  channelData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setChannelData: (state, action) => {
      state.channelData = action.payload;
    },
  },
});

export const { setUserData, setChannelData } = userSlice.actions;
export default userSlice.reducer;
