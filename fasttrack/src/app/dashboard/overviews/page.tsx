import Link from "next/link"
import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react"

import { getSections } from "@/lib/api"
import { getStatusColor, getStatusBgColor, statusDotColors } from "@/lib/status-utils"
import type { SectionOverview, Status } from "@/lib/types/diagnostics"

function ScoreGauge({ score, status }: { score: number; status: Status }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative size-16">
        <svg className="size-16 -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-muted stroke-current"
            strokeWidth="3"
            fill="none"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={`${getStatusColor(status)} stroke-current`}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${score}, 100`}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-sm font-bold ${getStatusColor(status)}`}>{score}</span>
        </div>
      </div>
    </div>
  )
}

function SectionCard({ section }: { section: SectionOverview }) {
  const comparisonPositive = section.comparison.value >= 0

  return (
    <Link
      href={`/dashboard/overviews/${section.sectionId}`}
      className="group block rounded-xl border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getStatusBgColor(section.status)} ${getStatusColor(section.status)}`}>
              {section.status}
            </span>
          </div>
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors truncate">
            {section.sectionTitle}
          </h3>
          
          {/* Comparison */}
          <div className="flex items-center gap-2 mt-2 text-sm">
            {comparisonPositive ? (
              <TrendingUp className="size-4 text-green-500" />
            ) : (
              <TrendingDown className="size-4 text-red-500" />
            )}
            <span className={comparisonPositive ? "text-green-600" : "text-red-500"}>
              {comparisonPositive ? "+" : ""}{section.comparison.value} pp
            </span>
            <span className="text-muted-foreground">{section.comparison.label}</span>
          </div>

          {/* Benchmark */}
          <p className="text-sm text-muted-foreground mt-1">
            Benchmark: {section.benchmarkScore}
          </p>
        </div>

        {/* Score Gauge */}
        <div className="flex flex-col items-center">
          <ScoreGauge score={section.mainScore} status={section.status} />
          <span className="text-xs text-muted-foreground mt-1">Score</span>
        </div>
      </div>

      {/* Insights Summary */}
      {section.insights.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            {section.insights.length} Insights
          </p>
          <div className="flex flex-wrap gap-2">
            {section.insights.slice(0, 4).map((insight) => (
              <span
                key={insight.id}
                className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs ${getStatusBgColor(insight.status)}`}
              >
                <span className={`size-1.5 rounded-full ${statusDotColors[insight.status]}`} />
                {insight.title}
              </span>
            ))}
            {section.insights.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{section.insights.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Arrow indicator */}
      <div className="flex items-center justify-end mt-4 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        <span>View details</span>
        <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}

export default async function OverviewsPage() {
  const sections = await getSections()
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Section Overviews</h1>
        <p className="text-muted-foreground">
          View all diagnostic sections and their current status at a glance.
        </p>
      </div>

      {sections.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((section) => (
            <SectionCard key={section.sectionId} section={section} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border bg-muted/30 p-8 text-center">
          <h3 className="font-semibold mb-2">No sections available</h3>
          <p className="text-muted-foreground text-sm">
            Section overviews will appear here once data is available from the backend.
          </p>
        </div>
      )}
    </div>
  )
}
