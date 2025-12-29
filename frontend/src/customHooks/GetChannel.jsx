import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setChannelData } from "../Redux/UserSlice";
import axios from "axios";

const GetChannel = () => {
  const dispatch = useDispatch();
  const serverUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/user/getchannel`, {
          withCredentials: true,
        });

        dispatch(setChannelData(response.data.channel));
        console.log(response.data.channel);
      } catch (err) {
        console.log(err);
        dispatch(setChannelData(null));
      }
    };

    fetchChannel();
  }, []);
};

export default GetChannel;
