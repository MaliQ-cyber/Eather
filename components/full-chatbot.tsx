"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SendHorizontal, Bot, User } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

// Study tips database
const studyTips = [
  "Try the Pomodoro technique: 25 minutes of focused study followed by a 5-minute break.",
  "Stay hydrated! Drinking water helps maintain concentration and cognitive function.",
  "Review your notes within 24 hours of taking them to improve retention.",
  "Teach what you've learned to someone else (or even to an imaginary student) to reinforce your understanding.",
  "Use active recall instead of passive re-reading. Quiz yourself on the material.",
  "Create mind maps to visualize connections between concepts.",
  "Study in a quiet environment with minimal distractions.",
  "Get enough sleep! Sleep is crucial for memory consolidation.",
  "Break down large tasks into smaller, manageable chunks.",
  "Use spaced repetition to review material at increasing intervals.",
  "Try different study locations to improve memory recall.",
  "Exercise regularly to boost brain function and reduce stress.",
  "Use mnemonic devices to remember complex information.",
  "Take short breaks to prevent mental fatigue.",
  "Set specific, achievable goals for each study session.",
  "Listen to instrumental music (without lyrics) if it helps you focus.",
  "Use color-coding in your notes to organize information.",
  "Explain difficult concepts in your own words to check understanding.",
  "Create flashcards for key terms and concepts.",
  "Review the most difficult material when your energy levels are highest.",
]

// Learning techniques
const learningTechniques = [
  {
    name: "Feynman Technique",
    description: "Choose a concept, teach it to a beginner, identify gaps in your explanation, review and simplify.",
  },
  {
    name: "Spaced Repetition",
    description: "Review information at increasing intervals to improve long-term retention.",
  },
  {
    name: "Active Recall",
    description: "Test yourself on material instead of passively reviewing it.",
  },
  {
    name: "Mind Mapping",
    description: "Create visual diagrams to connect ideas and concepts.",
  },
  {
    name: "Cornell Note-Taking",
    description: "Divide your notes into cues, notes, and summary sections for better organization.",
  },
  {
    name: "Pomodoro Technique",
    description: "Work for 25 minutes, then take a 5-minute break. After 4 cycles, take a longer break.",
  },
  {
    name: "Interleaving",
    description: "Mix different topics or subjects during a study session instead of focusing on just one.",
  },
]

// Motivation quotes
const motivationQuotes = [
  "The expert in anything was once a beginner. — Helen Hayes",
  "Success is the sum of small efforts, repeated day in and day out. — Robert Collier",
  "The secret of getting ahead is getting started. — Mark Twain",
  "Don't wish it were easier; wish you were better. — Jim Rohn",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Education is the passport to the future, for tomorrow belongs to those who prepare for it today. — Malcolm X",
  "The beautiful thing about learning is that no one can take it away from you. — B.B. King",
  "The only place where success comes before work is in the dictionary. — Vidal Sassoon",
  "Your future is created by what you do today, not tomorrow.",
  "The difference between try and triumph is just a little umph!",
]

export function FullChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi there! I'm your Study Buddy assistant. Ask me for study tips, learning techniques, or help with staying motivated!",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot thinking
    setTimeout(() => {
      respondToMessage(input)
      setIsTyping(false)
    }, 1000)
  }

  const respondToMessage = (userInput: string) => {
    const userInputLower = userInput.toLowerCase()
    let response = ""

    // Simple keyword matching
    if (userInputLower.includes("tip") || userInputLower.includes("advice") || userInputLower.includes("help")) {
      // Return a random study tip
      response = studyTips[Math.floor(Math.random() * studyTips.length)]
    } else if (
      userInputLower.includes("technique") ||
      userInputLower.includes("method") ||
      userInputLower.includes("strategy")
    ) {
      // Return a learning technique
      const technique = learningTechniques[Math.floor(Math.random() * learningTechniques.length)]
      response = `**${technique.name}**: ${technique.description}`
    } else if (
      userInputLower.includes("motivat") ||
      userInputLower.includes("inspire") ||
      userInputLower.includes("encourage")
    ) {
      // Return a motivation quote
      response = motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)]
    } else if (
      userInputLower.includes("focus") ||
      userInputLower.includes("concentrate") ||
      userInputLower.includes("attention")
    ) {
      response =
        "To improve focus, try eliminating distractions, using the Pomodoro technique, or finding a quiet study environment. Regular breaks and staying hydrated also help maintain concentration."
    } else if (
      userInputLower.includes("tired") ||
      userInputLower.includes("sleep") ||
      userInputLower.includes("rest")
    ) {
      response =
        "Getting enough sleep is crucial for effective studying. If you're feeling tired, try taking a short 20-minute nap or go for a walk to refresh your mind. Aim for 7-9 hours of sleep each night for optimal cognitive function."
    } else if (
      userInputLower.includes("stress") ||
      userInputLower.includes("anxious") ||
      userInputLower.includes("overwhelm")
    ) {
      response =
        "It's normal to feel stressed during intense study periods. Try deep breathing exercises, short meditation sessions, or physical activity to reduce stress. Remember to take breaks and be kind to yourself."
    } else if (
      userInputLower.includes("memory") ||
      userInputLower.includes("remember") ||
      userInputLower.includes("forget")
    ) {
      response =
        "To improve memory retention, try active recall, spaced repetition, teaching the material to someone else, or creating mnemonic devices. Getting enough sleep is also crucial for memory consolidation."
    } else if (userInputLower.includes("thank")) {
      response = "You're welcome! I'm here to help you succeed in your studies. Keep up the good work!"
    } else if (userInputLower.includes("hello") || userInputLower.includes("hi") || userInputLower.includes("hey")) {
      response =
        "Hello! How can I help with your studying today? You can ask me for study tips, learning techniques, or motivation."
    } else {
      response =
        "I'm here to help with study tips, learning techniques, and motivation. Would you like a study tip, a learning technique, or some motivation to keep going?"
    }

    const botMessage: Message = {
      id: Date.now().toString(),
      content: response,
      sender: "bot",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, botMessage])
  }

  return (
    <Card className="w-full h-[calc(100vh-12rem)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          Study Assistant
        </CardTitle>
        <CardDescription>Ask for study tips, learning techniques, or help with staying motivated</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-[calc(100vh-20rem)] pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  {message.sender === "bot" ? (
                    <Avatar>
                      <AvatarFallback>
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar>
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <Avatar>
                    <AvatarFallback>
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg p-3 bg-muted">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce delay-75"></div>
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input
            placeholder="Ask for study tips, techniques, or motivation..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

