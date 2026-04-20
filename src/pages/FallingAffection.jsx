import React, { useEffect, useRef, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import "./FallingAffection.css";

const GAME_TIME = 40;

const FallingAffection = () => {
  const [hearts, setHearts] = useState([]);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(2);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [gameOver, setGameOver] = useState(false);

  const requestRef = useRef();
  const lastSpawnRef = useRef(Date.now());

  const endMessage =
    "You caught hearts so well… I wonder if you’ll catch mine too 💖";

  const spawnItem = () => {
    const rand = Math.random();

    let type = "heart";
    if (rand > 0.6) type = "gold";
    else if (rand > 0.3) type = "bomb";

    return {
      id: crypto.randomUUID(),
      type,
      x: Math.random() * (window.innerWidth - 50),
      y: -60,
      size: 25 + Math.random() * 20,
    };
  };

  // GAME LOOP
  const updateGame = () => {
    if (gameOver) return;

    const now = Date.now();

    if (now - lastSpawnRef.current > 650) {
      setHearts((prev) => [...prev, spawnItem()]);
      lastSpawnRef.current = now;
    }

    setHearts((prev) =>
      prev
        .map((h) => ({ ...h, y: h.y + speed }))
        .filter((h) => h.y < window.innerHeight + 100)
    );

    requestRef.current = requestAnimationFrame(updateGame);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGame);

    const speedInterval = setInterval(() => {
      setSpeed((s) => Math.min(s + 0.4, 10));
    }, 3000);

    return () => {
      cancelAnimationFrame(requestRef.current);
      clearInterval(speedInterval);
    };
  }, [gameOver]);

  // TIMER
  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setGameOver(true);
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver]);

  // CATCH LOGIC
  const catchItem = (item) => {
    if (gameOver) return;

    setHearts((prev) => prev.filter((h) => h.id !== item.id));

    if (item.type === "heart") setScore((s) => s + 1);
    else if (item.type === "gold") setScore((s) => s + 5);
    else if (item.type === "bomb") setScore((s) => Math.max(0, s - 3));
  };

  return (
    <PageWrapper>
      <div className="game-container">
        <h1>💖 Falling Affection</h1>
        <h2>Score: {score}</h2>
        <h2>⏱ Time: {timeLeft}s</h2>

        {/* HEARTS */}
        {hearts.map((item) => (
          <div
            key={item.id}
            className={`item ${item.type}`}
            style={{
              left: item.x,
              top: item.y,
              fontSize: item.size,
            }}
            onPointerDown={() => catchItem(item)}
          >
            {item.type === "heart" && "❤️"}
            {item.type === "gold" && "💛"}
            {item.type === "bomb" && "💣"}
          </div>
        ))}

        {/* 💔 GAME OVER POPUP */}
        {gameOver && (
          <div className="game-over-overlay">
            <div className="game-over-card">
              <h2>💖 Game Over</h2>
              <h3>Score: {score}</h3>
              <p>{endMessage}</p>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default FallingAffection;