import React, { useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import Header from "../HomePage/Header";
import { VerticalScroll } from "../Helpers/ScrollComponents";
import "./AboutMe.css";
import PageWrapper from "../PageWrapper";

export interface IAboutMeProps {}

const AboutMePage: React.FunctionComponent<IAboutMeProps> = (props) => {
  const scrollAAARef = useRef<HTMLDivElement>(null);

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

export default AboutMePage;
