"use client"

import { TrendingUp, Users, Eye, Clock, Globe, Smartphone, Monitor, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function AnalyticsSection() {
  const stats = [
    {
      title: "Total Views",
      value: "12,345",
      change: "+15.2%",
      changeType: "increase",
      icon: Eye,
      period: "Last 30 days",
    },
    {
      title: "Unique Visitors",
      value: "8,921",
      change: "+8.7%",
      changeType: "increase",
      icon: Users,
      period: "Last 30 days",
    },
    {
      title: "Avg. Session Duration",
      value: "3m 42s",
      change: "+12.3%",
      changeType: "increase",
      icon: Clock,
      period: "Last 30 days",
    },
    {
      title: "Bounce Rate",
      value: "32.1%",
      change: "-5.4%",
      changeType: "decrease",
      icon: TrendingUp,
      period: "Last 30 days",
    },
  ]

  const topPages = [
    { page: "/", title: "Home", views: 4521, percentage: 36.6 },
    { page: "/projects", title: "Projects", views: 2834, percentage: 23.0 },
    { page: "/about", title: "About", views: 1923, percentage: 15.6 },
    { page: "/contact", title: "Contact", views: 1456, percentage: 11.8 },
    { page: "/blog", title: "Blog", views: 1611, percentage: 13.0 },
  ]

  const deviceStats = [
    { device: "Desktop", percentage: 58.3, icon: Monitor },
    { device: "Mobile", percentage: 35.2, icon: Smartphone },
    { device: "Tablet", percentage: 6.5, icon: Monitor },
  ]

  const topCountries = [
    { country: "United States", visitors: 3245, percentage: 36.4 },
    { country: "United Kingdom", visitors: 1876, percentage: 21.0 },
    { country: "Canada", visitors: 1234, percentage: 13.8 },
    { country: "Germany", visitors: 987, percentage: 11.1 },
    { country: "Australia", visitors: 654, percentage: 7.3 },
    { country: "Others", visitors: 925, percentage: 10.4 },
  ]

  const recentActivity = [
    { action: "Project viewed", page: "E-commerce Platform", time: "2 minutes ago", location: "San Francisco, US" },
    { action: "Contact form submitted", page: "Contact", time: "15 minutes ago", location: "London, UK" },
    { action: "Resume downloaded", page: "About", time: "1 hour ago", location: "Toronto, CA" },
    { action: "Project viewed", page: "Task Management App", time: "2 hours ago", location: "Berlin, DE" },
    { action: "Page visited", page: "Home", time: "3 hours ago", location: "Sydney, AU" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">Track your portfolio performance and visitor insights.</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-2 text-xs">
                <span className={`font-medium ${stat.changeType === "increase" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground">{stat.period}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most visited pages on your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map((page) => (
                <div key={page.page} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">{page.title}</p>
                      <p className="text-muted-foreground">{page.page}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{page.views.toLocaleString()}</p>
                      <p className="text-muted-foreground">{page.percentage}%</p>
                    </div>
                  </div>
                  <Progress value={page.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
            <CardDescription>How visitors access your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceStats.map((device) => (
                <div key={device.device} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <device.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{device.device}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24">
                      <Progress value={device.percentage} className="h-2" />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">{device.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Geographic Data */}
        <Card>
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
            <CardDescription>Where your visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCountries.map((country) => (
                <div key={country.country} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{country.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{country.visitors.toLocaleString()}</span>
                    <Badge variant="outline">{country.percentage}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest visitor interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="shrink-0">
                    <div className="h-2 w-2 rounded-full bg-blue-600 mt-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">
                      {activity.action}: <span className="text-muted-foreground">{activity.page}</span>
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{activity.time}</span>
                      <span>•</span>
                      <span>{activity.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>Key insights about your portfolio performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h4 className="font-medium">Growing Audience</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Your portfolio views have increased by 15.2% this month, with consistent growth in unique visitors.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium">Popular Projects</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Your projects page is the second most visited, indicating strong interest in your work.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <h4 className="font-medium">Engaged Visitors</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Average session duration has increased, showing visitors are spending more time exploring your content.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
