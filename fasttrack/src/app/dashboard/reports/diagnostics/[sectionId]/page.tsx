import { redirect } from "next/navigation"

export default async function LegacySectionRedirect({
  params,
}: {
  params: Promise<{ sectionId: string }>
}) {
  const { sectionId } = await params
  redirect(`/dashboard/overviews/${sectionId}`)
}
