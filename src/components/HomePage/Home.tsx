import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import Banner from "./Banner";
import Header from "./Header";
import { VerticalScroll } from "../Helpers/ScrollComponents";
// import "../../styles/AddedPages.css";
import ScrollToTop from "./scrollToTop";
import ThreeScene from "../../Threemain";

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
  const [loading, setLoading] = useState(true);
  const about = useRef<HTMLDivElement>(null);
  const join = useRef<HTMLDivElement>(null);
  const contact = useRef<HTMLDivElement>(null);
  const scrollAAARef = useRef<HTMLDivElement>(null);

  const handleLinkClickContacts = () => {
    console.log("scrolling to contact");
    scrollToSection(contact, scrollAAARef);
  };
  const handleLinkClickAbout = () => {
    console.log("scrolling to contact");
    scrollToSection(about, scrollAAARef);
  };
  const handleLinkClickJoin = () => {
    console.log("scrolling to contact");
    scrollToSection(join, scrollAAARef);
  };

  return (
    <div>
      <Header
        onLinkClickContact={handleLinkClickContacts}
        onLinkClickAbout={handleLinkClickAbout}
        onLinkClickJoin={handleLinkClickJoin}
      />
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
              <ThreeScene />
              <img
                className="background-image"
                src="Images/camping.webp"
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
