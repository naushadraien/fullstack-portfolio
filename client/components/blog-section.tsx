"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import GlassCard from "@/components/glass-card"

export default function BlogSection() {
  const [visiblePosts, setVisiblePosts] = useState(3)

  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Three.js in React",
      excerpt:
        "Learn how to integrate Three.js with React to create stunning 3D visualizations for your web applications.",
      image: "/placeholder.svg?height=400&width=600",
      date: "May 15, 2023",
      readTime: "8 min read",
      category: "3D Development",
      slug: "getting-started-with-threejs-in-react",
    },
    {
      id: 2,
      title: "Building Performant Next.js Applications",
      excerpt:
        "Explore techniques and best practices for optimizing your Next.js applications for maximum performance.",
      image: "/placeholder.svg?height=400&width=600",
      date: "April 22, 2023",
      readTime: "12 min read",
      category: "Web Development",
      slug: "building-performant-nextjs-applications",
    },
    {
      id: 3,
      title: "Modern CSS Techniques Every Developer Should Know",
      excerpt:
        "Discover powerful CSS techniques that will elevate your web design skills and improve your development workflow.",
      image: "/placeholder.svg?height=400&width=600",
      date: "March 10, 2023",
      readTime: "10 min read",
      category: "CSS",
      slug: "modern-css-techniques",
    },
    {
      id: 4,
      title: "Creating Realistic 3D Environments with WebGL",
      excerpt:
        "A deep dive into creating immersive and realistic 3D environments using WebGL and modern JavaScript libraries.",
      image: "/placeholder.svg?height=400&width=600",
      date: "February 28, 2023",
      readTime: "15 min read",
      category: "3D Development",
      slug: "creating-realistic-3d-environments",
    },
    {
      id: 5,
      title: "The Future of Web Development: What to Expect in 2023",
      excerpt:
        "An analysis of emerging trends and technologies that will shape the future of web development in the coming year.",
      image: "/placeholder.svg?height=400&width=600",
      date: "January 15, 2023",
      readTime: "7 min read",
      category: "Industry Trends",
      slug: "future-of-web-development-2023",
    },
    {
      id: 6,
      title: "Mastering Tailwind CSS: Advanced Techniques",
      excerpt:
        "Take your Tailwind CSS skills to the next level with these advanced techniques and customization strategies.",
      image: "/placeholder.svg?height=400&width=600",
      date: "December 5, 2022",
      readTime: "9 min read",
      category: "CSS",
      slug: "mastering-tailwind-css",
    },
  ]

  const displayedPosts = blogPosts.slice(0, visiblePosts)

  const loadMorePosts = () => {
    setVisiblePosts((prev) => Math.min(prev + 3, blogPosts.length))
  }

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
    <section id="blog" className="section-padding relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Articles</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on web development, 3D graphics, and more
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {displayedPosts.map((post) => (
            <motion.div key={post.id} variants={item}>
              <GlassCard className="overflow-hidden card-hover h-full flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110" // Slowed down animation
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary hover:bg-primary/90">{post.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6 grow">
                  <div className="flex items-center text-sm text-foreground/60 mb-3">
                    <div className="flex items-center mr-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="group">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                      {" "}
                      {/* Slowed down animation */}
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-foreground/70">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Link href={`/blog/${post.slug}`} className="flex items-center text-primary hover:underline">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardFooter>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {visiblePosts < blogPosts.length && (
          <div className="text-center mt-12">
            <GlassCard className="inline-block p-2">
              <Button onClick={loadMorePosts} size="lg">
                Load More Articles
              </Button>
            </GlassCard>
          </div>
        )}
      </div>
    </section>
  )
}
