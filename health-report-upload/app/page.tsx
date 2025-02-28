import { HealthReportUpload } from "@/components/health-report-upload"
import { SiteHeader } from "@/components/site-header"

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-vibrant-blue via-vibrant-purple to-vibrant-pink flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-white drop-shadow-lg">Health Report Upload</h1>
        <div className="max-w-md mx-auto bg-white bg-opacity-90 rounded-lg shadow-xl p-6">
          <HealthReportUpload />
        </div>
      </main>
    </div>
  )
}

