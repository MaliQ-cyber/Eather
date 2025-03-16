"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getStudyStats } from "@/app/actions"
import { Clock, Calendar, TrendingUp, Award } from "lucide-react"

export function ProgressStats() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const result = await getStudyStats()
      if (result.success) {
        setStats(result.data)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`
    }
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  // Calculate average session length
  const avgSessionLength =
    stats?.totalMinutes && stats?.sessionsCount ? Math.round(stats.totalMinutes / stats.sessionsCount) : 0

  // Calculate streak (placeholder - in a real app this would be more complex)
  const streak = 3

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Study Statistics</CardTitle>
        <CardDescription>Your study habits at a glance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg">
              <Clock className="h-8 w-8 mb-2 text-primary" />
              <span className="text-2xl font-bold">
                {stats?.totalMinutes ? formatDuration(stats.totalMinutes) : "0"}
              </span>
              <span className="text-sm text-muted-foreground">Total Time</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg">
              <Calendar className="h-8 w-8 mb-2 text-primary" />
              <span className="text-2xl font-bold">{stats?.sessionsCount || 0}</span>
              <span className="text-sm text-muted-foreground">Sessions</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg">
              <TrendingUp className="h-8 w-8 mb-2 text-primary" />
              <span className="text-2xl font-bold">{formatDuration(avgSessionLength)}</span>
              <span className="text-sm text-muted-foreground">Avg Session</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg">
              <Award className="h-8 w-8 mb-2 text-primary" />
              <span className="text-2xl font-bold">{streak}</span>
              <span className="text-sm text-muted-foreground">Day Streak</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

