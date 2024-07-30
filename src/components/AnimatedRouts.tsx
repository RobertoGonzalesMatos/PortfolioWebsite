import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./HomePage/Home";
import CodePage from "./Code/Code";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.key}>
        <Route path="/" element={<HomePage key="home" />} />
        <Route path="/Code" element={<CodePage key="code" />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
