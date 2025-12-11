export type Status = "Critical" | "Average" | "Strong"

export interface ComparisonMetric {
  label: string
  value: number
  unit: "percentagePoints"
}

export interface VisualScoreElement {
  type: "gauge" | "segmentedBar"
  min: number
  max: number
  thresholds: {
    label: Status
    max: number
  }[]
}

export interface InsightSummary {
  id: string
  title: string
  score: number
  status: Status
}
export interface SectionOverviewArrayResponse {
  sections: SectionOverview[]
}

export interface SectionOverview {
  sectionId: string
  sectionTitle: string
  mainScore: number
  status: Status
  comparison: ComparisonMetric
  benchmarkScore: number
  visual: VisualScoreElement
  trend?: number[]
  insights: InsightSummary[]
}

export interface OverviewResponse {
  sections: SectionOverview[]
}

export type MiniVisualType = "bar" | "sparkline"

export interface MiniSeriesPoint {
  label: string
  value: number
}

export interface MiniVisual {
  type: MiniVisualType
  series?: MiniSeriesPoint[]
  points?: number[]
  xLabels?: string[]
}

export interface InsightBlock {
  id: string
  title: string
  text: string
  miniVisual: MiniVisual
}

export interface MainVisual {
  type: "bar" | "sparkline"
  points: number[]
  xLabels: string[]
}

export interface InsightMeta {
  status: Status
  sectionScore: number
  benchmarkScore: number
  gap: number
}

export interface InsightDetail {
  id: string
  sectionId: string
  headline: string
  summary: string
  blocks: InsightBlock[]
  mainVisual: MainVisual
  meta: InsightMeta
}

export interface InsightsResponse {
  sectionId: string
  insights: InsightDetail[]
}
