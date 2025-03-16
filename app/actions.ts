"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/db"

type SessionData = {
  subject: string
  duration: number
  completed: boolean
  notes?: string
}

export async function saveSession(data: SessionData) {
  try {
    // In a real app, you'd get the user ID from the session
    // For now, we'll use a dummy user ID
    const userId = "dummy-user-id"

    // Create a new session
    await prisma.session.create({
      data: {
        userId,
        subject: data.subject,
        duration: data.duration,
        completed: data.completed,
        notes: data.notes,
      },
    })

    revalidatePath("/")
    revalidatePath("/progress")

    return { success: true }
  } catch (error) {
    console.error("Failed to save session:", error)
    return { success: false, error: "Failed to save session" }
  }
}

export async function getRecentSessions() {
  try {
    // In a real app, you'd get the user ID from the session
    const userId = "dummy-user-id"

    const sessions = await prisma.session.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    })

    return { success: true, data: sessions }
  } catch (error) {
    console.error("Failed to fetch sessions:", error)
    return { success: false, error: "Failed to fetch sessions" }
  }
}

export async function getStudyStats() {
  try {
    // In a real app, you'd get the user ID from the session
    const userId = "dummy-user-id"

    // Get total study time
    const sessions = await prisma.session.findMany({
      where: {
        userId,
        completed: true,
      },
      select: {
        duration: true,
        createdAt: true,
      },
    })

    const totalMinutes = sessions.reduce((acc, session) => acc + session.duration, 0)

    // Get study time by day for the last 7 days
    const now = new Date()
    const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7))

    const dailyStats = await prisma.session.groupBy({
      by: ["createdAt"],
      where: {
        userId,
        completed: true,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      _sum: {
        duration: true,
      },
    })

    return {
      success: true,
      data: {
        totalMinutes,
        sessionsCount: sessions.length,
        dailyStats,
      },
    }
  } catch (error) {
    console.error("Failed to fetch study stats:", error)
    return { success: false, error: "Failed to fetch study stats" }
  }
}