import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { SettingsForm } from "@/components/settings-form"

export const metadata: Metadata = {
  title: "Study Buddy - Settings",
  description: "Customize your Study Buddy experience",
}

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="container flex-1 space-y-4 p-8 pt-6">
        <DashboardHeader heading="Settings" text="Customize your Study Buddy experience" />

        <SettingsForm />
      </div>
    </div>
  )
}