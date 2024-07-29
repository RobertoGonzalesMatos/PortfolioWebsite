import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./HomePage/Home";
import CodePage from "./Code/Code";

function AnimatedRoutes() {
  const location = useLocation();
  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("hasReloaded");
    const lastLocation = sessionStorage.getItem("lastLocation");

    if (lastLocation !== location.pathname && hasReloaded === "false") {
      sessionStorage.setItem("hasReloaded", "true");
      sessionStorage.setItem("lastLocation", location.pathname);
      window.location.reload();
    } else {
      sessionStorage.setItem("hasReloaded", "false");
      sessionStorage.setItem("lastLocation", location.pathname);
    }
  }, [location]);

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
