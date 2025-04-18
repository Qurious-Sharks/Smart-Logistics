"use client"

import { useState, useEffect, useRef } from "react"
import ChatMessage from "./ChatMessage"
import ChatInput from "./ChatInput"
import ChatBot from "./ChatBot"
import "./styles.css"

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your sustainable route planning assistant. Ask me about eco-friendly routes, public transport options, carbon savings, carpooling, or carbon footprints.",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const chatbot = new ChatBot()

  const handleSendMessage = (text) => {
    if (!text.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prevMessages) => [...prevMessages, userMessage])
    setIsTyping(true)

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = chatbot.getResponse(text)
      const botMessage = {
        id: messages.length + 2,
        text: botResponse.text,
        sender: "bot",
        timestamp: new Date(),
        icon: botResponse.icon,
      }

      setMessages((prevMessages) => [...prevMessages, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="app-container">
      <div className="chat-container">
        <header className="chat-header">
          <div className="logo">
            <span className="logo-icon">🌱</span>
            <h1>EcoRoute Assistant</h1>
          </div>
          <p className="tagline">Plan your journey with the planet in mind</p>
        </header>

        <div className="messages-container">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isTyping && (
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSendMessage={handleSendMessage} />
      </div>

      <div className="suggestions">
        <h3>Try asking:</h3>
        <div className="suggestion-buttons">
          <button onClick={() => handleSendMessage("What's the most eco-friendly route to my destination today?")}>
            Eco-friendly route?
          </button>
          <button onClick={() => handleSendMessage("Can you suggest public transport options instead of driving?")}>
            Public transport options?
          </button>
          <button onClick={() => handleSendMessage("How much CO₂ will I save if I bike instead of drive this route?")}>
            CO₂ savings from biking?
          </button>
          <button
            onClick={() => handleSendMessage("Are there any carpooling opportunities or ride-shares on this route?")}
          >
            Carpooling options?
          </button>
          <button onClick={() => handleSendMessage("What's the estimated carbon footprint of my current travel plan?")}>
            Carbon footprint?
          </button>
        </div>
      </div>
    </div>
  )
}

export default App