import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "./Success.css";
import { useNavigate } from "react-router-dom";
const Success = () => {
  const navigate = useNavigate("");
  return (
    <div className="paymentsuccess">
      <div>
        <CheckCircleOutlineIcon className="paymentsuccess-icon" />
      </div>
      <div>
        <h1 className="paymentsuccess-h1">Payment Successful!</h1>
      </div>
      <div>
        <p className="paymentsuccess-p">Your payment has been completed.</p>
      </div>
      <div>
        <button onClick={() => navigate("/")} className="paymentsuccess-button">Next</button>
      </div>
    </div>
  );
};

export default Success;
