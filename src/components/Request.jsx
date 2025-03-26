import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addRequests,removeRequest  } from "../utils/RequestSlice";
import { useDispatch, useSelector } from "react-redux";

const Requests = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest=async (status,_id)=>{
    const token=localStorage.getItem("token");
    if(!token){
        navigate("/login");
    }
    
    try{
        const res=await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{
            headers:{ Authorization : `Bearer ${token}`}
    
        })
        dispatch(removeRequest(_id))

    }catch(err){
        console.error(err)
    }
  }
  const fetchRequest = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRequest();
  }, []);
  if (!requests) return;
console.log(requests.length === 0)
  if (requests.length === 0) {
    return <h1 className="flex justify-center my-10 text-2xl font-bold">No Request found</h1>;
  }
  return (
    <div className=" text-center my-10">
      <h1 className="font-bold text-black text-4xl">Connections Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-2 rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div>
              <img
                className="rounded-full h-20 w-20 "
                src={photoUrl}
                alt="photo"
              />
            </div>
            <div className="text-left mx-4 py-2">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
            <button className="btn btn-active btn-primary mx-2"
            onClick={()=>reviewRequest("rejected",request._id)}>Rejected
            </button>
            <button className="btn btn-active btn-secondary mx-2"
            onClick={()=>reviewRequest("accepted",request._id)}>Accepted
            </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
