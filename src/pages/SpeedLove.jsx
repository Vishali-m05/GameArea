import React, { useState, useEffect, useRef } from "react";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";

const GAME_TIME = 10;

const messagesMap = {
  low: [
    "💔 Wow… even my ex tried harder 😭",
    "🥶 Are you shy or just slow?",
    "💀 This heartbeat needs motivation fr"
  ],
  mid: [
    "😏 Okay okay… I see some effort",
    "👀 Getting interesting… don’t stop now",
    "😉 Hmm… you might impress me"
  ],
  perfect: [
    "❤️ Damn… that rhythm tho 😳",
    "🔥 Smooth operator… I like this",
    "💓 Okay you got game 😉"
  ],
  intense: [
    "😳 Chill… you’re making me nervous",
    "🔥 Ayo this is getting serious",
    "💋 Careful… I might fall for you"
  ],
  overload: [
    "⚠️ Bro relax… this ain't a race 💀",
    "💀 You trying to break the heart??",
    "😵 Too much energy… I’m overwhelmed"
  ]
};

const SpeedLove = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState("Tap to keep the heart alive ❤️");
  const [isBroken, setIsBroken] = useState(false);

  const scoreRef = useRef(score);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // ⏱ Stable Timer
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsPlaying(false);

          if (scoreRef.current < 20) {
            setIsBroken(true);
          }

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // 💓 Tap logic
  const handleTap = () => {
    if (!isPlaying) return;

    setScore((prev) => {
      const newScore = prev + 1;

      let category;
      if (newScore < 20) category = "low";
      else if (newScore < 36) category = "mid";
      else if (newScore <= 50) category = "perfect";
      else if (newScore <= 65) category = "intense";
      else category = "overload";

      const randomMsg =
        messagesMap[category][
          Math.floor(Math.random() * messagesMap[category].length)
        ];

      setMessage(randomMsg);

      return newScore;
    });
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_TIME);
    setIsPlaying(true);
    setIsBroken(false);
    setMessage("Tap to keep the heart alive ❤️");
  };

  return (
    <PageWrapper>
      <div className="game-container">
        <h1 className="game-title">Speed of Love 💓</h1>

        <div className="info">
          <p>⏱ Time: {timeLeft}s</p>
          <p>💯 Score: {score}</p>
        </div>

        {!isPlaying && timeLeft > 0 && (
          <button className="start-btn" onClick={startGame}>
            Start Game
          </button>
        )}

        {isPlaying && (
          <>
            <motion.div
              className={`heart ${isBroken ? "broken" : ""}`}
              whileTap={{ scale: 1.4 }}
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
              onClick={handleTap}
            >
              {isBroken ? "💔" : "💓"}
            </motion.div>

            {/* 🐱 Cat with board */}
            <div className="cat-box">
              <div className="cat">🐱</div>
              <div className="board">{message}</div>
            </div>
          </>
        )}

        {!isPlaying && timeLeft === 0 && (
          <>
            <h2 className="final">Your Score: {score}</h2>

            {score < 20 && <p>💔 We need to talk… this isn’t working 😭</p>}
            {score >= 20 && score < 36 && <p>😏 Not bad… but I expected more</p>}
            {score >= 36 && score <= 50 && <p>❤️ Okay fine… you win my heart 😉</p>}
            {score > 50 && score <= 65 && <p>🔥 Damn… you’re dangerous 😳</p>}
            {score > 65 && <p>⚠️ Too intense… I’m falling too fast 💀</p>}

            <button className="start-btn" onClick={startGame}>
              Play Again
            </button>
          </>
        )}
      </div>
    </PageWrapper>
  );
};

export default SpeedLove;