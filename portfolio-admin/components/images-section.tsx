"use client"

import { useState } from "react"
import { Upload, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

// Sample image data
const sampleImages = [
  {
    id: 1,
    url: "/placeholder.svg?height=300&width=300",
    alt: "Profile Picture",
    category: "profile",
    title: "Main Profile Photo",
    isActive: true,
  },
  {
    id: 2,
    url: "/placeholder.svg?height=400&width=600",
    alt: "Hero Background",
    category: "hero",
    title: "Hero Section Background",
    isActive: true,
  },
  {
    id: 3,
    url: "/placeholder.svg?height=200&width=200",
    alt: "About Me Photo",
    category: "about",
    title: "About Section Photo",
    isActive: false,
  },
]

export function ImagesSection() {
  const [images, setImages] = useState(sampleImages)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingImage, setEditingImage] = useState<any>(null)

  const handleAddImage = () => {
    setEditingImage(null)
    setIsDialogOpen(true)
  }

  const handleEditImage = (image: any) => {
    setEditingImage(image)
    setIsDialogOpen(true)
  }

  const handleDeleteImage = (id: number) => {
    setImages(images.filter((img) => img.id !== id))
  }

  const handleToggleActive = (id: number) => {
    setImages(images.map((img) => (img.id === id ? { ...img, isActive: !img.isActive } : img)))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "profile":
        return "bg-blue-100 text-blue-800"
      case "hero":
        return "bg-purple-100 text-purple-800"
      case "about":
        return "bg-green-100 text-green-800"
      case "gallery":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Personal Images</h2>
          <p className="text-muted-foreground">Manage your profile pictures, hero images, and other visual content.</p>
        </div>
        <Button onClick={handleAddImage}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Image
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <img src={image.url || "/placeholder.svg"} alt={image.alt} className="object-cover w-full h-full" />
              <div className="absolute top-2 left-2 flex gap-2">
                <Badge className={getCategoryColor(image.category)}>{image.category}</Badge>
                {image.isActive && <Badge variant="default">Active</Badge>}
              </div>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-1">{image.title}</CardTitle>
              <CardDescription className="line-clamp-1">{image.alt}</CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-between">
              <Button
                size="sm"
                variant={image.isActive ? "outline" : "default"}
                onClick={() => handleToggleActive(image.id)}
              >
                {image.isActive ? "Deactivate" : "Activate"}
              </Button>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => handleEditImage(image)}>
                  <Edit className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleDeleteImage(image.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingImage ? "Edit Image" : "Upload New Image"}</DialogTitle>
            <DialogDescription>Add or update an image for your portfolio.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Image Title</Label>
              <Input id="title" placeholder="Enter image title" defaultValue={editingImage?.title} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="alt">Alt Text</Label>
              <Input id="alt" placeholder="Describe the image" defaultValue={editingImage?.alt} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue={editingImage?.category || "profile"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="profile">Profile</SelectItem>
                  <SelectItem value="hero">Hero</SelectItem>
                  <SelectItem value="about">About</SelectItem>
                  <SelectItem value="gallery">Gallery</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">Image URL</Label>
              <Input id="url" placeholder="https://example.com/image.jpg" defaultValue={editingImage?.url} />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="isActive" defaultChecked={editingImage?.isActive} className="rounded" />
              <Label htmlFor="isActive">Set as active image</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>{editingImage ? "Update Image" : "Upload Image"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
