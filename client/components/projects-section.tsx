"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import GlassCard from "@/components/glass-card"

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all")

  const categories = ["all", "web", "mobile", "3d"]

  const projects = [
    {
      id: 1,
      title: "3D Product Configurator",
      description: "Interactive 3D product visualization tool built with Three.js and React",
      image: "/placeholder.svg?height=400&width=600",
      category: "3d",
      tags: ["Three.js", "React", "WebGL"],
      demoLink: "#",
      codeLink: "#",
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      image: "/placeholder.svg?height=400&width=600",
      category: "web",
      tags: ["Next.js", "Stripe", "Tailwind CSS"],
      demoLink: "#",
      codeLink: "#",
    },
    {
      id: 3,
      title: "Task Management App",
      description: "Mobile-first task management application with real-time updates",
      image: "/placeholder.svg?height=400&width=600",
      category: "mobile",
      tags: ["React Native", "Firebase", "Redux"],
      demoLink: "#",
      codeLink: "#",
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "Modern portfolio website with 3D elements and animations",
      image: "/placeholder.svg?height=400&width=600",
      category: "web",
      tags: ["Next.js", "Three.js", "Framer Motion"],
      demoLink: "#",
      codeLink: "#",
    },
    {
      id: 5,
      title: "3D Data Visualization",
      description: "Interactive 3D visualization of complex data sets",
      image: "/placeholder.svg?height=400&width=600",
      category: "3d",
      tags: ["D3.js", "Three.js", "TypeScript"],
      demoLink: "#",
      codeLink: "#",
    },
    {
      id: 6,
      title: "Weather App",
      description: "Real-time weather application with location tracking",
      image: "/placeholder.svg?height=400&width=600",
      category: "mobile",
      tags: ["React", "Weather API", "Geolocation"],
      demoLink: "#",
      codeLink: "#",
    },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.8, // Slowed down animation
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8 } }, // Slowed down animation
  }

  return (
    <section id="projects" className="section-padding relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Explore my recent work and projects that showcase my skills and expertise
          </p>
        </div>

        <GlassCard className="p-6 mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline-solid"}
                onClick={() => setActiveFilter(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </GlassCard>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <GlassCard className="overflow-hidden card-hover h-full flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110" // Slowed down animation
                  />
                </div>
                <CardContent className="p-6 grow">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-foreground/70 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                </CardFooter>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
