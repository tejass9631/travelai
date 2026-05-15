'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, MessageCircle, Loader } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AITravelChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hi! 👋 I\'m your AI Travel Assistant. Tell me about your dream trip and I\'ll help you plan it!',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const sampleResponses = [
        "That sounds amazing! 🌍 Based on your preferences, I'd recommend visiting during the season that offers the best weather and fewer crowds.",
        "Great choice! 🏖️ Here's what I suggest: Spend 3 days exploring the beaches, 2 days on adventure activities, and 1 day relaxing at the resort.",
        "I love your travel style! 💰 Here's a budget breakdown: Flights (30%), Hotels (35%), Food & Activities (35%).",
        "Perfect! 🎒 Let me create a personalized itinerary for you with activities, restaurants, and travel tips.",
      ]

      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: randomResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 800)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-[500px] bg-gradient-to-b from-primary-50 to-white rounded-2xl shadow-glass border border-white/20 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white p-4 flex items-center gap-3">
        <MessageCircle size={24} />
        <div>
          <h3 className="font-bold">AI Travel Assistant</h3>
          <p className="text-xs text-white/80">Online • Always ready to help</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-primary-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-primary-100 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">{message.timestamp.toLocaleTimeString()}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2 items-center text-primary-600"
          >
            <Loader size={16} className="animate-spin" />
            <p className="text-sm">AI is thinking...</p>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Tell me about your trip..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 bg-gray-50"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
