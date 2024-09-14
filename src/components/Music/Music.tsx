import React, { useState } from "react";
import Header from "../HomePage/Header";
import "./Music.css";
import PageWrapper from "../PageWrapper";

export interface IMusicProps {}

const MusicPage: React.FunctionComponent<IMusicProps> = (props) => {
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

export default MusicPage;
