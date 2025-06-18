"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Instagram, Edit, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

// Sample contact data
const sampleContactInfo = {
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  website: "https://johndoe.dev",
  bio: "Passionate full-stack developer with 5+ years of experience building modern web applications. I love creating efficient, scalable solutions and learning new technologies.",
  availability: "Available for freelance projects",
  socialLinks: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
    instagram: "https://instagram.com/johndoe",
  },
  preferences: {
    showEmail: true,
    showPhone: true,
    showLocation: true,
    showSocial: true,
    allowContact: true,
  },
}

export function ContactSection() {
  const [contactInfo, setContactInfo] = useState(sampleContactInfo)
  const [isEditing, setIsEditing] = useState(false)
  const [editedInfo, setEditedInfo] = useState(contactInfo)

  const handleSave = () => {
    setContactInfo(editedInfo)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedInfo(contactInfo)
    setIsEditing(false)
  }

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    instagram: Instagram,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contact Information</h2>
          <p className="text-muted-foreground">Manage your contact details and social media links.</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Contact Info
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Your primary contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editedInfo.email}
                    onChange={(e) => setEditedInfo({ ...editedInfo, email: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={editedInfo.phone}
                    onChange={(e) => setEditedInfo({ ...editedInfo, phone: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={editedInfo.location}
                    onChange={(e) => setEditedInfo({ ...editedInfo, location: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={editedInfo.website}
                    onChange={(e) => setEditedInfo({ ...editedInfo, website: e.target.value })}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{contactInfo.email}</p>
                    <p className="text-sm text-muted-foreground">Email</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{contactInfo.phone}</p>
                    <p className="text-sm text-muted-foreground">Phone</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{contactInfo.location}</p>
                    <p className="text-sm text-muted-foreground">Location</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{contactInfo.website}</p>
                    <p className="text-sm text-muted-foreground">Website</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Bio and Availability */}
        <Card>
          <CardHeader>
            <CardTitle>Bio & Availability</CardTitle>
            <CardDescription>Your professional summary and current status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    value={editedInfo.bio}
                    onChange={(e) => setEditedInfo({ ...editedInfo, bio: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="availability">Availability Status</Label>
                  <Input
                    id="availability"
                    value={editedInfo.availability}
                    onChange={(e) => setEditedInfo({ ...editedInfo, availability: e.target.value })}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <h4 className="font-medium mb-2">Bio</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{contactInfo.bio}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Availability</h4>
                  <p className="text-sm text-green-600 font-medium">{contactInfo.availability}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Social Media Links */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
            <CardDescription>Your social media profiles and links</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                {Object.entries(editedInfo.socialLinks).map(([platform, url]) => {
                  const Icon = socialIcons[platform as keyof typeof socialIcons]
                  return (
                    <div key={platform} className="grid gap-2">
                      <Label htmlFor={platform} className="capitalize flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {platform}
                      </Label>
                      <Input
                        id={platform}
                        value={url}
                        onChange={(e) =>
                          setEditedInfo({
                            ...editedInfo,
                            socialLinks: { ...editedInfo.socialLinks, [platform]: e.target.value },
                          })
                        }
                      />
                    </div>
                  )
                })}
              </>
            ) : (
              <>
                {Object.entries(contactInfo.socialLinks).map(([platform, url]) => {
                  const Icon = socialIcons[platform as keyof typeof socialIcons]
                  return (
                    <div key={platform} className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium capitalize">{platform}</p>
                        <a
                          href={url}
                          className="text-sm text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {url}
                        </a>
                      </div>
                    </div>
                  )
                })}
              </>
            )}
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>Control what information is visible on your portfolio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Email Address</p>
                <p className="text-sm text-muted-foreground">Display email on your portfolio</p>
              </div>
              <Switch
                checked={isEditing ? editedInfo.preferences.showEmail : contactInfo.preferences.showEmail}
                onCheckedChange={(checked) =>
                  isEditing &&
                  setEditedInfo({
                    ...editedInfo,
                    preferences: { ...editedInfo.preferences, showEmail: checked },
                  })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Phone Number</p>
                <p className="text-sm text-muted-foreground">Display phone number on your portfolio</p>
              </div>
              <Switch
                checked={isEditing ? editedInfo.preferences.showPhone : contactInfo.preferences.showPhone}
                onCheckedChange={(checked) =>
                  isEditing &&
                  setEditedInfo({
                    ...editedInfo,
                    preferences: { ...editedInfo.preferences, showPhone: checked },
                  })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Location</p>
                <p className="text-sm text-muted-foreground">Display location on your portfolio</p>
              </div>
              <Switch
                checked={isEditing ? editedInfo.preferences.showLocation : contactInfo.preferences.showLocation}
                onCheckedChange={(checked) =>
                  isEditing &&
                  setEditedInfo({
                    ...editedInfo,
                    preferences: { ...editedInfo.preferences, showLocation: checked },
                  })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Social Links</p>
                <p className="text-sm text-muted-foreground">Display social media links</p>
              </div>
              <Switch
                checked={isEditing ? editedInfo.preferences.showSocial : contactInfo.preferences.showSocial}
                onCheckedChange={(checked) =>
                  isEditing &&
                  setEditedInfo({
                    ...editedInfo,
                    preferences: { ...editedInfo.preferences, showSocial: checked },
                  })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Allow Contact Form</p>
                <p className="text-sm text-muted-foreground">Enable contact form on your portfolio</p>
              </div>
              <Switch
                checked={isEditing ? editedInfo.preferences.allowContact : contactInfo.preferences.allowContact}
                onCheckedChange={(checked) =>
                  isEditing &&
                  setEditedInfo({
                    ...editedInfo,
                    preferences: { ...editedInfo.preferences, allowContact: checked },
                  })
                }
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
