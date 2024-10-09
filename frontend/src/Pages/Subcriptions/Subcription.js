import React, { useState } from "react";
import "./Subcription.css";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import TwitterIcon from "@mui/icons-material/Twitter";
const stripePromise = loadStripe(
  "pk_test_51Q5hv0SI3jQWKAjiDf9acd8W0uiBgc0MFdGEcG427GUKE6XX7MfStuHLqr7bjN4veAMKkkXGvJZ11YzEVc09Jb8400EuCdd2uC"
);
const Subcription = () => {
  const [email, setEmail] = useState("");
  const [selectplan, setselectPlan] = useState("free");
  const navigate = useNavigate("");
  const handleSubscription = async (e) => {
    e.preventDefault();
    const currentISTTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    const currentHour = new Date(currentISTTime).getHours();
    if (currentHour < 10 || currentHour >= 11) {
      alert("Payment is only allowed between 10 to 11 AM IST.");
      return;
    }
    const stripe = await stripePromise;
    const body = {
      plan: selectplan,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await fetch(
        "http://localhost:5000/create-checkout-session",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        console.error("Stripe checkout error", result.error.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="subcription">
      <TwitterIcon className="subcription-icon" />
      <div>
        <h3 className="subcription-h1">Upgrade to Premium</h3>
      </div>
      <div className="subscription-form">
        <form>
          <input
            type="email"
            value={email}
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <select
            value={selectplan}
            onChange={(e) => setselectPlan(e.target.value)}
            className="subcription-select"
          >
            <option value="free">Free Plan</option>
            <option value="bronze">Bronze Plan - ₹100/month</option>
            <option value="silver">Silver Plan - ₹300/month</option>
            <option value="gold">Gold Plan - ₹1000/month</option>
          </select>
        </form>
      </div>
      <button onClick={handleSubscription} className="subcription-btm">
        Subscribe
      </button>

      <button onClick={() => navigate("/")} className="subcriptioncancle-btn">
        Cancle
      </button>
    </div>
  );
};

export default Subcription;
