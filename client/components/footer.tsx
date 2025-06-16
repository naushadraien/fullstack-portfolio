"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Linkedin, Instagram, ArrowUp, Mail } from "lucide-react"
import GlassCard from "@/components/glass-card"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
  ]

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ]

  const services = ["Web Development", "Mobile Development", "UI/UX Design", "3D Visualization", "Technical Consulting"]

  return (
    <footer className="relative pt-20 pb-10">
      <div className="container mx-auto px-4">
        <GlassCard className="p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h3 className="text-xl font-bold mb-4">John Doe</h3>
              <p className="text-foreground/70 mb-4">
                A passionate Full Stack Developer specializing in modern web technologies and 3D visualization.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="bg-secondary hover:bg-primary hover:text-white transition-colors duration-300 p-2 rounded-full"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-foreground/70 hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-bold mb-4">Services</h3>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li key={index} className="text-foreground/70">
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="text-foreground/70 mb-4">Subscribe to my newsletter for the latest updates and articles.</p>
              <div className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-l-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary mb-2 sm:mb-0"
                />
                <Button className="sm:rounded-l-none">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <p className="text-foreground/70 text-sm mb-4 md:mb-0">© {currentYear} John Doe. All rights reserved.</p>
          <Button variant="outline" size="icon" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  )
}
