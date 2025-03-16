"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, RotateCcw, Coffee } from "lucide-react"
import { cn } from "@/lib/utils"
import { saveSession } from "@/app/actions"

type TimerMode = "focus" | "shortBreak" | "longBreak"

const DEFAULT_TIMES = {
  focus: 25 * 60, // 25 minutes in seconds
  shortBreak: 5 * 60, // 5 minutes in seconds
  longBreak: 15 * 60, // 15 minutes in seconds
}

export function PomodoroTimer() {
  const [mode, setMode] = useState<TimerMode>("focus")
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIMES[mode])
  const [isActive, setIsActive] = useState(false)
  const [sessions, setSessions] = useState(0)
  const [subject, setSubject] = useState("Study Session")
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Reset timer when mode changes
  useEffect(() => {
    setTimeLeft(DEFAULT_TIMES[mode])
    setIsActive(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [mode])

  // Timer logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (isActive && timeLeft === 0) {
      setIsActive(false)
      // Play sound
      const audio = new Audio("/notification.mp3")
      audio.play()

      // Handle session completion
      if (mode === "focus") {
        setSessions((prev) => prev + 1)
        // Save session to database
        saveSession({
          subject,
          duration: DEFAULT_TIMES.focus / 60, // Convert to minutes
          completed: true,
        })

        // Switch to break after focus session
        if (sessions % 4 === 3) {
          setMode("longBreak")
        } else {
          setMode("shortBreak")
        }
      } else {
        // Switch back to focus after break
        setMode("focus")
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isActive, timeLeft, mode, sessions, subject])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(DEFAULT_TIMES[mode])
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = ((DEFAULT_TIMES[mode] - timeLeft) / DEFAULT_TIMES[mode]) * 100

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pomodoro Timer</CardTitle>
        <CardDescription>Use the Pomodoro technique to stay focused and take regular breaks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="focus" value={mode} onValueChange={(value) => setMode(value as TimerMode)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="focus">Focus</TabsTrigger>
            <TabsTrigger value="shortBreak">Short Break</TabsTrigger>
            <TabsTrigger value="longBreak">Long Break</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative flex h-64 w-64 items-center justify-center rounded-full">
            <svg className="absolute h-full w-full" viewBox="0 0 100 100">
              <circle
                className="stroke-muted-foreground/20"
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                strokeWidth="8"
              />
              <circle
                className={cn(
                  "stroke-primary transition-all duration-300",
                  mode === "focus" ? "stroke-red-500" : mode === "shortBreak" ? "stroke-green-500" : "stroke-blue-500",
                )}
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                strokeWidth="8"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progress) / 100}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <span className="absolute text-5xl font-bold">{formatTime(timeLeft)}</span>
          </div>

          <div className="flex space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTimer}
              className={cn(
                "h-12 w-12 rounded-full",
                isActive ? "bg-red-100 dark:bg-red-900/20" : "bg-green-100 dark:bg-green-900/20",
              )}
            >
              {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <Button variant="outline" size="icon" onClick={resetTimer} className="h-12 w-12 rounded-full">
              <RotateCcw className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium">
            What are you studying?
          </label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="Enter subject or topic"
          />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <div className="text-sm text-muted-foreground">Sessions completed: {sessions}</div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Coffee className="mr-1 h-4 w-4" />
            {mode === "focus" ? "Focus time" : "Break time"}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

