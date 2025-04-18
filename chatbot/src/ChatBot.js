class ChatBot {
    constructor() {
      // Define the questions and answers
      this.qa = [
        {
          question: "What's the most eco-friendly route to my destination today?",
          answer:
            "The most eco-friendly route avoids high-traffic areas and uses roads with smoother traffic flow to reduce emissions.",
          icon: "✅",
        },
        {
          question: "Can you suggest public transport options instead of driving?",
          answer:
            "Yes! Public transport is a great choice. Buses, subways, or trains can significantly reduce your carbon footprint.",
          icon: "🚌",
        },
        {
          question: "How much CO₂ will I save if I bike instead of drive this route?",
          answer: "Biking instead of driving can reduce your CO₂ emissions by up to 90% for short to medium distances.",
          icon: "🚴",
        },
        {
          question: "Are there any carpooling opportunities or ride-shares on this route?",
          answer:
            "Carpooling is a sustainable option. Sharing your ride with even one other person cuts your travel emissions in half.",
          icon: "🚗",
        },
        {
          question: "What's the estimated carbon footprint of my current travel plan?",
          answer:
            "Based on an average vehicle, the carbon footprint for your trip could be reduced by using greener modes like biking, walking, or transit.",
          icon: "🌱",
        },
      ]
  
      // Fallback responses
      this.fallbacks = [
        "I'm focused on sustainable route planning. Could you ask me about eco-friendly routes, public transport, carbon savings, or carpooling?",
        "I don't have information on that. I can help with questions about sustainable transportation and route planning.",
        "I'm specialized in sustainable route planning. Try asking about eco-friendly routes or carbon footprints.",
        "I'm not sure about that. I can answer questions about eco-friendly routes, public transport options, and carbon savings.",
      ]
    }
  
    getResponse(userInput) {
      // Convert to lowercase for case-insensitive matching
      const input = userInput.toLowerCase()
  
      // Check for matches with predefined questions
      for (const item of this.qa) {
        // Simple fuzzy matching - check if key terms from the question appear in the input
        const questionKeywords = this.extractKeywords(item.question)
        const matchScore = this.calculateMatchScore(input, questionKeywords)
  
        if (matchScore > 0.5) {
          return {
            text: item.answer,
            icon: item.icon,
          }
        }
      }
  
      // If no match is found, return a random fallback response
      const randomIndex = Math.floor(Math.random() * this.fallbacks.length)
      return {
        text: this.fallbacks[randomIndex],
        icon: "❓",
      }
    }
  
    extractKeywords(text) {
      // Simple keyword extraction - remove common words and keep important ones
      const lowercaseText = text.toLowerCase()
      const words = lowercaseText.split(/\W+/)
      const stopWords = [
        "the",
        "a",
        "an",
        "is",
        "are",
        "in",
        "on",
        "at",
        "to",
        "for",
        "of",
        "with",
        "by",
        "as",
        "i",
        "you",
        "he",
        "she",
        "it",
        "we",
        "they",
        "my",
        "your",
        "his",
        "her",
        "its",
        "our",
        "their",
        "this",
        "that",
        "these",
        "those",
        "am",
        "is",
        "are",
        "was",
        "were",
        "be",
        "been",
        "being",
        "have",
        "has",
        "had",
        "do",
        "does",
        "did",
        "can",
        "could",
        "will",
        "would",
        "shall",
        "should",
        "may",
        "might",
        "must",
        "any",
      ]
  
      return words.filter((word) => word.length > 2 && !stopWords.includes(word))
    }
  
    calculateMatchScore(input, keywords) {
      if (keywords.length === 0) return 0
  
      let matches = 0
      for (const keyword of keywords) {
        if (input.includes(keyword)) {
          matches++
        }
      }
  
      return matches / keywords.length
    }
  }
  
  export default ChatBot