import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ParticleBackground from "@/components/space-background"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ThemeToggle from "@/components/theme-toggle"
import MouseParticles from "@/components/mouse-particles"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Modern Portfolio",
  description: "My professional portfolio showcasing my work and skills",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ParticleBackground />
          <MouseParticles />
          <Header />
          <main>{children}</main>
          <Footer />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  )
}
