import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProgressStats } from "@/components/progress-stats"
import { ProgressChart } from "@/components/progress-chart"
import { SessionsList } from "@/components/sessions-list"

export const metadata: Metadata = {
  title: "Study Buddy - Progress",
  description: "Track your study progress over time",
}

export default function ProgressPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="container flex-1 space-y-4 p-8 pt-6">
        <DashboardHeader heading="Study Progress" text="Track your study habits and progress over time" />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ProgressStats />
          <div className="md:col-span-2">
            <ProgressChart />
          </div>
        </div>

        <SessionsList />
      </div>
    </div>
  )
}