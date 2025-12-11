import type { SectionStatus } from "./types"

/**
 * Status color utilities for consistent styling across the app
 */

export const statusTextColors: Record<SectionStatus, string> = {
  Strong: "text-emerald-600",
  Average: "text-amber-600",
  Critical: "text-red-600",
}

export const statusBgColors: Record<SectionStatus, string> = {
  Strong: "bg-emerald-500/10",
  Average: "bg-amber-500/10",
  Critical: "bg-red-500/10",
}

export const statusBorderColors: Record<SectionStatus, string> = {
  Strong: "border-emerald-200",
  Average: "border-amber-200",
  Critical: "border-red-200",
}

export const statusDotColors: Record<SectionStatus, string> = {
  Strong: "bg-emerald-500",
  Average: "bg-amber-500",
  Critical: "bg-red-500",
}

export const statusRingColors: Record<SectionStatus, string> = {
  Strong: "#059669",
  Average: "#f59e0b",
  Critical: "#ef4444",
}

export function getStatusColor(status: SectionStatus): string {
  return statusTextColors[status] ?? "text-muted-foreground"
}

export function getStatusBgColor(status: SectionStatus): string {
  return statusBgColors[status] ?? "bg-muted"
}

export function getStatusBadgeClasses(status: SectionStatus): string {
  return `${statusTextColors[status]} ${statusBgColors[status]} border ${statusBorderColors[status]}`
}
