import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export function UpcomingAppointments() {
  const appointments = [
    { date: "2023-06-15", time: "10:00 AM", doctor: "Dr. Smith", type: "Check-up" },
    { date: "2023-06-22", time: "2:30 PM", doctor: "Dr. Johnson", type: "Dental" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Calendar className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-sm font-medium">
                  {appointment.date} at {appointment.time}
                </p>
                <p className="text-xs text-gray-500">
                  {appointment.doctor} - {appointment.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

