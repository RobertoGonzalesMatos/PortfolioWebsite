import React, { useState, useEffect } from "react";
import "./styles/Banner.css";
import { motion, Variants } from "framer-motion";

interface AnimatedLettersProps {
  title: string;
}

const banner: Variants = {
  animate: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.1,
    },
  },
};

const AnimatedLetters: React.FC<AnimatedLettersProps> = ({ title }) => (
  <span className="row-title">
    {[...title].map((letter, index) => (
      <motion.span
        key={index}
        className="row-letter"
        style={{ display: "inline-block", minWidth: "2%" }}
        initial={{ opacity: 0, y: 400 }} // Initial state with opacity and a small negative y translation
        animate={{
          opacity: 1,
          y: 0, // Ending state with opacity 1 and y translation 0
          transition: { duration: 0.5, delay: index * 0.08 },
        }}
      >
        {letter}
      </motion.span>
    ))}
  </span>
);

interface BannerRowTopProps {
  title: string;
}

const BannerRowTop: React.FC<BannerRowTopProps> = ({ title }) => (
  <div className={"banner-row top"}>
    <AnimatedLetters title={title} />
  </div>
);

interface BannerRowBottomProps {
  title: string;
}

const BannerRowBottom: React.FC<BannerRowBottomProps> = ({ title }) => (
  <div className={"banner-row bottom"}>
    <AnimatedLetters title={title} />
  </div>
);

interface BannerRowCenterProps {
  title: string;
}

const BannerRowCenter: React.FC<BannerRowCenterProps> = ({ title }) => (
  <div>
    <div className={"banner-row center"}>
      <AnimatedLetters title={title} />
    </div>
  </div>
);

const Banner: React.FC = () => {
  const [currentActivity, setCurrentActivity] = useState(0);
  const activities = [
    "BREAKDANCE",
    "PLAY MUSIC",
    "COOK",
    "CODE",
    "DANCE SALSA",
    "DO KARATE",
    "TRAVEL",
  ];

  // Determine the class for each panel
  const getPanelClass = (index: number) => {
    if (index === currentActivity) {
      return "blockPanel panelVisible";
    }
    if (index === (currentActivity + 1) % activities.length) {
      return "blockPanel panelLeaving";
    }
    return "blockPanel panelDefault";
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentActivity(
        (prevActivity) => (prevActivity + 1) % activities.length
      );
    }, 3000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [activities.length]);

  return (
    <motion.div className="banner" variants={banner}>
      <div className="card">
        <img className="Picture1Me" src="Images/CropImage1.webp" />
        <img className="Picture2Me" src="Images/CropImage3.webp" />
      </div>
      <div className="bannerTextContainer">
        <div className="rowContainer">
          <BannerRowTop title={"I'M"} />
          <BannerRowCenter title={"ROBERTO"} />
        </div>
        <BannerRowCenter title={"GONZALES"} />
        <BannerRowBottom title={"AND I LOVE TO"} />
        <div className="rotatingBlock">
          {activities.map((activity, index) => (
            <div key={index} className={getPanelClass(index)}>
              {activity}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
