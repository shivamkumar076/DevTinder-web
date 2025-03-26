import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDate = useSelector((store) => store.user);
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    if (userDate) return;
    try {
      // const res = await api.get("/profile/view");
      const res = await axios.get(BASE_URL + "/profile/view", {
        // withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(addUser(res.data));
    } catch (err) {
      if ( err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };
  useEffect(() => {
  
      fetchUser();
    
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
<Footer/>
      {/* <Footer /> */}
    </div>
  );
};

export default Body;
