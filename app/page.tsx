import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { PomodoroTimer } from "@/components/pomodoro-timer"
import { StudyProgress } from "@/components/study-progress"
import { StudyChatbot } from "@/components/study-chatbot"

export const metadata: Metadata = {
  title: "Study Buddy - Dashboard",
  description: "Track your study sessions and stay focused",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="container flex-1 space-y-4 p-8 pt-6">
        <DashboardHeader heading="Study Dashboard" text="Track your study sessions and stay focused">
          <Link href="/new-session">
            <Button>Start New Session</Button>
          </Link>
        </DashboardHeader>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-1 lg:col-span-2">
            <PomodoroTimer />
          </div>
          <div className="col-span-1">
            <StudyProgress />
          </div>
        </div>

        <div className="mt-6">
          <StudyChatbot />
        </div>
      </div>
    </div>
  )
}