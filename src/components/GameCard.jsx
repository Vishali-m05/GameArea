

import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const GameCard = ({ title, emoji, path }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="game-card"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(path)}
    >
      <div className="emoji">{emoji}</div>
      <h3>{title}</h3>
    </motion.div>
  );
};

export default GameCard;