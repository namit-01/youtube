import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../Redux/UserSlice";

const GetUser = () => {
  const dispatch = useDispatch();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Check if token exists in cookies

    const fetchUser = async () => {
      try {
        const result = await axios.get(`${API_URL}/api/user/getUser`, {
          withCredentials: true,
        });
        dispatch(setUserData(result.data.user));
        console.log("User data fetched:", result.data.user);
      } catch (err) {
        console.log("Error fetching user:", err);
      }
    };

    fetchUser();
  });
};

export default GetUser;
