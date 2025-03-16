"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { BookOpen, BarChart2, MessageCircle, Settings } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Study",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
      active: pathname === "/",
    },
    {
      href: "/progress",
      label: "Progress",
      icon: <BarChart2 className="mr-2 h-4 w-4" />,
      active: pathname === "/progress",
    },
    {
      href: "/chat",
      label: "Study Tips",
      icon: <MessageCircle className="mr-2 h-4 w-4" />,
      active: pathname === "/chat",
    },
    {
      href: "/settings",
      label: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      active: pathname === "/settings",
    },
  ]

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-2 mr-4">
          <BookOpen className="h-6 w-6" />
          <span className="font-bold text-xl">Study Buddy</span>
        </div>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Button variant="ghost" className="flex items-center">
                {route.icon}
                {route.label}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}

