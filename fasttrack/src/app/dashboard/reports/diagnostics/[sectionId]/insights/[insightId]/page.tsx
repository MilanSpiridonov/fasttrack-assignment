import { redirect } from "next/navigation"

export default async function LegacyInsightRedirect({
  params,
}: {
  params: Promise<{ sectionId: string; insightId: string }>
}) {
  const { sectionId, insightId } = await params
  redirect(`/dashboard/overviews/${sectionId}/insights/${insightId}`)
}
