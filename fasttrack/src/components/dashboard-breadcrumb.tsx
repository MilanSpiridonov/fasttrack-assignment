"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Helper to convert slug to title
function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

// Mapping for known routes to display names
const routeDisplayNames: Record<string, string> = {
  reports: "Reports",
  diagnostics: "Diagnostics",
  "strategy-in-action": "Strategy in Action",
  "execution-habits": "Execution Habits & Ownership",
  clarity: "Clarity",
  alignment: "Alignment",
  focus: "Focus",
  "meeting-drag": "Meeting Drag",
  accountability: "Accountability",
  "decision-speed": "Decision Speed",
}

export function DashboardBreadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  // Build breadcrumb items with accumulated paths
  const breadcrumbItems = segments
    .map((segment, index) => {
      if (segment === "insights") return null // hide technical segment

      const path = `/${segments.slice(0, index + 1).join("/")}`
      const displayName = routeDisplayNames[segment] || slugToTitle(segment)
      const isLast = index === segments.length - 1

      return {
        path,
        displayName,
        isLast,
      }
    })
    .filter(Boolean) as Array<{ path: string; displayName: string; isLast: boolean }>

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="flex items-center gap-1">
              <Home className="size-3.5" />
              <span className="sr-only">Home</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems.map((item) => (
          <React.Fragment key={item.path}>
            <BreadcrumbSeparator>
              <ChevronRight className="size-3.5" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage>{item.displayName}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.path}>{item.displayName}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
