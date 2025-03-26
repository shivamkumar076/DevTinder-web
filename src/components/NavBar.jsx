import axios from "axios"

import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constants"
import { removeUser } from "../utils/userSlice"
// import api from "../utils/axiosInstance"

const NavBar = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user=useSelector((store)=>store.user)

  
  const handleLogout=async()=>{
    const token = localStorage.getItem('token');
if(token){
    try{
      await axios.post(BASE_URL+"/logout",{},{
        headers: { Authorization: `Bearer ${token}` },
        // withCredentials:true
      })
      // await api.post("/logout");
      localStorage.removeItem('token');
      dispatch(removeUser());

      return navigate("/login");

    }catch(err){
      console.error(err)
    }
  }}
  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
  </div>
  <div  className="flex gap-2">
    <p className="flex items-center"> {user && (user.firstName)}</p>
    {user && (
      <div className="dropdown dropdown-end mx-5">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user photo"
            src={user.photoUrl}/>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
           
          </Link>
        </li>
        <li>
          <Link to="/requests" className="justify-between">
            Requests
           
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>)}
    
  </div>
</div>
    </div>
  )
}

export default NavBar
