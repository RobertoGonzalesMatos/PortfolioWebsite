import React, { useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import Header from "../HomePage/Header";
import { VerticalScroll } from "../Helpers/ScrollComponents";
import "./DanceSports.css";

export interface IDanceSportsProps {}

const DanceSportsPage: React.FunctionComponent<IDanceSportsProps> = (props) => {
  const scrollAAARef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <Header headerColor="dark" dim={false} />
      <motion.div
        className="transition-body"
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 400 }}
        transition={{ duration: 0.2 }}
      >
        <VerticalScroll>
          <div className="scrollAAA" ref={scrollAAARef}>
            <div className="WIPContainer">
              <img className="WIP" src="/PortfolioWebsite/WIP.webp" alt="WIP" />
            </div>
          </div>
        </VerticalScroll>
      </motion.div>
    </div>
  );
};

export default DanceSportsPage;
