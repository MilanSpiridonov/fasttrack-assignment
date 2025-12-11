import { Skeleton } from "@/components/ui/skeleton"

export default function InsightLoading() {
  return (
    <div className="space-y-8">
      {/* Back button skeleton */}
      <Skeleton className="h-9 w-48" />

      {/* Header Skeleton */}
      <div className="flex items-start gap-4">
        <Skeleton className="size-14 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
      </div>

      {/* Metrics Skeleton */}
      <div className="grid gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>

      {/* Details Skeleton */}
      <Skeleton className="h-32 rounded-xl" />

      {/* Charts Skeleton */}
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-[300px] rounded-xl" />
        <Skeleton className="h-[300px] rounded-xl" />
      </div>
    </div>
  )
}
