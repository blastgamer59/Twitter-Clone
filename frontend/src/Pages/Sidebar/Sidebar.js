import React, { useState } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreIcon from "@mui/icons-material/More";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Divider from "@mui/material/Divider";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./Sidebar.css";
import Customlink from "./Customlink";
import Sidebaroption from "./Sidebaroption";
import { useNavigate } from "react-router-dom";
import useLoggedinuser from "../../hooks/useLoggedinuser"
const Sidebar = ({ handlelogout, user }) => {
  const [anchorE1, setanchorE1] = useState(null);
  const openmenu = Boolean(anchorE1);
  const [ loggedinuser] = useLoggedinuser();
  const navigate = useNavigate();
  const handleclick = (e) => {
    setanchorE1(e.currentTarget);
    // console.log(e.currentTarget);
  };
  const handleclose = () => {
    setanchorE1(null);
  };
  const result = user?.email?.split("@")[0];

  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar__twitterIcon" />
      <Customlink to="/home/feed">
        <Sidebaroption active Icon={HomeIcon} text="Home" />
      </Customlink>
      <Customlink to="/home/explore">
        <Sidebaroption Icon={SearchIcon} text="Explore" />
      </Customlink>
      <Customlink to="/home/notification">
        <Sidebaroption Icon={NotificationsNoneIcon} text="Notifications" />
      </Customlink>
      <Customlink to="/home/messages">
        <Sidebaroption Icon={MailOutlineIcon} text="Messages" />
      </Customlink>
      <Customlink to="/home/bookmarks">
        <Sidebaroption Icon={BookmarkBorderIcon} text="Bookmarks" />
      </Customlink>
      <Customlink to="/subcription">
        <Sidebaroption Icon={WorkspacePremiumIcon} text="Subcription" />
      </Customlink>
      <Customlink to="/home/profile">
        <Sidebaroption Icon={PermIdentityIcon} text="Profile" />
      </Customlink>
      <Customlink to="/home/more">
        <Sidebaroption Icon={MoreIcon} text="More" />
      </Customlink>
      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>
      <div className="Profile__info">
        <Avatar
          src={
            loggedinuser[0]?.profileImage
              ? loggedinuser[0].profileImage
              : user && user.photoURL
            // : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
          }
        />
        <div className="user__info">
          <h4>
            {loggedinuser[0]?.name
              ? loggedinuser[0].name
              : user && user.displayName}
          </h4>
          <h5>@{result}</h5>
        </div>
        <IconButton
          size="small"
          sx={{ ml: 2 }}
          aria-controls={openmenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-valuetext={openmenu ? "true" : undefined}
          onClick={handleclick}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorE1}
          open={openmenu}
          onClick={handleclose}
          onClose={handleclose}
        >
          <MenuItem
            className="Profile__info1"
            onClick={() => navigate("/home/profile")}
          >
            <Avatar
              src={
                loggedinuser[0]?.profileImage
                  ? loggedinuser[0]?.profileImage
                  : user && user.photoURL
                  // : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
              }
            />
            <div className="user__info subUser__info">
              <div>
                <h4>
                  {loggedinuser[0]?.name
                    ? loggedinuser[0].name
                    : user && user.displayName}
                </h4>
                <h5>@{result}</h5>
              </div>
              <ListItemIcon className="done__icon" color="blue">
                <DoneIcon />
              </ListItemIcon>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleclose}>Add an existing account</MenuItem>
          <MenuItem onClick={handlelogout}>Log out @{result}</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;