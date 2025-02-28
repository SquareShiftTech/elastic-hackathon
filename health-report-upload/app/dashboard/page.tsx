"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    router.push(
      "https://ss-pet-store.kb.us-central1.gcp.cloud.es.io/app/canvas/workpad/workpad-3fbb4efd-366e-4080-a354-0c85c68a90f0/page/1?__fullScreen=true",
    )
  }, [router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-xl">Redirecting to dashboard...</p>
    </div>
  )
}

