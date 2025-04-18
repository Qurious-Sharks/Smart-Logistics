function ChatMessage({ message }) {
    const { text, sender, timestamp, icon } = message
  
    // Format timestamp
    const formatTime = (date) => {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  
    return (
      <div className={`message-wrapper ${sender === "user" ? "user-message" : "bot-message"}`}>
        <div className="message">
          {sender === "bot" && (
            <div className="avatar">
              <span>{icon || "🌱"}</span>
            </div>
          )}
  
          <div className="message-content">
            <div className="message-text">{text}</div>
            <div className="message-time">{formatTime(timestamp)}</div>
          </div>
        </div>
      </div>
    )
  }
  
  export default ChatMessage