"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getStudyStats } from "@/app/actions"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function ProgressChart() {
  const [chartData, setChartData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const result = await getStudyStats()

      if (result.success) {
        // Generate data for the last 7 days
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date()
          date.setDate(date.getDate() - i)
          return {
            date: date.toISOString().split("T")[0],
            displayDate: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
            minutes: 0,
          }
        }).reverse()

        // Fill in actual data where available
        if (result.data.dailyStats) {
          result.data.dailyStats.forEach((stat: any) => {
            const statDate = new Date(stat.createdAt).toISOString().split("T")[0]
            const dayIndex = last7Days.findIndex((day) => day.date === statDate)

            if (dayIndex !== -1) {
              last7Days[dayIndex].minutes = stat._sum.duration
            }
          })
        }

        setChartData(last7Days)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Weekly Study Time</CardTitle>
        <CardDescription>Your study minutes for the past 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="displayDate" tick={{ fontSize: 12 }} tickFormatter={(value) => value.split(" ")[0]} />
                <YAxis label={{ value: "Minutes", angle: -90, position: "insideLeft" }} tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => [`${value} minutes`, "Study Time"]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Bar dataKey="minutes" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

