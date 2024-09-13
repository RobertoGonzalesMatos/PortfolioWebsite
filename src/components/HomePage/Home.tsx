import React from "react";
import Banner from "./Banner";
import "./styles/Home.css";
import PageWrapper from "../PageWrapper";

export interface IHomeProps {}

const HomePage: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <PageWrapper
      verticalScrollContent={
        <>
          <div className="bannerContainer">
            <Banner />
          </div>
          <div className="bannerContainer">
            <div
              style={{ background: "white", width: "100%", height: "100vh" }}
            >
              <img className="WIP" src="/PortfolioWebsite/WIP.webp" alt="WIP" />
            </div>
          </div>
        </>
      }
    />
  );
};

export default HomePage;
