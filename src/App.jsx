import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import SpeedLove from "./pages/SpeedLove";
import HiddenSecrets from "./pages/HiddenSecrets";
import FallingAffection from "./pages/FallingAffection";
import CuteQuiz from "./pages/CuteQuiz";
import TalkToMe from "./pages/TalkToMe";


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/speed-love" element={<SpeedLove />} />
        <Route path="/hidden-secrets" element={<HiddenSecrets />} />
        <Route path="/falling-affection" element={<FallingAffection />} />
        <Route path="/cute-quiz" element={<CuteQuiz />} />
        <Route path="/talk-to-me" element={<TalkToMe />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;