import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../Redux/UserSlice";

const GetUser = () => {
  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // get token from localStorage
        if (!token) {
          dispatch(setUserData(null));
          return;
        }

        const result = await axios.get(`${API_URL}/api/user/getUser`, {
          headers: {
            Authorization: `Bearer ${token}`, // send token in headers
          },
        });

        dispatch(setUserData(result.data.user));
        console.log("User data fetched:", result.data.user);
      } catch (err) {
        console.log("Error fetching user:", err);
        dispatch(setUserData(null));
      }
    };

    fetchUser();
  }, [dispatch, API_URL]);
};

export default GetUser;
