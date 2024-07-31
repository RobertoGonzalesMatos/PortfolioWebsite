import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./HomePage/Home";
import CodePage from "./Code/Code";
import MusicPage from "./Music/Music";
import MiscPage from "./Misc/Misc";
import DanceSportsPage from "./DanceSports/DanceSports";
import AboutMePage from "./AboutMe/AboutMe";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.key}>
        <Route path="/" element={<HomePage key="home" />} />
        <Route path="/Code" element={<CodePage key="code" />} />
        <Route path="/Music" element={<MusicPage key="music" />} />
        <Route path="/Misc" element={<MiscPage key="misc" />} />
        <Route
          path="/DanceSports"
          element={<DanceSportsPage key="dancesports" />}
        />
        <Route path="/AboutMe" element={<AboutMePage key="aboutme" />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
