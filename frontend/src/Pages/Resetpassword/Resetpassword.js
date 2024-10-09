import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, confirmPasswordReset } from "firebase/auth";
import TwitterIcon from "@mui/icons-material/Twitter";
import "./Resetpassword.css";
import { useLocation } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const query = useQuery();
  console.log(query.get("mode"));
  console.log(query.get("oobCode"));
  console.log(query.get("continueUrl"));
  const navigate = useNavigate();
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const auth = getAuth();
      await confirmPasswordReset(
        auth,
        query.get("oobCode"),
        newPassword,
        confirmPassword
      ).then((resp) => {
        console.log(resp);
        alert("Password reset Successfully");
        navigate("/login");
      });
    } catch (error) {
      console.error(error.message);
      alert("Error Reset password.");
    }
  };
  const generateRandomPassword = () => {
    const length = 12; // Adjust as needed
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };
  return (
    <div className="reset-password-container">
      <TwitterIcon className="resetpassword-icon" />
      <h2 className="reset-password-title">Reset your password</h2>
      <p className="resetpassword-information">
        The random password should not have any special characate and numbers
        and it should be combination of Small and upper case.
      </p>
      <form>
        <div>
          <input
            type={showPassword ? "text" : "password"}
            className="password1"
            placeholder=" New password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span
            onClick={handleClickShowPassword}
            style={{
              position: "absolute",
              top: "51.9%",
              right: "505px",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? (
              <VisibilityOffOutlinedIcon />
            ) : (
              <VisibilityOutlinedIcon />
            )}
          </span>
          <input
            type={showPassword1 ? "text" : "password"}
            className="password1"
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            onClick={handleClickShowPassword1}
            style={{
              position: "absolute",
              top: "61.9%",
              right: "505px",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword1 ? (
              <VisibilityOffOutlinedIcon />
            ) : (
              <VisibilityOutlinedIcon />
            )}
          </span>
        </div>
      </form>
      <button onClick={() => alert(`Generated password: ${generateRandomPassword()}`)}
      className="generate-password-button">Generate password</button>
      <button onClick={handleResetPassword} className="reset-password-button">
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;
