import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IRoomSceneProps {
  lightMode: boolean;
}

const RoomScene: React.FunctionComponent<IRoomSceneProps> = (props) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [highlightImage, setHighlightImage] = useState<string>("");
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="image-container">
        {hovered && (
          <img
            className="roomHighlight"
            src={
              "/PortfolioWebsite/Highlights/" +
              highlightImage +
              "Highlight.webp"
            }
            alt="room"
          />
        )}
        <img className="room" src="/PortfolioWebsite/room3D.webp" alt="room" />
        <svg
          className="svg-overlay"
          viewBox="0 0 797 744" // Match this with the original image resolution
          preserveAspectRatio="xMidYMid slice"
        >
          <polygon
            points="110,575 75,450 79,310 100,310 215,453 255,470 257,519"
            onClick={() => navigate("/Music")}
            onMouseEnter={() => {
              setHovered(true);
              setHighlightImage("Music");
            }}
            onMouseLeave={() => {
              setHovered(false);
              setHighlightImage("");
            }}
            className="clickable-polygon"
          />
          <polygon
            points="105,339 120,240 280,240 365,300 175,367"
            onClick={() => navigate("/Misc")}
            onMouseEnter={() => {
              setHovered(true);
              setHighlightImage("Misc");
            }}
            onMouseLeave={() => {
              setHovered(false);
              setHighlightImage("");
            }}
            className="clickable-polygon"
          />
          <polygon
            points="118,216 300,120 385,183 200,250"
            onClick={() => navigate("/DanceSports")}
            onMouseEnter={() => {
              setHovered(true);
              setHighlightImage("Dance");
            }}
            onMouseLeave={() => {
              setHovered(false);
              setHighlightImage("");
            }}
            className="clickable-polygon"
          />
          <polygon
            points="420,510 415,405 435,295 585,307 585,397 720,425 755,460 750,575 660,607"
            onClick={() => navigate("/Code")}
            onMouseEnter={() => {
              setHovered(true);
              setHighlightImage("Code");
            }}
            onMouseLeave={() => {
              setHovered(false);
              setHighlightImage("");
            }}
            className="clickable-polygon"
          />
          <polygon
            points="400,175 398,50 565,115 565,240"
            onClick={() => navigate("/AboutMe")}
            onMouseEnter={() => {
              setHovered(true);
              setHighlightImage("AboutMe");
            }}
            onMouseLeave={() => {
              setHovered(false);
              setHighlightImage("");
            }}
            className="clickable-polygon"
          />
        </svg>
      </div>
      <img
        className="background-image"
        src="/PortfolioWebsite/camping.webp"
        alt="Camping"
      />
      <img
        className={props.lightMode ? "ski day" : "sky"}
        src="/PortfolioWebsite/sky.webp"
        alt="sky"
      />
    </div>
  );
};

export default RoomScene;
