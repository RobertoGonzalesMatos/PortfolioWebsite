import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import Banner from "./Banner";
import Header from "./Header";
import { VerticalScroll } from "../Helpers/ScrollComponents";
// import "../../styles/AddedPages.css";
// import ThreeScene from "../../Threemain";

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
  const scrollAAARef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <Header headerColor="light" />
      <motion.div
        className="transition-body"
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 400 }}
        transition={{ duration: 0.2 }}
      >
        <VerticalScroll>
          <div className="scrollAAA" ref={scrollAAARef}>
            <div className="bannerContainer">
              <Banner />
              <div className="gradient-overlay"></div>
            </div>
            <div className="container">
              <img
                className="room"
                src="/PortfolioWebsite/room3D.webp"
                alt="room"
              />
              <img
                className="background-image"
                src="/PortfolioWebsite/camping.webp"
                alt="Camping"
              />
            </div>
          </div>
        </VerticalScroll>
      </motion.div>
    </div>
  );
};

export default HomePage;
