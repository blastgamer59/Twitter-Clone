import React from "react";
import "../pages.css";
import Mainprofile from "./Mainprofile/Mainprofile";
import { useUserAuth } from "../../context/UserAuthcontext";
const Profile = () => {
  const { user } = useUserAuth();
  // const user = {
  //   displayname: "Pavan Kumar",
  //   email: "talluripavankumar88@gmail.com",
  // };
  return (
    <div className="profilePage">
      <Mainprofile user={user} />
    </div>
  );
};

export default Profile;