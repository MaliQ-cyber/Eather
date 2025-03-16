"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getRecentSessions } from "@/app/actions"

type Session = {
  id: string
  subject: string
  duration: number
  completed: boolean
  notes?: string
  createdAt: string
}

export function SessionsList() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const result = await getRecentSessions()
      if (result.success) {
        setSessions(result.data)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`
    }
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Study Sessions</CardTitle>
        <CardDescription>A history of your recent study sessions</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : sessions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>{formatDate(session.createdAt)}</TableCell>
                  <TableCell className="font-medium">{session.subject}</TableCell>
                  <TableCell>{formatDuration(session.duration)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        session.completed
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                      }`}
                    >
                      {session.completed ? "Completed" : "In Progress"}
                    </span>
                  </TableCell>
                  <TableCell>{session.notes || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-muted-foreground mb-2">No study sessions recorded yet.</p>
            <p className="text-sm text-muted-foreground">Start a study session to track your progress!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

