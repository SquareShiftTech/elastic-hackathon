import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"

export function RecentActivities({ className }: { className?: string }) {
  const activities = [
    { date: "2023-06-10", activity: "Completed 10,000 steps" },
    { date: "2023-06-09", activity: "Logged meal: Grilled chicken salad" },
    { date: "2023-06-08", activity: "Completed 30 min yoga session" },
    { date: "2023-06-07", activity: "Recorded blood pressure: 120/80" },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Activity className="w-6 h-6 text-green-500" />
              <div>
                <p className="text-sm font-medium">{item.activity}</p>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

