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
        style={{ display: "inline-block" }}
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
  <div className={"banner-row"}>
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
  return (
    <motion.div className="banner" variants={banner}>
      <BannerRowTop title={"I AM"} />
      <BannerRowCenter title={"ROBERTO"} />
      <BannerRowCenter title={"GONAZALES"} />
      <BannerRowBottom title={"and I love to"} />
    </motion.div>
  );
};

export default Banner;
