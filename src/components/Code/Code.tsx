import React, { useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import Header from "../HomePage/Header";
import { VerticalScroll } from "../Helpers/ScrollComponents";
import "./Code.css";
import PageWrapper from "../PageWrapper";

export interface ICodeProps {}

const CodePage: React.FunctionComponent<ICodeProps> = (props) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [mouseDownAt, setMouseDownAt] = useState<number>(0);
  const [prevPercentage, setPrevPercentage] = useState<number>(0);
  const [currentPercentage, setCurrentPercentage] = useState<number>(0);

  const handleOnDown = (clientX: number) => {
    setMouseDownAt(clientX);
  };

  const handleOnUp = () => {
    setMouseDownAt(0);
    setPrevPercentage(currentPercentage);
  };

  const handleOnMove = (clientX: number) => {
    if (mouseDownAt === 0) return;

    const track = trackRef.current;
    if (!track) return;

    const mouseDelta = mouseDownAt - clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = prevPercentage + percentage;
    const nextPercentage = Math.max(
      Math.min(nextPercentageUnconstrained, 0),
      -100
    );

    setCurrentPercentage(nextPercentage);

    track.style.transform = `translate(${nextPercentage}%, -50%)`;

    for (const image of track.getElementsByClassName(
      "image"
    ) as HTMLCollectionOf<HTMLImageElement>) {
      image.style.objectPosition = `${100 + nextPercentage}% center`;
    }
  };

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
                background: "black",
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                id="image-track"
                ref={trackRef}
                style={{ transform: `translate(${currentPercentage}%, -50%)` }}
                onMouseDown={(e) => handleOnDown(e.clientX)}
                onTouchStart={(e) => handleOnDown(e.touches[0].clientX)}
                onMouseUp={handleOnUp}
                onTouchEnd={handleOnUp}
                onMouseMove={(e) => handleOnMove(e.clientX)}
                onTouchMove={(e) => handleOnMove(e.touches[0].clientX)}
                data-mouse-down-at={mouseDownAt}
                data-prev-percentage={prevPercentage}
              >
                <img
                  className="image"
                  src="/PortfolioWebsite/3dgame.webp"
                  draggable="false"
                  alt="WIP"
                />
                <img
                  className="image"
                  src="/PortfolioWebsite/meiklejohn.webp"
                  draggable="false"
                  alt="WIP"
                />
                <img
                  className="image"
                  src="/PortfolioWebsite/room3D.webp"
                  draggable="false"
                  alt="WIP"
                />
                <img
                  className="image"
                  src="/PortfolioWebsite/HYT.webp"
                  draggable="false"
                  alt="WIP"
                />
                <img
                  className="image"
                  src="/PortfolioWebsite/WIP.webp"
                  draggable="false"
                  alt="WIP"
                />
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default CodePage;
