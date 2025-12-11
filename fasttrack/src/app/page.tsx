import { redirect } from "next/navigation"

export default function Home() {
  // Redirect root to the dashboard
  redirect("/dashboard/overviews")
}
