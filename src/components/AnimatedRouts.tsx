import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./HomePage/Home";

let lastLocation: string = "/";

function AnimatedRoutes() {
  const location = useLocation();
  useEffect(() => {
    if (!(lastLocation === "/") && location.pathname === "/") {
      window.location.reload();
      lastLocation = "/";
    }
    lastLocation = location.pathname;
  }, [location]);
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.key}>
        <Route path="/" element={<HomePage key="home" />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
