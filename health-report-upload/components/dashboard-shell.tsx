import type { ReactNode } from "react"
import { Activity, FileText, Home, Calendar, Settings, LogOut } from "lucide-react"

const sidebarItems = [
  { icon: Home, label: "Dashboard" },
  { icon: Activity, label: "Health Metrics" },
  { icon: FileText, label: "Reports" },
  { icon: Calendar, label: "Appointments" },
  { icon: Settings, label: "Settings" },
]

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600">HealthTrack</h1>
        </div>
        <nav className="mt-8">
          {sidebarItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <a href="#" className="flex items-center text-gray-700 hover:text-blue-600">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Health Dashboard</h1>
          {children}
        </div>
      </main>
    </div>
  )
}

