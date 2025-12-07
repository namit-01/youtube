import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../Redux/UserSlice";

const GetUser = () => {
  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    try {
      const fetchUser = async () => {
        const result = await axios.get(`${API_URL}/api/user/getUser`, {
          withCredentials: true,
        });
        dispatch(setUserData(result.data.user));
        console.log("User data fetched:", result.data.user);
      };
      fetchUser();
    } catch (err) {
      console.log(err);
    }
  }, []);
};

export default GetUser;
