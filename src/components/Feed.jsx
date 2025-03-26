// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { addFeed } from "../utils/feedSlice";
// import { useEffect } from "react";
// import UserCard from "./UserCard";

// const Feed = () => {
//   const feed = useSelector((store) => 
//     store.feed
//   );
//   const dispatch = useDispatch();
//   console.log(feed);

//   const getFeed = async () => {
//     if (feed) return;
//     try {
//       const res = await axios.get(BASE_URL + "/feed", {
//         withCredentials: true,
//       });
//       console.log(res.data);
//       dispatch(addFeed(res?.data?.data));
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     getFeed();
//   }, []);
//   if (!feed) return;

//   if (feed.length <= 0)
//     return <h1 className="flex justify-center my-10">No new users founds!</h1>;

//   return (
//     feed && (
//       <div>
//         <UserCard user={feed[0]} />
//       </div>
//     )
//   );
// };

// export default Feed;
import axios from "axios";
// import api from "../utils/axiosInstance";
// import Cookies from "js-cookie";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const feed = useSelector((store) => store.feed); // Fixed useSelector

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
      // const token = Cookies.get('token'); // Replace 'token' with the actual cookie name

      // if (!token) {
      //     throw new Error('No token found in cookies');
      // }
      const res = await axios.get(BASE_URL + "/feed",  {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   withCredentials: true
      headers: { Authorization: `Bearer ${token}` },
    });
  
      // const res = await api.get("/feed");
    
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