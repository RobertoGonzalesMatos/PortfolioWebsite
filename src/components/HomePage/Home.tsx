import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Banner from "./Banner";
import Header from "./Header";
import { VerticalScroll } from "../Helpers/ScrollComponents";
import { useNavigate } from "react-router-dom";

export interface IHomeProps {}

export const scrollToSection = (
  elementRef: React.RefObject<HTMLDivElement>,
  containerRef: React.RefObject<HTMLDivElement>
) => {
  if (elementRef.current && containerRef.current) {
    console.log("Scrolling to:", containerRef.current);
    containerRef.current.scrollTo({
      top: elementRef.current.offsetTop - 125,
      behavior: "smooth",
    });
  }
};

const HomePage: React.FunctionComponent<IHomeProps> = (props) => {
  const [dimHeader, setDimHeader] = useState<boolean>(false);
  const scrollComponentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const obfuscateHeader = () => {
      if (scrollComponentRef.current) {
        const divPosition = scrollComponentRef.current.scrollTop;
        setDimHeader(divPosition > 860); // Adjust the scroll position threshold as needed
      }
    };

    if (scrollComponentRef.current) {
      scrollComponentRef.current.addEventListener("scroll", obfuscateHeader);
    }

    return () => {
      if (scrollComponentRef.current) {
        scrollComponentRef.current.removeEventListener(
          "scroll",
          obfuscateHeader
        );
      }
    };
  }, []);

  return (
    <div>
      <Header headerColor="light" dim={dimHeader} />
      <motion.div
        className="transition-body"
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 400 }}
        transition={{ duration: 0.2 }}
      >
        <VerticalScroll ref={scrollComponentRef}>
          <div className="bannerContainer">
            <Banner />
            <div className="gradient-overlay"></div>
          </div>
          <div className="container">
            <div className="image-container">
              <img
                className="room"
                src="/PortfolioWebsite/room3D.webp"
                alt="room"
              />
              <svg className="svg-overlay">
                <polygon
                  points="110,805 75,680 79,540 100,540 215,683 255,700 257,749"
                  onClick={() => navigate("/Music")}
                  className="clickable-polygon"
                />
                <polygon
                  points="105,564 120,465 280,465 365,525 175,592"
                  onClick={() => navigate("/Misc")}
                  className="clickable-polygon"
                />
                <polygon
                  points="118,441 300,345 385,408 200,475"
                  onClick={() => navigate("/DanceSports")}
                  className="clickable-polygon"
                />
                <polygon
                  points="420,735 415,630 435,520 585,532 585,622 720,650 755,685 750,800 660,832"
                  onClick={() => navigate("/Code")}
                  className="clickable-polygon"
                />
                <polygon
                  points="400,400 398,275 565,340 565,465"
                  onClick={() => navigate("/AboutMe")}
                  className="clickable-polygon"
                />
                {/* Add more polygons as needed */}
              </svg>
            </div>
            <img
              className="background-image"
              src="/PortfolioWebsite/camping.webp"
              alt="Camping"
            />
          </div>
        </VerticalScroll>
      </motion.div>
    </div>
  );
};

export default HomePage;
