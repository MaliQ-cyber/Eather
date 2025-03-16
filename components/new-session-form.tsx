"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { saveSession } from "@/app/actions"
import { BookOpen, Clock, ListChecks } from "lucide-react"

export function NewSessionForm() {
  const router = useRouter()
  const [subject, setSubject] = useState("")
  const [duration, setDuration] = useState("25")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await saveSession({
        subject,
        duration: Number.parseInt(duration),
        completed: false,
        notes,
      })

      router.push("/")
    } catch (error) {
      console.error("Error creating session:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Study Session</CardTitle>
        <CardDescription>Set up your study session details to track your progress</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="subject" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Subject or Topic
            </Label>
            <Input
              id="subject"
              placeholder="e.g., Mathematics, History, Programming"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Planned Duration (minutes)
            </Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger id="duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="25">25 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="90">1.5 hours</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="flex items-center gap-2">
              <ListChecks className="h-4 w-4" />
              Session Goals or Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="What do you want to accomplish in this session?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Start Session"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

