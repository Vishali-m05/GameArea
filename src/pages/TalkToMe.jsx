import React, { useState, useRef, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import "./TalkToMe.css";

const TalkToMe = () => {
  const [messages, setMessages] = useState([
    { text: "Hey… you finally came 😌", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input;

    setMessages(prev => [...prev, { text: userText, sender: "user" }]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("https://gamearea-1.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userText })
      });

      const data = await response.json();
      const delay = Math.min(1500, 300 + userText.length * 30);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            text: data.reply || "Hmm… say that again? 😅",
            sender: "bot"
          }
        ]);
        setIsTyping(false);
      }, 700);

    } catch (error) {
      setMessages(prev => [
        ...prev,
        { text: "Server not responding 😢", sender: "bot" }
      ]);
      setIsTyping(false);
    }
  };

  return (
    <PageWrapper>
      <div className="page-center">
        <div className="chat-container">

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <div className="bubble">{msg.text}</div>
              </div>
            ))}

            {isTyping && (
              <div className="message bot">
                <div className="typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Say something sweet… 😏"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button onClick={sendMessage} disabled={isTyping}>
              {isTyping ? "Typing..." : "Send 💌"}
            </button>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
};

export default TalkToMe;