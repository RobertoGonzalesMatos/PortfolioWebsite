import React, { useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import Header from "../HomePage/Header";
import { VerticalScroll } from "../Helpers/ScrollComponents";
import "./Code.css";
import PageWrapper from "../PageWrapper";

export interface ICodeProps {}

const CodePage: React.FunctionComponent<ICodeProps> = (props) => {
  return (
    <div>
      <Header headerColor="dark" dim={false} />
      <PageWrapper
        verticalScrollContent={
          <div
            className="bannerContainer"
            style={{
              width: "100%",
            }}
          >
            <div
              style={{
                background: "white",
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img className="WIP" src="/PortfolioWebsite/WIP.webp" alt="WIP" />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default CodePage;
