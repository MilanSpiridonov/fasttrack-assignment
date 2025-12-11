import Link from "next/link"
import { notFound } from "next/navigation"
import {
    ArrowRight,
    Gauge,
    Lightbulb,
    Sparkles,
    Stethoscope,
    TrendingDown,
    TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { getSectionData } from "@/lib/api"
import { getStatusBadgeClasses, statusDotColors, statusRingColors } from "@/lib/status-utils"
import type { SectionStatus } from "@/lib/types"
import { convertUnitsToDisplayName } from "@/lib/utils"

export default async function SectionOverviewPage({
    params,
}: {
    params: Promise<{ sectionId: string }>
}) {
    const { sectionId } = await params
    const section = await getSectionData(sectionId)

    if (!section) {
        notFound()
    }

    const mainScore = section.mainScore ?? 54
    const status: SectionStatus = section.status ?? "Critical"
    const benchmark = section.benchmarkScore ?? 70
    const comparisonDelta = section.comparison?.delta ?? -15
    const comparisonLabel = section.comparison?.label ?? "vs benchmark"
    const comparisonUnit = convertUnitsToDisplayName(section.comparison?.unit ?? "")
    const comparisonPositive = section.comparison?.isPositive ?? comparisonDelta >= 0

    const trend = section.trend ?? [48, 52, 50, 54, 53]
    const trendMax = Math.max(...trend, 1)

    const gaugeStyle = {
        background: `conic-gradient(${statusRingColors[status]} ${mainScore * 3.6}deg, rgba(0,0,0,0.06) 0deg)`,
    }

    return (
        <div className="space-y-8">
            {/* Hero / Summary */}
            <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-white to-muted/60 p-6 shadow-sm">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                            <span className="flex size-2 rounded-full bg-primary" />
                            Section Overview
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                                <Stethoscope className="size-6 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">{section.sectionTitle}</h1>
                                <p className="text-sm text-muted-foreground">
                                    {section.description}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                                <Sparkles className="size-4" />
                                Last analysis: {section.stats?.lastAnalysis ?? "—"}
                            </span>
                            <span className="flex items-center gap-2">
                                <Gauge className="size-4" />
                                Benchmark: {benchmark}{comparisonUnit}
                            </span>
                        </div>
                    </div>

                    {/* Main Score Block */}
                    <div className="flex flex-col items-center gap-4 rounded-2xl border bg-card px-6 py-5 shadow-sm">
                        <div className="relative flex items-center justify-center">
                            <div
                                className="relative flex size-28 items-center justify-center rounded-full bg-muted"
                                style={gaugeStyle}
                            >
                                <div className="flex size-20 items-center justify-center rounded-full bg-card shadow-inner">
                                    <div className="text-center">
                                        <p className="text-xs text-muted-foreground">Score</p>
                                        <p className="text-3xl font-bold">{mainScore}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClasses(status)}`}>
                            <span className={`size-2 rounded-full ${statusDotColors[status]}`} />
                            {status}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            {comparisonPositive ? (
                                <TrendingUp className="size-4 text-emerald-500" />
                            ) : (
                                <TrendingDown className="size-4 text-red-500" />
                            )}
                            <span className={comparisonPositive ? "text-emerald-600" : "text-red-600"}>
                                {comparisonPositive ? "+" : ""}
                                {comparisonDelta}
                                {comparisonUnit}
                            </span>
                            <span className="text-muted-foreground">{comparisonLabel}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key metrics */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border bg-card p-4 shadow-sm">
                    <p className="text-sm text-muted-foreground">Available Insights</p>
                    <p className="text-2xl font-bold">{section.insights.length}</p>
                    <p className="text-xs text-muted-foreground mt-1">Deep dives ready to explore</p>
                </div>
                <div className="rounded-xl border bg-card p-4 shadow-sm">
                    <p className="text-sm text-muted-foreground">Benchmark</p>
                    <p className="text-2xl font-bold">{benchmark}{comparisonUnit}</p>
                    <p className="text-xs text-muted-foreground mt-1">Industry reference</p>
                </div>
                <div className="rounded-xl border bg-card p-4 shadow-sm">
                    <p className="text-sm text-muted-foreground">Trend (last 5)</p>
                    <div className="mt-2 flex h-14 items-end gap-1">
                        {trend.map((value, idx) => (
                            <div
                                key={idx}
                                className={`flex-1 ${idx === 0
                                        ? "bg-primary/40"
                                        : value > trend[idx - 1]
                                            ? "bg-emerald-500/60"
                                            : trend[idx - 1] - value < 5
                                                ? "bg-amber-500/60"
                                                : "bg-red-500/60"
                                    }`}
                                style={{ height: `${Math.max((value / trendMax) * 100, 24)}%` }}
                            >
                                <div className="flex h-full items-center justify-center text-[14px] text-primary-foreground/80 font-semibold">
                                    {value}
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Momentum snapshot</p>
                </div>
            </div>

            {/* Insights Grid */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Deep Dive Insights</h2>
                    {section.insights.length > 0 && (
                        <Button variant="ghost" asChild size="sm">
                            <Link href={`/dashboard/overviews/${sectionId}/insights/${section.insights[0].id}`}>
                                View first insight
                                <ArrowRight className="ml-2 size-4" />
                            </Link>
                        </Button>
                    )}
                </div>

                {section.insights.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {section.insights.map((insight) => (
                            <Link
                                key={insight.id}
                                href={`/dashboard/overviews/${sectionId}/insights/${insight.id}`}
                                className="group flex flex-col rounded-xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500/10">
                                        <Lightbulb className="size-4 text-amber-500" />
                                    </div>
                                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                                        {insight.title}
                                    </h3>
                                </div>
                                <p className="text-sm text-muted-foreground flex-1">
                                    {insight.description}
                                </p>
                                <div className="mt-4 flex items-center text-sm text-primary">
                                    <span>View insight</span>
                                    <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border bg-muted/30 p-8 text-center">
                        <p className="text-muted-foreground">No insights available yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
