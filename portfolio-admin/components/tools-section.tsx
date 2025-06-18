"use client"

import { useState } from "react"
import { Github, Cloud, Mail, BarChart3, Zap, Settings, Plus, ExternalLink, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample integrations data
const integrations = [
  {
    id: 1,
    name: "GitHub",
    description: "Connect your GitHub account to automatically sync repositories",
    icon: Github,
    category: "Development",
    connected: true,
    status: "active",
    lastSync: "2 hours ago",
    config: {
      username: "johndoe",
      token: "ghp_xxxxxxxxxxxx",
      autoSync: true,
    },
  },
  {
    id: 2,
    name: "Google Analytics",
    description: "Track your portfolio performance and visitor analytics",
    icon: BarChart3,
    category: "Analytics",
    connected: true,
    status: "active",
    lastSync: "1 hour ago",
    config: {
      trackingId: "GA-XXXXXXXXX",
      enhanced: true,
    },
  },
  {
    id: 3,
    name: "Vercel",
    description: "Deploy your portfolio automatically with Vercel",
    icon: Zap,
    category: "Deployment",
    connected: false,
    status: "inactive",
    lastSync: null,
    config: {},
  },
  {
    id: 4,
    name: "Cloudinary",
    description: "Optimize and manage your images with Cloudinary",
    icon: Cloud,
    category: "Media",
    connected: false,
    status: "inactive",
    lastSync: null,
    config: {},
  },
  {
    id: 5,
    name: "EmailJS",
    description: "Handle contact form submissions via email",
    icon: Mail,
    category: "Communication",
    connected: true,
    status: "active",
    lastSync: "30 minutes ago",
    config: {
      serviceId: "service_xxxxxxx",
      templateId: "template_xxxxxxx",
    },
  },
]

export function ToolsSection() {
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("integrations")

  const handleConfigureIntegration = (integration: any) => {
    setSelectedIntegration(integration)
    setIsDialogOpen(true)
  }

  const handleToggleIntegration = (id: number) => {
    // Toggle integration logic here
    console.log("Toggling integration:", id)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Development":
        return Github
      case "Analytics":
        return BarChart3
      case "Deployment":
        return Zap
      case "Media":
        return Cloud
      case "Communication":
        return Mail
      default:
        return Settings
    }
  }

  const groupedIntegrations = integrations.reduce(
    (acc, integration) => {
      if (!acc[integration.category]) {
        acc[integration.category] = []
      }
      acc[integration.category].push(integration)
      return acc
    },
    {} as Record<string, typeof integrations>,
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tools & Integrations</h2>
          <p className="text-muted-foreground">Connect external services to enhance your portfolio functionality.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Integration
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-6">
          {Object.entries(groupedIntegrations).map(([category, categoryIntegrations]) => (
            <div key={category} className="space-y-4">
              <div className="flex items-center gap-2">
                {(() => {
                  const Icon = getCategoryIcon(category)
                  return <Icon className="h-5 w-5 text-muted-foreground" />
                })()}
                <h3 className="text-xl font-semibold">{category}</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {categoryIntegrations.map((integration) => (
                  <Card key={integration.id} className="relative">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            <integration.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{integration.name}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={integration.connected ? "default" : "secondary"} className="text-xs">
                                {integration.connected ? "Connected" : "Not Connected"}
                              </Badge>
                              {integration.connected && (
                                <div className="flex items-center gap-1">
                                  <div className="h-2 w-2 rounded-full bg-green-500" />
                                  <span className="text-xs text-muted-foreground">Active</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={integration.connected}
                          onCheckedChange={() => handleToggleIntegration(integration.id)}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <CardDescription>{integration.description}</CardDescription>
                      {integration.connected && integration.lastSync && (
                        <p className="text-xs text-muted-foreground">Last sync: {integration.lastSync}</p>
                      )}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleConfigureIntegration(integration)}
                          className="flex-1"
                        >
                          <Settings className="mr-2 h-3 w-3" />
                          Configure
                        </Button>
                        {integration.connected && (
                          <Button size="sm" variant="ghost">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys Management</CardTitle>
              <CardDescription>Manage your API keys for various integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">GitHub Personal Access Token</p>
                    <p className="text-sm text-muted-foreground">Used for repository synchronization</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Active</Badge>
                    <Button size="sm" variant="outline">
                      Update
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Google Analytics API Key</p>
                    <p className="text-sm text-muted-foreground">For analytics data retrieval</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Active</Badge>
                    <Button size="sm" variant="outline">
                      Update
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Cloudinary API Key</p>
                    <p className="text-sm text-muted-foreground">For image optimization and management</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Inactive</Badge>
                    <Button size="sm" variant="outline">
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Endpoints</CardTitle>
              <CardDescription>Configure webhooks for real-time updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">GitHub Repository Updates</p>
                    <p className="text-sm text-muted-foreground">https://yoursite.com/api/webhooks/github</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <Badge variant="outline">Active</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Contact Form Submissions</p>
                    <p className="text-sm text-muted-foreground">https://yoursite.com/api/webhooks/contact</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <Badge variant="outline">Active</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Deployment Notifications</p>
                    <p className="text-sm text-muted-foreground">https://yoursite.com/api/webhooks/deploy</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-600" />
                    <Badge variant="secondary">Inactive</Badge>
                  </div>
                </div>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Webhook
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configure {selectedIntegration?.name}</DialogTitle>
            <DialogDescription>Update the settings for this integration.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedIntegration?.name === "GitHub" && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="username">GitHub Username</Label>
                  <Input
                    id="username"
                    defaultValue={selectedIntegration?.config?.username}
                    placeholder="Enter your GitHub username"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="token">Personal Access Token</Label>
                  <Input
                    id="token"
                    type="password"
                    defaultValue={selectedIntegration?.config?.token}
                    placeholder="Enter your GitHub token"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="autoSync" defaultChecked={selectedIntegration?.config?.autoSync} />
                  <Label htmlFor="autoSync">Enable automatic synchronization</Label>
                </div>
              </>
            )}
            {selectedIntegration?.name === "Google Analytics" && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="trackingId">Tracking ID</Label>
                  <Input
                    id="trackingId"
                    defaultValue={selectedIntegration?.config?.trackingId}
                    placeholder="GA-XXXXXXXXX"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="enhanced" defaultChecked={selectedIntegration?.config?.enhanced} />
                  <Label htmlFor="enhanced">Enable enhanced ecommerce tracking</Label>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>Save Configuration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
