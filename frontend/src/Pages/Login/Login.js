import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Twitterimage from "../../images/twitter.jpeg";
import Googleimage from "../../images/googlelogo.jpg";
import { useUserAuth } from "../../context/UserAuthcontext.js";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../context/firebase";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid white",
  boxShadow: 24,
  p: 4,
};
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  const { googleSignIn, logIn } = useUserAuth();
  const [phone, setphone] = useState("");
  const [otp, setOtp] = useState("");
  const [User, setUser] = useState(null);
  const [open, setopen] = useState(false);
  const handleopen = () => {
    setopen(true);
  };
  const handleclose = () => {
    setopen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    seterror("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      seterror(error.message);
      window.alert(error.message);
    }
  };
  const hanglegooglesignin = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const Sendotp = async (e) => {
    e.preventDefault();
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        recaptcha
      );
      setUser(confirmationResult);
    } catch (err) {
      console.error(err);
    }
  };
  const verifyotp = async (e) => {
    e.preventDefault();
    try {
      const data = await User.confirm(otp);
      console.log(data);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="login-container">
        <div className="image-container">
          <img src={Twitterimage} className=" image" alt="twitterimg" />
        </div>
        <div className="form-container">
          <div className="form-box">
            <h2 className="heading">Happening now</h2>
            {error && <p>{error.message}</p>}
            <form>
              <div>
                <input
                  type="email"
                  className="email"
                  placeholder="Email address"
                  onChange={(e) => setemail(e.target.value)}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  className="password"
                  placeholder="Password"
                  onChange={(e) => setpassword(e.target.value)}
                />
                <a className="forgotpassword-link" href="/forgotpassword">
                  Forgotpassword?
                </a>
                <span
                  onClick={handleClickShowPassword}
                  style={{
                    position: "absolute",
                    top: "52.5%",
                    right: "135px",
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
              </div>
            </form>
            <div className="btn-login">
              <button onClick={handlesubmit} className="btn">
                Log In
              </button>
            </div>

            <button onClick={handleopen} className="signup-btn">
              Login with phone
            </button>
            <Modal
              open={open}
              onClose={handleclose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="phone-box" sx={style}>
                <div className="modal-header">
                  <IconButton onClick={handleclose}>
                    <Tooltip title="Close">
                      <CloseIcon className="modal-close" />
                    </Tooltip>
                  </IconButton>
                </div>
                <div className="modal-icon-container">
                  <TwitterIcon className="modal-icon" />
                </div>
                <p className="modal-p">Enter your mobile number:</p>
                <form>
                  <PhoneInput
                    country={"in"}
                    placeholder="Enter your mobile number"
                    value={phone}
                    onChange={(phone) => setphone("+" + phone)}
                    containerClass="phone-input-container"
                    inputClass="phone-input"
                  />
                </form>
                <div>
                  <button onClick={Sendotp} className="send-btn">
                    Send OTP
                  </button>
                </div>
                <div id="recaptcha"></div>
                <p className="modal-p">Enter your OTP:</p>
                <input
                  type="text"
                  className="otp-input"
                  placeholder="Enter your OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <div>
                  <button onClick={verifyotp} className="otp-btn">
                    Verify OTP
                  </button>
                </div>
              </Box>
            </Modal>

            <div className="hr-with-text">
              <span>or</span>
            </div>
            <button onClick={hanglegooglesignin} className="google-button">
              <img
                src={Googleimage}
                className="google-icon"
                alt="google-icon"
              />
              Continue with Google
            </button>
          </div>
          <div className="sign-up">
            Don't have an account? <a href="/signup">Sign up</a>
          </div>
        </div>
      </div>
      <footer className="footers">
        <div className="footer-links">
          <Link to="https://about.x.com/en">About</Link>
          <Link to="https://help.x.com/en/using-x/download-the-x-app">
            Download the X app
          </Link>
          <Link to="https://x.com/en/tos">Terms of Service</Link>
          <Link to="https://x.com/en/privacy">Privacy Policy </Link>
          <Link to="https://help.x.com/en/rules-and-policies/x-cookies">
            Cookie Policy
          </Link>
          <Link to="https://help.x.com/en/resources/accessibility">
            Accessibility
          </Link>
          <Link to="https://business.x.com/en/help/troubleshooting/how-x-ads-work.html">
            Adds info
          </Link>
          <Link to="https://blog.x.com/">Blog</Link>
          <Link to="https://careers.x.com/en">Carrers</Link>
          <Link to="https://about.x.com/en/who-we-are/brand-toolkit">
            Brand Resources
          </Link>
          <Link to="https://business.x.com/en/advertising.html?ref=gl-tw-tw-twitter-advertise">
            Advertising
          </Link>
          <Link to="https://business.x.com/">Marketing</Link>
          <Link to="https://business.x.com/?ref=web-twc-ao-gbl-twitterforbusiness&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=twitterforbusiness">
            X for Business
          </Link>
          <Link to="https://developer.x.com/en">Developers</Link>
          <Link to="https://x.com/i/directory/profiles">Directory</Link>
          <Link to="https://x.com/settings/account/personalization">
            Settings
          </Link>
          <p className="link-para">2024 X Corp</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
