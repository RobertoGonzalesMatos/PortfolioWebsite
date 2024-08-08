import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Banner from "./Banner";
import Header from "./Header";
import RoomScene from "./RoomScene";
import "./styles/Home.css";

export interface IHomeProps {}

const HomePage: React.FunctionComponent<IHomeProps> = (props) => {
  const [dimHeader, setDimHeader] = useState<boolean>(false);
  const [darkMode, setLightMode] = useState<boolean>(true);
  const [roomMode, setRoomMode] = useState<boolean>(false);

  useEffect(() => {
    const handleExploreClick = () => {
      const bannerDiv = document.getElementById("bannerContainer");
      const roomDiv = document.getElementById("roomContainer");
      const button = document.getElementById("exploreButton");
      const buttonContainer = document.getElementById("buttonContainer");

      if (bannerDiv && roomDiv && button && buttonContainer) {
        // Add the combined animation class to start the animation

        if (roomMode) {
          button.classList.remove("buttonRoom");
          buttonContainer.classList.remove("buttonContainerRoom");
          bannerDiv.classList.add("shrink-up-grow-up");
          roomDiv.classList.remove("toFront");
          roomDiv.classList.add("shrink-up-grow-down");
          bannerDiv.addEventListener(
            "animationend",
            () => {
              roomDiv.classList.remove("shrink-up-grow-down");
              bannerDiv.classList.remove("shrink-up-grow-up");
            },
            { once: true }
          );
          return;
        }

        bannerDiv.classList.add("shrink-up-grow-down");
        roomDiv.classList.add("shrink-up-grow-up");
        button.classList.add("buttonRoom");
        buttonContainer.classList.add("buttonContainerRoom");
        // Cleanup the class after the animation ends
        bannerDiv.addEventListener(
          "animationend",
          () => {
            bannerDiv.classList.remove("shrink-up-grow-down");
            roomDiv.classList.add("toFront");
            roomDiv.classList.remove("shrink-up-grow-up");
          },
          { once: true }
        );
      }
    };

    const exploreButton = document.getElementById("exploreButton");
    exploreButton?.addEventListener("click", handleExploreClick);

    // Cleanup the event listener when the component unmounts or the effect re-runs
    return () => {
      exploreButton?.removeEventListener("click", handleExploreClick);
    };
  }, [roomMode]);

  return (
    <div className="generalContainer">
      <Header headerColor="light" dim={roomMode} />
      <motion.div
        className="transition-body"
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 400 }}
        transition={{ duration: 0.2 }}
      >
        <div className="context-menu">
          <a href="https://www.linkedin.com/in/roberto-gonzales-matos-a24092295/">
            <img
              src="/PortfolioWebsite/LinkedIn.webp"
              style={{ width: "50px", height: "auto", borderRadius: "15px" }}
            />
          </a>
          <a href="https://github.com/RobertoGonzalesMatos/PortfolioWebsite">
            <img
              src="/PortfolioWebsite/GitHub.webp"
              style={{ width: "50px", height: "auto" }}
            />
          </a>
          <img
            className="SunMoon"
            onClick={() => {
              setLightMode(!darkMode);
              const root = document.getElementById("root");
              if (root) {
                darkMode!
                  ? root.classList.add("backgroundDark")
                  : root.classList.remove("backgroundDark");
              }
            }}
            src={"/PortfolioWebsite/" + (darkMode ? "Luna" : "Sol") + ".webp"}
            alt="SunMoon"
          />
        </div>
        <div id="buttonContainer" className="buttonContainer">
          <div
            id="exploreButton"
            className="exploreButton"
            onClick={() => {
              setRoomMode(!roomMode);
            }}
          >
            <h1>
              <span className="magic">{roomMode ? "Go Back" : "Explore!"}</span>
            </h1>
          </div>
        </div>
        <div id="bannerContainer" className="bannerContainer">
          <Banner />
        </div>
        <div id="roomContainer" className="roomContainer">
          <RoomScene lightMode={darkMode} />
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
