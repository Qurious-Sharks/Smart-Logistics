import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ChatBotApp from "./ChatBotApp"

function App() {
  return (
    <Router>
      <Routes>
        {/* Route to chatbot */}
        <Route path="/chatbot" element={<ChatBotApp />} />

        {/* Default route or fallback (optional) */}
        <Route path="*" element={<div style={{ padding: "2rem", textAlign: "center" }}>
          <h1>Welcome to SmartRoute Pro</h1>
          <p><a href="/chatbot">Go to EcoRoute ChatBot 🌱</a></p>
        </div>} />
      </Routes>
    </Router>
  )
}

export default App
