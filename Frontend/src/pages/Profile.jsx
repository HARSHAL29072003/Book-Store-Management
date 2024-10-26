import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";

const Profile = () => {
  const [Profile, setProfile] = useState(null);  // Initially null to indicate loading
  const headers = {
    id: localStorage.getItem("id"),
    // id: "6713fba0402c3627ec72d384",
     authorization: `Bearer ${localStorage.getItem("token")}`,
    // authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoQ2xhaW1zIjpbeyJuYW1lIjoiYWRtaW4xMjM0NSJ9LHsicm9sZSI6InVzZXIifV0sImlhdCI6MTcyOTQwOTM4MSwiZXhwIjoxNzMyMDAxMzgxfQ.tbtXTu8ayI_BjMc5Ws5BOdJxpYcsDSUejarLwFUDEII",
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          { headers }
        );
      
        console.log("Response data:", response.data);  // Ensure the response data is what you expect
        setProfile(response.data);  // Set the state with the received data
      } catch (error) {
        console.error("Error fetching profile information:", error);  // Catch and log any errors
      }
    };
    fetch();
  }, []);

//   if (!Profile) {
//     return (
//       <div className="w-full h-[100%] flex items-center justify-center">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4 text-white">
//       <div className="w-full md:w-1/6">
//         <Sidebar data={Profile} />
//       </div>
//       <div className="w-full md:w-5/6">
//         <Outlet />
//       </div>
//     </div>
//   );
// };
return (
  <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row  py-8 gap-4 text-white">
    {!Profile && (
      <div className="w-full h-[100%] flex items-center justify-center">
        <Loader />
      </div>
    )}
    {Profile && (
      <>
        <div className="w-full md:w-1/6  h-auto lg:h-screen">
          <Sidebar data ={Profile} />
          <MobileNav />
        </div>
        <div className="w-full md:w-5/6">
          <Outlet />
        </div>
      </>
     )}
  </div>
);
};



export default Profile;
