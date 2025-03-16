import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { NewSessionForm } from "@/components/new-session-form"

export const metadata: Metadata = {
  title: "Study Buddy - New Session",
  description: "Start a new study session",
}

export default function NewSessionPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="container flex-1 space-y-4 p-8 pt-6">
        <DashboardHeader heading="New Study Session" text="Set up your study session details" />

        <NewSessionForm />
      </div>
    </div>
  )
}