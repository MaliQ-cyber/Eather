"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getRecentSessions, getStudyStats } from "@/app/actions"
import { Clock, BookOpen } from "lucide-react"

type Session = {
  id: string
  subject: string
  duration: number
  completed: boolean
  createdAt: string
}

type Stats = {
  totalMinutes: number
  sessionsCount: number
  dailyStats: any[]
}

export function StudyProgress() {
  const [recentSessions, setRecentSessions] = useState<Session[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      const sessionsResult = await getRecentSessions()
      if (sessionsResult.success) {
        setRecentSessions(sessionsResult.data)
      }

      const statsResult = await getStudyStats()
      if (statsResult.success) {
        setStats(statsResult.data)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
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
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Study Progress</CardTitle>
        <CardDescription>Track your study sessions and progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg">
                <Clock className="h-8 w-8 mb-2 text-primary" />
                <span className="text-2xl font-bold">
                  {stats?.totalMinutes ? formatDuration(stats.totalMinutes) : "0"}
                </span>
                <span className="text-sm text-muted-foreground">Total Study Time</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg">
                <BookOpen className="h-8 w-8 mb-2 text-primary" />
                <span className="text-2xl font-bold">{stats?.sessionsCount || 0}</span>
                <span className="text-sm text-muted-foreground">Sessions Completed</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Recent Sessions</h3>
              {recentSessions.length > 0 ? (
                <ul className="space-y-2">
                  {recentSessions.slice(0, 5).map((session) => (
                    <li key={session.id} className="flex justify-between items-center p-2 rounded-md hover:bg-muted">
                      <div>
                        <p className="font-medium">{session.subject}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(session.createdAt)}</p>
                      </div>
                      <span className="text-sm font-medium">{formatDuration(session.duration)}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-sm">No study sessions recorded yet.</p>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

