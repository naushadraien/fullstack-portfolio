"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap, User } from "lucide-react"
import GlassCard from "@/components/glass-card"

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("about")

  const skills = [
    { name: "JavaScript", icon: "logos:javascript" },
    { name: "TypeScript", icon: "logos:typescript-icon" },
    { name: "React", icon: "logos:react" },
    { name: "Next.js", icon: "logos:nextjs-icon" },
    { name: "Three.js", icon: "logos:threejs" },
    { name: "Node.js", icon: "logos:nodejs-icon" },
    { name: "Express", icon: "logos:express" },
    { name: "MongoDB", icon: "logos:mongodb-icon" },
    { name: "PostgreSQL", icon: "logos:postgresql" },
    { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
    { name: "GraphQL", icon: "logos:graphql" },
    { name: "Docker", icon: "logos:docker-icon" },
    { name: "AWS", icon: "logos:aws" },
    { name: "Git", icon: "logos:git-icon" },
    { name: "CI/CD", icon: "logos:github-actions" },
  ]

  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      period: "2021 - Present",
      description:
        "Led the development of modern web applications using React, Next.js, and Three.js. Implemented responsive designs and optimized performance.",
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      period: "2018 - 2021",
      description:
        "Developed and maintained full-stack applications using MERN stack. Collaborated with design and product teams to deliver high-quality software.",
    },
    {
      title: "Junior Web Developer",
      company: "Web Crafters",
      period: "2016 - 2018",
      description:
        "Built responsive websites and implemented UI components. Worked with JavaScript, HTML, and CSS to create engaging user experiences.",
    },
  ]

  const education = [
    {
      degree: "Master of Computer Science",
      institution: "Tech University",
      period: "2014 - 2016",
      description: "Specialized in Web Technologies and Interactive Media",
    },
    {
      degree: "Bachelor of Science in Information Technology",
      institution: "State University",
      period: "2010 - 2014",
      description: "Graduated with honors, focused on Software Development",
    },
  ]

  return (
    <section id="about" className="section-padding relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Get to know more about me, my background, and what I do
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <GlassCard className="p-4 h-full">
              <div className="relative rounded-lg overflow-hidden shadow-xl h-[400px] lg:h-[500px]">
                <Image src="/placeholder.svg?height=600&width=400" alt="John Doe" fill className="object-cover" />
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-3">
            <GlassCard className="p-6">
              <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="about" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">About</span>
                  </TabsTrigger>
                  <TabsTrigger value="experience" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span className="hidden sm:inline">Experience</span>
                  </TabsTrigger>
                  <TabsTrigger value="education" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span className="hidden sm:inline">Education</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Who am I?</h3>
                    <p className="text-foreground/80 mb-4">
                      I'm a passionate Full Stack Developer with over 5 years of experience in building modern web
                      applications. I specialize in creating interactive and visually appealing user interfaces using
                      the latest web technologies.
                    </p>
                    <p className="text-foreground/80 mb-6">
                      My goal is to build products that not only look great but also solve real-world problems. I enjoy
                      working with Three.js to create immersive 3D experiences on the web.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-4">My Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-sm py-1 px-3 flex items-center gap-2">
                          <span className="w-4 h-4 flex items-center justify-center">
                            <img
                              src={`https://api.iconify.design/${skill.icon}.svg`}
                              alt={skill.name}
                              width={16}
                              height={16}
                            />
                          </span>
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="experience" className="space-y-6">
                  {experiences.map((exp, index) => (
                    <GlassCard key={index} className="p-6 card-hover">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold">{exp.title}</h3>
                        <Badge variant="outline" className="mt-2 md:mt-0 w-fit">
                          {exp.period}
                        </Badge>
                      </div>
                      <p className="text-primary font-medium mb-3">{exp.company}</p>
                      <p className="text-foreground/70">{exp.description}</p>
                    </GlassCard>
                  ))}
                </TabsContent>

                <TabsContent value="education" className="space-y-6">
                  {education.map((edu, index) => (
                    <GlassCard key={index} className="p-6 card-hover">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold">{edu.degree}</h3>
                        <Badge variant="outline" className="mt-2 md:mt-0 w-fit">
                          {edu.period}
                        </Badge>
                      </div>
                      <p className="text-primary font-medium mb-3">{edu.institution}</p>
                      <p className="text-foreground/70">{edu.description}</p>
                    </GlassCard>
                  ))}
                </TabsContent>
              </Tabs>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}
