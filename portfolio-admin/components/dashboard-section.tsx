import { BarChart3, FolderOpen, Camera, Star, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function DashboardSection() {
  const stats = [
    {
      title: "Total Projects",
      value: "12",
      change: "+2 this month",
      icon: FolderOpen,
      color: "text-blue-600",
    },
    {
      title: "Active Images",
      value: "8",
      change: "+1 this week",
      icon: Camera,
      color: "text-green-600",
    },
    {
      title: "Skills Listed",
      value: "24",
      change: "+3 recently",
      icon: Star,
      color: "text-yellow-600",
    },
    {
      title: "Portfolio Views",
      value: "1,234",
      change: "+15% this month",
      icon: Eye,
      color: "text-purple-600",
    },
  ]

  const recentActivity = [
    {
      action: "Updated project",
      item: "E-commerce Platform",
      time: "2 hours ago",
      type: "project",
    },
    {
      action: "Uploaded image",
      item: "New profile photo",
      time: "1 day ago",
      type: "image",
    },
    {
      action: "Added skill",
      item: "TypeScript",
      time: "3 days ago",
      type: "skill",
    },
    {
      action: "Published project",
      item: "Task Management App",
      time: "1 week ago",
      type: "project",
    },
  ]

  const projectStatus = [
    { name: "Completed", count: 8, percentage: 67 },
    { name: "In Progress", count: 3, percentage: 25 },
    { name: "On Hold", count: 1, percentage: 8 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your portfolio content and recent activity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Project Status */}
        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Current status of all your projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {projectStatus.map((status) => (
              <div key={status.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{status.name}</span>
                  <span className="text-muted-foreground">{status.count} projects</span>
                </div>
                <Progress value={status.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest portfolio updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="shrink-0">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">
                      {activity.action} <span className="text-muted-foreground">{activity.item}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to manage your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="flex items-center space-x-4 p-4">
                <FolderOpen className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="font-medium">Add New Project</h3>
                  <p className="text-sm text-muted-foreground">Showcase your latest work</p>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="flex items-center space-x-4 p-4">
                <Camera className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-medium">Upload Images</h3>
                  <p className="text-sm text-muted-foreground">Update your visual content</p>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="flex items-center space-x-4 p-4">
                <BarChart3 className="h-8 w-8 text-purple-600" />
                <div>
                  <h3 className="font-medium">View Analytics</h3>
                  <p className="text-sm text-muted-foreground">Check your portfolio performance</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
