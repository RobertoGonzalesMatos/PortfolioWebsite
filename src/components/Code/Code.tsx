import React, { useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import Header from "../HomePage/Header";
import { VerticalScroll } from "../Helpers/ScrollComponents";
import "./Code.css";

export interface ICodeProps {}

const CodePage: React.FunctionComponent<ICodeProps> = (props) => {
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
        <div className="WIPContainer">
          <img className="WIP" src="/PortfolioWebsite/WIP.webp" alt="WIP" />
        </div>
      </motion.div>
    </div>
  );
};

export default CodePage;
