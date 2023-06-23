import React, { useState, useRef, useEffect } from "react";
import botIcon from "./assets/bot.svg";
import userIcon from "./assets/user.svg";
import send from "./assets/plane.png";
import "./style.css";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
  }

  function chatStripe(isAi, value, uniqueId) {
    return (
      <div className={`wrapper ${isAi && "ai"}`}>
        <div className="chat">
          <div className="profile">
            <img src={isAi ? botIcon : userIcon} alt={isAi ? "bot" : "user"} />
          </div>
          <div className="message" id={uniqueId}>
            {value}
          </div>
        </div>
      </div>
    );
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const userInput = formData.get("prompt");
    const uniqueId = generateUniqueId();
    inputRef.current.value = "";
    setMessages((prevMessages) => [
      ...prevMessages,
      chatStripe(false, userInput),
    ]);
    formRef.current.reset();
    setMessages((prevMessages) => [
      ...prevMessages,
      chatStripe(true, " ", uniqueId),
    ]);

    try {
      const response = await fetch("http://localhost:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userInput,
        }),
      });

      const { bot } = await response.json();
      const parsedData = bot.trim();
      const messageDiv = document.getElementById(uniqueId);

      messageDiv.innerHTML = parsedData;
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  }

  function handleKeyUp(event) {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  }

  return (
    <div id="app">
      <div id="chat_container">
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div className="line"></div>
        <form ref={formRef} onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
          <textarea
            name="prompt"
            rows="1"
            cols="1"
            placeholder="Ask me anything..."
            ref={inputRef}
          />

          <button type="submit">
            <img src={send} alt="send" />
          </button>
        </form>
    </div>
  );
}

export default Chatbot;
