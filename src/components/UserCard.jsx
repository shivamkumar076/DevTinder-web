import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
const UserCard = ({ user }) => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {firstName, lastName,age,gender, photoUrl,about} = user;
  const handlesendRequest=async(status,userId)=>{
    try{
      const token=localStorage.getItem("token");
      if(!token){
        navigate("/login")
      }
      const res=await axios.post(BASE_URL+"/request/send/"+ status +"/"+userId,{},
        {
          headers : {Authorization:`Bearer ${token}`},
        }
      )
      dispatch(removeUserFromFeed(userId))

    }catch(err){
      console.error(err);
    }
  }
 
  return (
    <div className="flex justify-center my-7">
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img
            src={photoUrl}
            alt="userprofile"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + " " +gender}</p>}
          <p>{about}</p>
          <p></p>
          <div className="card-actions justify-center space-x-3 my-4">
            <button className="btn btn-primary" onClick={()=>handlesendRequest("ignored",user._id)}>Ignored</button>
            <button className="btn btn-secondary"onClick={()=>handlesendRequest("interested",user._id)}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserCard;
