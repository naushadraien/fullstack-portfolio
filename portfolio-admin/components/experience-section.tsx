"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Building, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample experience data
const sampleExperience = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    startDate: "2022-01",
    endDate: null,
    current: true,
    description:
      "Lead frontend development for multiple client projects using React, TypeScript, and Next.js. Mentored junior developers and established coding standards.",
    achievements: [
      "Improved application performance by 40%",
      "Led a team of 4 developers",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
    ],
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Remote",
    type: "Full-time",
    startDate: "2020-06",
    endDate: "2021-12",
    current: false,
    description:
      "Developed and maintained web applications using MERN stack. Collaborated with design team to implement responsive user interfaces.",
    achievements: [
      "Built 3 major features from scratch",
      "Reduced API response time by 30%",
      "Implemented automated testing suite",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express.js"],
  },
  {
    id: 3,
    title: "Junior Web Developer",
    company: "Digital Agency Co.",
    location: "New York, NY",
    type: "Full-time",
    startDate: "2019-03",
    endDate: "2020-05",
    current: false,
    description:
      "Developed responsive websites and web applications for various clients. Worked closely with designers to implement pixel-perfect designs.",
    achievements: [
      "Delivered 15+ client projects on time",
      "Improved website loading speed by 25%",
      "Learned and implemented modern web technologies",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "WordPress"],
  },
]

export function ExperienceSection() {
  const [experiences, setExperiences] = useState(sampleExperience)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<any>(null)

  const handleAddExperience = () => {
    setEditingExperience(null)
    setIsDialogOpen(true)
  }

  const handleEditExperience = (experience: any) => {
    setEditingExperience(experience)
    setIsDialogOpen(true)
  }

  const handleDeleteExperience = (id: number) => {
    setExperiences(experiences.filter((exp) => exp.id !== id))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" })
  }

  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12

    if (years === 0) return `${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`
    if (remainingMonths === 0) return `${years} year${years !== 1 ? "s" : ""}`
    return `${years} year${years !== 1 ? "s" : ""} ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
          <p className="text-muted-foreground">Manage your work experience and career timeline.</p>
        </div>
        <Button onClick={handleAddExperience}>
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-6">
        {experiences
          .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
          .map((experience, index) => (
            <Card key={experience.id} className="relative">
              {index < experiences.length - 1 && <div className="absolute left-6 top-16 bottom-0 w-px bg-border" />}
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <CardTitle className="text-xl">{experience.title}</CardTitle>
                      {experience.current && <Badge variant="default">Current</Badge>}
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        <span>{experience.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{experience.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {formatDate(experience.startDate)} -{" "}
                          {experience.current ? "Present" : formatDate(experience.endDate!)}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {calculateDuration(experience.startDate, experience.endDate)} • {experience.type}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleEditExperience(experience)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDeleteExperience(experience.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base">{experience.description}</CardDescription>

                {experience.achievements.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Key Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {experience.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingExperience ? "Edit Experience" : "Add New Experience"}</DialogTitle>
            <DialogDescription>Add or update your work experience.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" placeholder="e.g., Senior Frontend Developer" defaultValue={editingExperience?.title} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="e.g., Tech Solutions Inc." defaultValue={editingExperience?.company} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., San Francisco, CA" defaultValue={editingExperience?.location} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Employment Type</Label>
                <Select defaultValue={editingExperience?.type || "Full-time"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="month" defaultValue={editingExperience?.startDate} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="month"
                  defaultValue={editingExperience?.endDate}
                  disabled={editingExperience?.current}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="current" defaultChecked={editingExperience?.current} className="rounded" />
              <Label htmlFor="current">I currently work here</Label>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your role and responsibilities"
                defaultValue={editingExperience?.description}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="achievements">Key Achievements (one per line)</Label>
              <Textarea
                id="achievements"
                placeholder="• Improved application performance by 40%&#10;• Led a team of 4 developers"
                defaultValue={editingExperience?.achievements?.join("\n")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="technologies">Technologies Used (comma-separated)</Label>
              <Input
                id="technologies"
                placeholder="React, TypeScript, Node.js"
                defaultValue={editingExperience?.technologies?.join(", ")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>
              {editingExperience ? "Update Experience" : "Add Experience"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
