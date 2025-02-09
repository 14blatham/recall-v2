"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Brain, FileText, Home, Link as LinkIcon, MessageSquare, Mic } from "lucide-react"

const items = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home
  },
  {
    title: "Notes",
    href: "/notes",
    icon: FileText
  },
  {
    title: "Sources",
    href: "/sources",
    icon: LinkIcon
  },
  {
    title: "AI Chat",
    href: "/ai-chat",
    icon: MessageSquare
  },
  {
    title: "Voice",
    href: "/voice",
    icon: Mic
  },
  {
    title: "Threads",
    href: "/threads",
    icon: Brain
  }
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col space-y-2">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent" : "transparent"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}