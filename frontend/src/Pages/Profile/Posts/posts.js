import React from "react";
import "./posts.css";
import { Avatar } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import Tooltip from "@mui/material/Tooltip";
const Posts = ({ p }) => {
  const { name, username, photo, post, profilephoto } = p;
  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src={profilephoto} />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {name}{" "}
              <span className="post__headerSpecial">
                <VerifiedUserIcon className="post__badge" /> {username}
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>{post}</p>
          </div>
        </div>
        <img src={photo} alt="" width="500" />
        <div className="postfooter-icons">
          <Tooltip title="Reply">
            <ChatBubbleOutlineIcon
              className="post-icons"
              fontSize="small"
            />
          </Tooltip>
          <Tooltip title="Repost">
            <RepeatIcon className="post-icons" fontSize="small" />
          </Tooltip>
          <Tooltip title="Like">
            <FavoriteBorderIcon
              className="post-icons"
              fontSize="small"
            />
          </Tooltip>
          <Tooltip title="Share">
            <PublishIcon className="post-icons" fontSize="small" />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Posts;
