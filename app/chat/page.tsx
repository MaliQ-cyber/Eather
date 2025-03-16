import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { FullChatbot } from "@/components/full-chatbot"

export const metadata: Metadata = {
  title: "Study Buddy - Chat Assistant",
  description: "Get study tips and motivation from your AI study assistant",
}

export default function ChatPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="container flex-1 space-y-4 p-8 pt-6">
        <DashboardHeader heading="Study Assistant" text="Get study tips, motivation, and help with staying focused" />

        <FullChatbot />
      </div>
    </div>
  )
}