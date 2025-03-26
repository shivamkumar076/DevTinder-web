import axios from "axios"
import {BASE_URL} from '../utils/constants'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";


const Connections = () => {
  const connections=useSelector((store)=>store.connections)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const fetchConnections=async ()=>{
    try{
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const res=await axios.get(BASE_URL+"/user/connections",{
        headers: { Authorization: `Bearer ${token}` },
      })
      dispatch(addConnection(res.data.data))
      
    //  console.log(res.data.data)
    }catch(err){
      console.error(err)
    }
  }
  useEffect(()=>{
    fetchConnections();

  },[])
  if(!connections) return;
  
  if(connections.length === 0){
    return <h1 className="flex justify-center font-bold text-2xl my-10">No connections found</h1>
  }
  return (
    <div className=" text-center my-10">

      <h1 className="font-bold text-black text-4xl">Connections</h1>
      
      {
        connections.map((connection)=>{
          const {_id,firstName,lastName,photoUrl,age,gender,about}=connection;
          
          return(
            <div key={_id} className="flex m-4 p-2  rounded-lg bg-base-300 w-1/2 mx-auto" >
            <div> 
               <img className="rounded-full h-20 w-20 m-1 p-2" src={photoUrl} alt="photo" /></div> 
          <div className="text-left mx-4 py-2">
           <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
           {age && gender && <p>{age + " " + gender}</p>}
             <p>{about}</p>
          </div>
           
          </div>
          )
         
        })
      }
      </div>
      
    
  )
}

export default Connections
