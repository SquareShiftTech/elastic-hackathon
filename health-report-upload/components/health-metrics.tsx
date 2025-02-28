import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartPulse, Activity, Scale } from "lucide-react"

export function HealthMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <HeartPulse className="w-8 h-8 text-red-500" />
            <div>
              <p className="text-sm font-medium">Heart Rate</p>
              <p className="text-2xl font-bold">72 bpm</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Activity className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm font-medium">Daily Steps</p>
              <p className="text-2xl font-bold">8,423</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Scale className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Weight</p>
              <p className="text-2xl font-bold">68 kg</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

