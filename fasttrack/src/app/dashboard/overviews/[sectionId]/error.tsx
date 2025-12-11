"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function SectionError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="size-8 text-destructive" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <p className="text-muted-foreground max-w-md">
          We couldn&apos;t load this section. Please try again or go back to overviews.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" asChild>
          <Link href="/dashboard/overviews">
            <ArrowLeft className="mr-2 size-4" />
            Back to Overviews
          </Link>
        </Button>
        <Button onClick={() => reset()}>
          <RefreshCw className="mr-2 size-4" />
          Try again
        </Button>
      </div>
    </div>
  )
}
