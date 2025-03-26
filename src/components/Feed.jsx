
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";
const Feed = () => {
  const feed = useSelector((store) => store.feed); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getFeed = async () => {
    if (feed) return; // Avoid refetching if feed already exists
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const res = await axios.get(BASE_URL + "/feed",  {
      headers: { Authorization: `Bearer ${token}` },
    }); 
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return // Show loading state

  if (feed.length <= 0) {
    return <h1 className="flex justify-center my-10">No new users found!</h1>;
  }

  return (
    feed && (
      <div>
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;