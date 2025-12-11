// ============================================
// Diagnostics Types
// ============================================

import type { Status } from "./types/diagnostics"

// Re-export Status as SectionStatus for backwards compatibility
export type SectionStatus = Status

export type SectionInsight = {
  id: string
  title: string
  description: string
}

export type SectionData = {
  id: string
  sectionTitle: string
  description: string
  insights: SectionInsight[]
  mainScore?: number
  status?: SectionStatus
  benchmarkScore?: number
  comparison?: {
    label: string
    delta: number
    unit?: string
    isPositive?: boolean
  }
  trend: number[]
  stats?: {
    lastAnalysis?: string
    healthScore?: string
    healthScoreColor?: string
  }
}

// ============================================
// Insight Types
// ============================================

export type MiniVisualType = "bar" | "sparkline"

export type MiniSeriesPoint = {
  label: string
  value: number
}

export type MiniVisual = {
  type: MiniVisualType
  series?: MiniSeriesPoint[]
  points?: number[]
  xLabels?: string[]
}

export type MainVisual = {
  type: "bar" | "sparkline"
  points: number[]
  xLabels: string[]
}

export type InsightBlock = {
  id: string
  title: string
  text: string
  miniVisual: MiniVisual
}

export type InsightMeta = {
  status: SectionStatus
  sectionScore: number
  benchmarkScore: number
  gap: number
}

export type InsightMetric = {
  label: string
  value: string
  subtext?: string
  icon?: "chart" | "trend"
  color?: string
}

export type InsightRecommendation = {
  id: number
  text: string
}

export type InsightData = {
  id: string
  sectionId: string
  sectionTitle: string
  title: string
  description: string
  details: string
  blocks?: InsightBlock[]
  mainVisual?: MainVisual
  meta?: InsightMeta
  metrics?: InsightMetric[]
  recommendations?: InsightRecommendation[]
}

// ============================================
// Dashboard Types
// ============================================

export type DashboardStats = {
  totalSections: number
  totalInsights: number
  reportsGenerated: number
  lastUpdated: string
}

export type RecentActivity = {
  id: string
  text: string
  timestamp: string
  color: string
}

export type QuickAccessSection = {
  id: string
  title: string
  url: string
}

export type DashboardData = {
  stats: DashboardStats | null
  recentActivity: RecentActivity[]
  quickAccessSections: QuickAccessSection[]
}
