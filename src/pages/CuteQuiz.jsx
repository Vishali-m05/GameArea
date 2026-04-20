import React, { useState } from "react";
import "./CuteQuiz.css";

const questions = [
  {
    question: "What do you usually do first in the morning?",
    options: ["Check phone", "Go back to sleep", "Drink water", "Plan the day"],
  },
  {
    question: "Your favorite type of movie?",
    options: ["Comedy", "Romance", "Action", "Thriller"],
  },
  {
    question: "What’s your comfort food?",
    options: ["Pizza", "Biryani", "Chocolate", "Ice cream"],
  },
  {
    question: "Your ideal weekend is?",
    options: [
      "Sleeping all day",
      "Hanging out with friends",
      "Traveling somewhere",
      "Staying home and relaxing",
    ],
  },
  {
    question: "Pick a color vibe:",
    options: ["Blue", "Black", "Yellow", "Red"],
  },
  {
    question: "What do you usually do when you’re stressed?",
    options: ["Sleep", "Listen to music", "Talk to someone", "Eat something"],
  },
  {
    question: "What’s more important to you?",
    options: ["Money", "Peace", "Success", "Love"],
  },
  {
    question: "Your favorite time of the day?",
    options: ["Morning", "Afternoon", "Evening", "Night"],
  },
  {
    question: "Would you rather:",
    options: [
      "Travel alone",
      "Travel with friends",
      "Stay home and chill",
      "Go on an adventure",
    ],
  },
  {
    question: "What kind of person are you?",
    options: ["Funny", "Calm", "Talkative", "Quiet observer"],
  },
  {
    question: "When we talk for a long time, what usually happens?",
    options: [
      "We laugh a lot",
      "We go into deep talks",
      "We tease each other",
      "Time just flies",
    ],
  },
  {
    question: "What kind of moment feels most 'us'?",
    options: [
      "Late-night chats",
      "Silent moments",
      "Funny arguments",
      "Random updates",
    ],
  },
  {
    question: "If we are stuck somewhere together, what would we do?",
    options: [
      "Make fun of it",
      "Plan calmly",
      "Panic then laugh",
      "Turn it into adventure",
    ],
  },
  {
    question: "What do you think we do best together?",
    options: [
      "Talk nonsense",
      "Support each other",
      "Argue & stay fine",
      "Understand silently",
    ],
  },
  {
    question: "At the end of the day, this bond feels like:",
    options: ["Comfort", "Fun chaos", "Understanding", "Unexplainable"],
  },
];

const CuteQuiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showConfirm, setShowConfirm] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  const handleAnswer = (index) => {
    const updated = [...answers];
    updated[currentQ] = index;
    setAnswers(updated);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowConfirm(true);
    }
  };

  const prevQuestion = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    }
  };

  const getResult = () => {
    const count = [0, 0, 0, 0];
    answers.forEach((a) => {
      if (a !== null) count[a]++;
    });

    const max = count.indexOf(Math.max(...count));

    const results = [
      "💙 You're calm, thoughtful, and deep.",
      "🖤 You're emotional, caring, and soft.",
      "💛 You're energetic, fun, and lively!",
      "❤️ You're intense, passionate, and bold!",
    ];

    return results[max];
  };

  return (
    <div className="quiz-container">

      {/* QUESTIONS */}
      {!showConfirm && !showFinal && (
        <div className="quiz-card">
          <h2 className="question">
            {questions[currentQ].question}
          </h2>

          <div className="options">
            {questions[currentQ].options.map((opt, i) => (
              <button
                key={i}
                className={`option-btn ${answers[currentQ] === i ? "selected" : ""}`}
                onClick={() => handleAnswer(i)}
              >
                {opt}
              </button>
            ))}
          </div>

          <div style={{ marginTop: "15px" }}>
            <button onClick={prevQuestion} disabled={currentQ === 0}>
              ⬅ Back
            </button>

            <button onClick={nextQuestion}>
              {currentQ === questions.length - 1 ? "Finish" : "Next ➡"}
            </button>
          </div>

          <p className="count">
            Question {currentQ + 1} / {questions.length}
          </p>
        </div>
      )}

      {/* CONFIRM */}
      {showConfirm && !showFinal && (
        <div className="result-card">
          <h2>Are you sure you want to lock your answers? 💌</h2>

          <button onClick={() => setShowFinal(true)}>
            Submit 💫
          </button>

          <button onClick={() => setShowConfirm(false)}>
            Go Back 🔙
          </button>
        </div>
      )}

      {/* FINAL MESSAGE */}
      {showFinal && (
        <div className="result-card">
          <h1>✨  My Promise ✨</h1>

          <p>{getResult()}</p>

          <p className="final-msg">
            I’ll keep this little version of you safe 💌
            
          </p>

          <button onClick={() => window.location.reload()}>
            Restart 💫
          </button>
        </div>
      )}

    </div>
  );
};

export default CuteQuiz;