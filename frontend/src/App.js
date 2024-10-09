import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Login/signup";
import Feed from "./Pages/Feed/Feed";
import Explore from "./Pages/Explore/Explore";
import Notifications from "./Pages/Notifications/Notifications";
import Messages from "./Pages/Messages/Messages";
import Profile from "./Pages/Profile/Profile";
import More from "./Pages/More/More";
import Bookmark from "./Pages/Bookmarks/Bookmarks";
import Forgotpassword from "./Pages/Forgotpassword/Forgotpassword";
import { UserAuthContextProvider } from "./context/UserAuthcontext";
import Subcription from "./Pages/Subcriptions/Subcription";
import Resetpassword from "./Pages/Resetpassword/Resetpassword";
import Success from "./Pages/Success/Success";
import Cancel from "./Pages/Cancel/Cancel";

function App() {
  return (
    <div className="app">
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Feed />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
          <Route path="/subcription" element={<Subcription />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/home" element={<Home />}>
            <Route path="feed" element={<Feed />} />
            <Route path="explore" element={<Explore />} />
            <Route path="notification" element={<Notifications />} />
            <Route path="messages" element={<Messages />} />
            <Route path="bookmarks" element={<Bookmark />} />
            <Route path="profile" element={<Profile />} />
            <Route path="more" element={<More />} />
          </Route>
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
