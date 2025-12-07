import configureStore from "react-redux";
import UserSlice from "./UserSlice";
export const store = configureStore({
  reducer: {
    user: UserSlice,
  },
});
