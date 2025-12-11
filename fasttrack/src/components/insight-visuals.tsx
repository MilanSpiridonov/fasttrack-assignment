import type { MainVisual, MiniVisual, MiniSeriesPoint } from "@/lib/types"

function extractData(visual?: MiniVisual | MainVisual): MiniSeriesPoint[] {
    if (!visual) return []

    if ("series" in visual && visual.series && visual.series.length > 0) {
        return visual.series
    }

    const points = visual.points ?? []
    const labels = "xLabels" in visual && visual.xLabels ? visual.xLabels : []

    return points.map((value, idx) => ({
        label: labels[idx] ?? `P${idx + 1}`,
        value,
    }))
}

function SparklineChart({
    data,
    compact = false,
}: {
    data: MiniSeriesPoint[]
    compact?: boolean
}) {
    const width = 320
    const height = compact ? 120 : 160
    const padding = 12

    const values = data.map((d) => d.value)
    const min = Math.min(...values)
    const max = Math.max(...values)
    const range = max - min || 1
    const step = data.length > 1 ? (width - padding * 2) / (data.length - 1) : 0

    const points = data.map((point, idx) => {
        const x = padding + idx * step
        const y = height - padding - ((point.value - min) / range) * (height - padding * 2)
        return { x, y }
    })

    const pathD = points
        .map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
        .join(" ")

    return (
        <div className="space-y-3">
            <svg
                viewBox={`0 0 ${width} ${height}`}
                className="h-36 w-full text-primary"
                role="presentation"
                aria-hidden
            >
                <defs>
                    <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
                    </linearGradient>
                </defs>
                <path
                    d={`${pathD}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {points.length > 1 && (
                    <path
                        d={`M ${points[0].x} ${height - padding} ${pathD.replace("M", "L")} L ${points[points.length - 1].x
                            } ${height - padding}`}
                        fill="url(#sparklineGradient)"
                        stroke="none"
                        opacity={0.7}
                    />
                )}
                {points.map((p, idx) => (
                    <circle key={idx} cx={p.x} cy={p.y} r={3} fill="currentColor" />
                ))}
            </svg>
            <div className="flex gap-2 overflow-x-auto text-xs text-muted-foreground">
                {data.map((point) => (
                    <div key={point.label} className="flex flex-col items-center gap-1 min-w-[48px]">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-semibold">
                            {point.value}
                        </span>
                        <span>{point.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function BarChart({
    data,
    compact = false,
}: {
    data: MiniSeriesPoint[]
    compact?: boolean
}) {
    const max = Math.max(...data.map((d) => d.value), 1)

    return (
        <div className="space-y-3">
            <div className="flex h-36 items-end gap-2">
                {data.map((point, idx) => {
                    const heightPct = Math.max((point.value / max) * 100, 4)
                    return (
                        <div key={idx} className="flex-1 h-full flex flex-col justify-end">
                            <div
                                className="rounded-t-md bg-gradient-to-t from-primary/60 to-primary relative flex items-end justify-center"
                                style={{ height: `${heightPct}%` }}
                            >
                                <span className="absolute -top-5 text-xs font-semibold text-muted-foreground">
                                    {point.value}
                                </span>
                            </div>
                            <p className="mt-1 text-center text-xs text-muted-foreground">{point.label}</p>
                        </div>
                    )
                })}
            </div>
            {!compact && (
                <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>0</span>
                    <span>{max}</span>
                </div>
            )}
        </div>
    )
}

function ChartRenderer({
    visual,
    compact = false,
}: {
    visual?: MiniVisual | MainVisual
    compact?: boolean
}) {
    const kind = visual?.type?.toLowerCase?.() === "sparkline" ? "sparkline" : "bar"
    const data = extractData(visual)
    if (!data.length) {
        return <p className="text-sm text-muted-foreground">No data available.</p>
    }

    if (kind === "sparkline") {
        return <SparklineChart data={data} compact={compact} />
    }

    return <BarChart data={data} compact={compact} />
}

export function VisualCard({
    title,
    subtitle,
    visual,
    description,
    compact = false,
}: {
    title: string
    subtitle?: string
    visual?: MiniVisual | MainVisual
    description?: string
    compact?: boolean
}) {
    const kind = visual?.type ? visual.type.toUpperCase() : "—"

    return (
        <div className={`rounded-xl border bg-card ${compact ? "p-4" : "p-6"} shadow-sm`}>
            <div className="flex items-start justify-between gap-3">
                <div>
                    {subtitle && <p className="text-xs text-muted-foreground mb-1">{subtitle}</p>}
                    <h3 className="font-semibold">{title}</h3>
                </div>
                <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    {kind}
                </span>
            </div>

            <div className="mt-4">
                {visual ? <ChartRenderer visual={visual} compact={compact} /> : (
                    <p className="text-sm text-muted-foreground">No visual provided.</p>
                )}
                {description && (
                    <p className="mt-3 text-xs text-muted-foreground">{description}</p>
                )}
            </div>
        </div>
    )
}
