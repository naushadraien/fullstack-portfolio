"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  if (!mounted) return null

  return (
    <motion.div
      className="fixed top-24 right-6 z-50"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full h-14 w-14 bg-background/50 backdrop-blur-md border border-primary/50 shadow-lg hover:shadow-xl transition-all duration-300 hoverable animated-border glow"
        aria-label="Toggle theme"
      >
        <motion.div
          initial={false}
          animate={{ rotate: resolvedTheme === "dark" ? 0 : 180 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          {resolvedTheme === "dark" ? (
            <Moon className="h-6 w-6 text-yellow-300" />
          ) : (
            <Sun className="h-6 w-6 text-yellow-500" />
          )}
        </motion.div>
      </Button>
    </motion.div>
  )
}
