"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

// Sample skills data
const sampleSkills = [
  {
    id: 1,
    name: "React",
    category: "Frontend",
    proficiency: 90,
    yearsOfExperience: 4,
    isFeatured: true,
  },
  {
    id: 2,
    name: "Node.js",
    category: "Backend",
    proficiency: 85,
    yearsOfExperience: 3,
    isFeatured: true,
  },
  {
    id: 3,
    name: "TypeScript",
    category: "Language",
    proficiency: 88,
    yearsOfExperience: 3,
    isFeatured: true,
  },
  {
    id: 4,
    name: "Python",
    category: "Language",
    proficiency: 75,
    yearsOfExperience: 2,
    isFeatured: false,
  },
  {
    id: 5,
    name: "AWS",
    category: "Cloud",
    proficiency: 70,
    yearsOfExperience: 2,
    isFeatured: false,
  },
  {
    id: 6,
    name: "Docker",
    category: "DevOps",
    proficiency: 80,
    yearsOfExperience: 2,
    isFeatured: false,
  },
]

export function SkillsSection() {
  const [skills, setSkills] = useState(sampleSkills)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<any>(null)
  const [proficiency, setProficiency] = useState([75])

  const handleAddSkill = () => {
    setEditingSkill(null)
    setProficiency([75])
    setIsDialogOpen(true)
  }

  const handleEditSkill = (skill: any) => {
    setEditingSkill(skill)
    setProficiency([skill.proficiency])
    setIsDialogOpen(true)
  }

  const handleDeleteSkill = (id: number) => {
    setSkills(skills.filter((skill) => skill.id !== id))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Frontend":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Backend":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Language":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Cloud":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "DevOps":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getProficiencyLevel = (proficiency: number) => {
    if (proficiency >= 90) return "Expert"
    if (proficiency >= 75) return "Advanced"
    if (proficiency >= 60) return "Intermediate"
    return "Beginner"
  }

  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, typeof skills>,
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
          <p className="text-muted-foreground">Manage your technical skills and proficiency levels.</p>
        </div>
        <Button onClick={handleAddSkill}>
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {Object.entries(groupedSkills).map(([category, categorySkills]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-xl font-semibold">{category}</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categorySkills.map((skill) => (
              <Card key={skill.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{skill.name}</CardTitle>
                      <CardDescription>{skill.yearsOfExperience} years experience</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {skill.isFeatured && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                      <Badge className={getCategoryColor(skill.category)}>{skill.category}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Proficiency</span>
                      <span className="font-medium">{getProficiencyLevel(skill.proficiency)}</span>
                    </div>
                    <Progress value={skill.proficiency} className="h-2" />
                    <div className="text-right text-xs text-muted-foreground">{skill.proficiency}%</div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleEditSkill(skill)}>
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteSkill(skill.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSkill ? "Edit Skill" : "Add New Skill"}</DialogTitle>
            <DialogDescription>Add or update a skill in your portfolio.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Skill Name</Label>
              <Input id="name" placeholder="e.g., React, Python, AWS" defaultValue={editingSkill?.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue={editingSkill?.category || "Frontend"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Language">Language</SelectItem>
                  <SelectItem value="Cloud">Cloud</SelectItem>
                  <SelectItem value="DevOps">DevOps</SelectItem>
                  <SelectItem value="Database">Database</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                placeholder="e.g., 3"
                defaultValue={editingSkill?.yearsOfExperience}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="proficiency">Proficiency Level: {proficiency[0]}%</Label>
              <Slider
                value={proficiency}
                onValueChange={setProficiency}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground">{getProficiencyLevel(proficiency[0])} level</div>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="featured" defaultChecked={editingSkill?.isFeatured} className="rounded" />
              <Label htmlFor="featured">Featured skill (show prominently)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>{editingSkill ? "Update Skill" : "Add Skill"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
