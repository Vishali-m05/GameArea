import React, { useState, useEffect } from "react";
import "./HiddenSecrets.css";

const levels = [
  { word: "CAT", letters: ["C","A","T","M","P","L"], hint: "🐱 It meows and is a pet" },
  { word: "SMILE", letters: ["S","M","I","L","E","Q","X"], hint: "😊 You do it when you're happy" },
  { word: "CAKE", letters: ["C","A","K","E","B","R"], hint: "🎂 Sweet birthday food" },
  { word: "COFFEE", letters: ["C","O","F","F","E","E","T","P"], hint: "☕ Morning energy drink" },
  { word: "MUSIC", letters: ["M","U","S","I","C","A","T"], hint: "🎵 Makes you feel emotions" },
  { word: "SLEEP", letters: ["S","L","E","E","P","D","R"], hint: "😴 Night activity" },
  { word: "DANCE", letters: ["D","A","N","C","E","F","J"], hint: "💃 Move with rhythm" },
  { word: "LOVE", letters: ["L","O","V","E","S","Q"], hint: "❤️ Strong feeling" },
  { word: "HUG", letters: ["H","U","G","M","P"], hint: "🤗 Warm gesture" },
  { word: "CUTE", letters: ["C","U","T","E","A","R"], hint: "🥺 Very adorable" },
];

// ✅ Better shuffle (Fisher–Yates)
function shuffle(array) {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

const HiddenSecrets = () => {
  const [index, setIndex] = useState(0);
  const [poolLetters, setPoolLetters] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [score, setScore] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [feedback, setFeedback] = useState("");

  const current = levels[index];

  // reset every level
  useEffect(() => {
    setPoolLetters(shuffle(current.letters));
    setSelectedLetters(Array(current.word.length).fill(null));
    setFeedback("");
  }, [index]);

  // pick letter
  const pickLetter = (letter, i) => {
    const emptyIndex = selectedLetters.findIndex((l) => l === null);
    if (emptyIndex === -1) return;

    const updatedSlots = [...selectedLetters];
    updatedSlots[emptyIndex] = letter;

    const updatedPool = [...poolLetters];
    updatedPool.splice(i, 1);

    setSelectedLetters(updatedSlots);
    setPoolLetters(updatedPool);
  };

  // remove letter
  const removeLetter = (i) => {
    if (selectedLetters[i] === null) return;

    const updatedPool = [...poolLetters, selectedLetters[i]];
    const updatedSlots = [...selectedLetters];

    updatedSlots[i] = null;

    setSelectedLetters(updatedSlots);
    setPoolLetters(updatedPool);
  };

  // submit answer
  const submitAnswer = () => {
    const answer = selectedLetters.join("");

    if (answer === current.word) {
      setScore((s) => s + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback("❌ Wrong!");
    }

    setTimeout(() => {
      setFeedback("");

      if (index + 1 < levels.length) {
        setIndex(index + 1);
      } else {
        setShowReward(true);
      }
    }, 800);
  };

  // reset level
  const reset = () => {
    setPoolLetters(shuffle(current.letters));
    setSelectedLetters(Array(current.word.length).fill(null));
    setFeedback("");
  };

  if (showReward) {
    return (
      <div className="reward">
        <h5>
          “The completion doesn’t matter; what matters is you showing up,
          staying consistent, and never giving up — that kind of energy is
          enough to make life feel a little more special…”
        </h5>
        <p>and here’s your reward 😉</p>
        <div className="flowers">🌸 🌺 🌼 💐 🌸</div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h2>Hidden Secret Game</h2>

      <div className="score">Score: {score}</div>

      <div className="hint">Hint: {current.hint}</div>

      {feedback && <div className="feedback">{feedback}</div>}

      {/* Slots */}
      <div className="slots">
        {selectedLetters.map((l, i) => (
          <div key={i} className="slot" onClick={() => removeLetter(i)}>
            {l}
          </div>
        ))}
      </div>

      {/* Letters */}
      <div className="letters">
        {poolLetters.map((l, i) => (
          <button key={i} onClick={() => pickLetter(l, i)}>
            {l}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="controls">
        <button className="reset" onClick={reset}>Reset</button>
        <button className="submit" onClick={submitAnswer}>Submit</button>
      </div>
    </div>
  );
};

export default HiddenSecrets;