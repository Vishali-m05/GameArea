import React from "react";
import GameCard from "../components/GameCard";
import PageWrapper from "../components/PageWrapper";

const Home = () => {
  const games = [
    { title: "Speed of Love", emoji: "💓", path: "/speed-love" },
    { title: "Hidden Secrets", emoji: "🔍", path: "/hidden-secrets" },
    { title: "Falling Affection", emoji: "❤️", path: "/falling-affection" },
    { title: "Cute Quiz", emoji: "❓", path: "/cute-quiz" },
    { title: "Talk to Me", emoji: "🤖", path: "/talk-to-me" },
  ];

  return (
    <PageWrapper>
      <div className="home">
        <h1 className="title">Choose Your Experience</h1>

        <div className="grid">
          {games.map((game, index) => (
            <GameCard key={index} {...game} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;