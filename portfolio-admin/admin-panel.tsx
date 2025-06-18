"use client"

import { useState } from "react"
import { AppSidebar } from "./components/app-sidebar"
import { DashboardSection } from "./components/dashboard-section"
import { ProjectsSection } from "./components/projects-section"
import { ImagesSection } from "./components/images-section"
import { SkillsSection } from "./components/skills-section"
import { ExperienceSection } from "./components/experience-section"
import { ContactSection } from "./components/contact-section"
import { AnalyticsSection } from "./components/analytics-section"
import { SettingsSection } from "./components/settings-section"
import { ToolsSection } from "./components/tools-section"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeProvider } from "./components/theme-provider"

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection />
      case "projects":
        return <ProjectsSection />
      case "images":
        return <ImagesSection />
      case "skills":
        return <SkillsSection />
      case "experience":
        return <ExperienceSection />
      case "contact":
        return <ContactSection />
      case "analytics":
        return <AnalyticsSection />
      case "settings":
        return <SettingsSection />
      case "tools":
        return <ToolsSection />
      default:
        return <DashboardSection />
    }
  }

  const getSectionTitle = () => {
    switch (activeSection) {
      case "dashboard":
        return "Dashboard"
      case "projects":
        return "Projects"
      case "images":
        return "Personal Images"
      case "skills":
        return "Skills"
      case "experience":
        return "Experience"
      case "contact":
        return "Contact Information"
      case "analytics":
        return "Analytics"
      case "settings":
        return "General Settings"
      case "tools":
        return "Tools & Integrations"
      default:
        return "Dashboard"
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#" onClick={() => setActiveSection("dashboard")} className="cursor-pointer">
                      Portfolio Admin
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{getSectionTitle()}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6">{renderContent()}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}
