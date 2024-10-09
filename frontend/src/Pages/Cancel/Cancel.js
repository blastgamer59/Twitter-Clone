import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import "./Cancel.css";
const Cancel = () => {
  const navigate = useNavigate("");
  return (
    <div className="paymentcancel">
      <div >
        <ErrorOutlineIcon className="paymentcancel-icon" />
      </div>
      <div>
        <h1 className="paymentcancel-h1">Payment Cancelled!</h1>
      </div>
      <div>
        <p className="paymentcancel-p">Your payment has been cancelled.</p>
      </div>
      <div>
        <button onClick={() => navigate("/")} className="paymentcancel-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Cancel;
