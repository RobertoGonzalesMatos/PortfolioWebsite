import React, { Component } from "react";
import { motion } from "framer-motion";
import Header from "./HomePage/Header";
import RoomScene from "./HomePage/RoomScene";
import "./HomePage/styles/Home.css";
import { VerticalScroll } from "./Helpers/ScrollComponents";

export interface IPageWrapperProps {
  verticalScrollContent: React.ReactNode;
}

interface IPageWrapperState {
  darkMode: boolean;
  roomMode: boolean;
}

class PageWrapper extends Component<IPageWrapperProps, IPageWrapperState> {
  constructor(props: IPageWrapperProps) {
    super(props);
    this.state = {
      darkMode: true,
      roomMode: false,
    };
  }

  componentDidMount() {
    const handleExploreClick = () => {
      const bannerDiv = document.getElementById("bannerContainer");
      const roomDiv = document.getElementById("roomContainer");
      const button = document.getElementById("exploreButton");
      const buttonContainer = document.getElementById("buttonContainer");

      if (bannerDiv && roomDiv && button && buttonContainer) {
        if (this.state.roomMode) {
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

    return () => {
      exploreButton?.removeEventListener("click", handleExploreClick);
    };
  }

  toggleDarkMode = () => {
    this.setState((prevState) => {
      const newDarkMode = !prevState.darkMode;
      const root = document.getElementById("root");
      if (root) {
        newDarkMode
          ? root.classList.add("backgroundDark")
          : root.classList.remove("backgroundDark");
      }
      return { darkMode: newDarkMode };
    });
  };

  render() {
    const { darkMode, roomMode } = this.state;
    const { verticalScrollContent } = this.props;

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
              onClick={this.toggleDarkMode}
              src={`/PortfolioWebsite/${darkMode ? "Luna" : "Sol"}.webp`}
              alt="SunMoon"
            />
          </div>
          <div id="buttonContainer" className="buttonContainer">
            <div
              id="exploreButton"
              className="exploreButton"
              onClick={() => {
                this.setState((prevState) => ({
                  roomMode: !prevState.roomMode,
                }));
              }}
            >
              <img
                className="House"
                src={`/PortfolioWebsite/houseMenu.webp`}
                style={{
                  display: "relative",
                  width: "80%",
                  height: "auto",
                }}
              />
            </div>
          </div>
          <div id="bannerContainer" className="vertical-scroll-content">
            <VerticalScroll>{verticalScrollContent}</VerticalScroll>
          </div>
          <div id="roomContainer" className="roomContainer">
            <RoomScene lightMode={darkMode} />
          </div>
        </motion.div>
      </div>
    );
  }
}

export default PageWrapper;
