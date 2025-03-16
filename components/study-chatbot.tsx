"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SendHorizontal, Bot } from "lucide-react"

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

export function StudyChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm your Study Buddy assistant. Ask me for study tips or help with staying motivated!",
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
      userInputLower.includes("motivat") ||
      userInputLower.includes("focus") ||
      userInputLower.includes("concentrate")
    ) {
      response =
        "To stay motivated, try setting clear goals, rewarding yourself after completing tasks, and remembering why you started. Breaking down your work into smaller tasks can also help maintain focus."
    } else if (
      userInputLower.includes("tired") ||
      userInputLower.includes("sleep") ||
      userInputLower.includes("rest")
    ) {
      response =
        "Getting enough sleep is crucial for effective studying. If you're feeling tired, try taking a short 20-minute nap or go for a walk to refresh your mind."
    } else if (
      userInputLower.includes("stress") ||
      userInputLower.includes("anxious") ||
      userInputLower.includes("overwhelm")
    ) {
      response =
        "It's normal to feel stressed during intense study periods. Try deep breathing exercises, short meditation sessions, or physical activity to reduce stress. Remember to take breaks and be kind to yourself."
    } else if (userInputLower.includes("thank")) {
      response = "You're welcome! I'm here to help you succeed in your studies. Keep up the good work!"
    } else if (userInputLower.includes("hello") || userInputLower.includes("hi") || userInputLower.includes("hey")) {
      response = "Hello! How can I help with your studying today?"
    } else {
      response =
        "I'm here to help with study tips and motivation. Would you like a study tip or advice on staying focused?"
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Study Assistant</CardTitle>
        <CardDescription>Ask for study tips, motivation, or help with staying focused</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
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
                  ) : null}
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
      <CardFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input
            placeholder="Ask for study tips or help..."
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

