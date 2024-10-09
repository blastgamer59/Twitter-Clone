import React from "react";
import "./Widgets.css";
import SearchIcon from "@mui/icons-material/Search";
import { TwitterTimelineEmbed, TwitterTweetEmbed } from "react-twitter-embed";
const Widgets = () => {
  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widget__searchIcon" />
        <input placeholder="Search Twitter" />
      </div>
      <div className="widgets__widgetContainer">
        <h2>What's Happening</h2>
        <TwitterTweetEmbed tweetId={"1841021881509360126"} />
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="Elon Musk"
          options={{ height: 400 }}
        />
      </div>
    </div>
  );
};

export default Widgets;