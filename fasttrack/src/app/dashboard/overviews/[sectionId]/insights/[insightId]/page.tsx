import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, BarChart2, Lightbulb, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getInsightData, getSectionInsights } from "@/lib/api"
import { VisualCard } from "@/components/insight-visuals"

export default async function InsightPage({
  params,
}: {
  params: Promise<{ sectionId: string; insightId: string }>
}) {
  const { sectionId, insightId } = await params
  const [insightList, insight] = await Promise.all([
    getSectionInsights(sectionId),
    getInsightData(sectionId, insightId),
  ])

  if (!insight) {
    notFound()
  }
  const currentIndex = insightList.findIndex((item) => item.id === insightId)
  const prevInsight = currentIndex > 0 ? insightList[currentIndex - 1] : null
  const nextInsight = currentIndex >= 0 && currentIndex < insightList.length - 1 ? insightList[currentIndex + 1] : null

  return (

    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" size="sm" asChild className="-ml-2">
          <Link href={`/dashboard/overviews/${sectionId}`}>
            <ArrowLeft className="mr-2 size-4" />
            Back to {insight.sectionTitle}
          </Link>
        </Button>
      </div>

      {/* Insight Header */}
      <div className="flex items-start gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
          <Lightbulb className="size-7 text-amber-500" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">{insight.sectionTitle}</p>
          <h1 className="text-2xl font-bold tracking-tight">{insight.title}</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">
            {insight.description}
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      {insight.metrics && insight.metrics.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-3">
          {insight.metrics.map((metric, index) => (
            <div key={index} className="rounded-xl border bg-card p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                {metric.icon === "chart" && <BarChart2 className="size-4" />}
                {metric.icon === "trend" && <TrendingUp className="size-4" />}
                <p className="text-sm">{metric.label}</p>
              </div>
              <p className={`text-3xl font-bold ${metric.color ?? ""}`}>{metric.value}</p>
              {metric.subtext && (
                <p className="text-xs text-muted-foreground mt-1">{metric.subtext}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-card p-4">
            <p className="text-sm text-muted-foreground">Section Score</p>
            <p className="text-3xl font-bold">—</p>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <p className="text-sm text-muted-foreground">Benchmark</p>
            <p className="text-3xl font-bold">—</p>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <p className="text-sm text-muted-foreground">Gap vs Benchmark</p>
            <p className="text-3xl font-bold">—</p>
          </div>
        </div>
      )}

      {/* Insight Details */}
      <div className="rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold mb-3">About this Insight</h2>
        <p className="text-muted-foreground leading-relaxed">
          {insight.details}
        </p>
      </div>

      {/* Blocks with mini visuals */}
      {insight.blocks && insight.blocks.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Signals from the data</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {insight.blocks.map((block) => (
              <div key={block.id} className="rounded-xl border bg-card p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{block.title}</h3>
                  </div>
                  <span className="text-[11px] text-muted-foreground">{block.miniVisual.type}</span>
                </div>
                <p className="text-sm text-muted-foreground">{block.text}</p>
                <VisualCard
                  visual={block.miniVisual}
                  title="Mini visual"
                  compact
                  description="Key datapoints extracted from this signal"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts powered by visual engine */}
      <div className="grid gap-4 md:grid-cols-2">
        <VisualCard
          title="Primary metric (trend)"
          subtitle="Main visual"
          visual={insight.mainVisual}
          description="Time-series view of the primary metric for this insight"
        />
        <VisualCard
          title="Block distribution"
          subtitle="From blocks"
          visual={
            insight.blocks?.find((block) => block.miniVisual.type === "bar")?.miniVisual ??
            insight.mainVisual
          }
          description="Category breakdown derived from the supporting block data"
        />
      </div>

      {/* Recommendations */}
      <div className="rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Recommendations</h2>
        {insight.recommendations && insight.recommendations.length > 0 ? (
          <div className="space-y-3">
            {insight.recommendations.map((rec) => (
              <div key={rec.id} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                <div className="size-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 font-semibold text-sm shrink-0">
                  {rec.id}
                </div>
                <p className="text-sm">{rec.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            No recommendations available yet.
          </p>
        )}
      </div>

      {/* Bottom Prev/Next */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4">
        <Button
          variant="outline"
          size="lg"
          className="h-12 w-full sm:w-44 justify-center p-4"
          disabled={!prevInsight}
          asChild={!!prevInsight}
        >
          {prevInsight ? (
            <Link
              href={`/dashboard/overviews/${sectionId}/insights/${prevInsight.id}`}
              className="inline-flex h-full w-full items-center justify-center"
            >
              Previous
            </Link>
          ) : (
            <span className="inline-flex h-full w-full items-center justify-center text-muted-foreground cursor-not-allowed">
              Previous
            </span>
          )}
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="h-12 w-full sm:w-44 justify-center"
          disabled={!nextInsight}
          asChild={!!nextInsight}
        >
          {nextInsight ? (
            <Link
              href={`/dashboard/overviews/${sectionId}/insights/${nextInsight.id}`}
              className="inline-flex h-full w-full items-center justify-center p-4"
            >
              Next
            </Link>
          ) : (
            <span className="inline-flex h-full w-full items-center justify-center text-muted-foreground cursor-not-allowed p-4">
              Next
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}
