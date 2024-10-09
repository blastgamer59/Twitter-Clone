import React, { useState } from "react";
import "./Forgotpassword.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import { getAuth, sendPasswordResetEmail} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate("");
  const [isRequestSent, setIsRequestSent] = useState(false);
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString();
    const lastRequestDate = localStorage.getItem('lastPasswordResetDate');
    if (lastRequestDate === today) {
      alert('You can only request a password reset once per day.');
      return;
    }
   try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email, {url: 'http://localhost:3000/login'});
      alert('Password reset link has been sent to your email ');
      setIsRequestSent(true);
      localStorage.setItem('lastPasswordResetDate', today);

     } catch (error) {
      console.error(error.message);
      alert("Error sending password reset email.");
    }
  };
   
  return (
    <div className="forgot-password-container">
      <TwitterIcon className="forgotpassword-icon" />
      <h2 className="forgot-password-title">Find your twitter account</h2>
      <p className="forgot-password-instruction">
        Enter the email, or phone number associated with your account
      </p>
      <p className="forgot-password-instruction1">to change your password.</p>

      <input
        className="forgot-password-input"
        type="text"
        placeholder="Enter email or phone"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleResetPassword} className="forgot-password-button">
        Next
      </button>
      <button
        onClick={() => navigate("/login")}
        className="forgot-cancle-button"
      >
        Cancle
      </button>
       
    </div>
  );
};

export default Forgotpassword;
