import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setChannelData } from "../Redux/UserSlice";
import axios from "axios";

const GetChannel = () => {
  const dispatch = useDispatch();
  const serverUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  });

  if (loading) return <p>Loading...</p>;

  return null; // or JSX if needed
};

export default GetChannel;
