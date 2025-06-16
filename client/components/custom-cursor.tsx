"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none"

    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement
      const isClickable =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer"

      setIsPointer(isClickable)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", updateCursorPosition)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.body.style.cursor = "auto"
      window.removeEventListener("mousemove", updateCursorPosition)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Main rocket cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isPointer ? 1.2 : 1,
          rotate: isPointer ? 15 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
        initial={{ opacity: 0 }}
      >
        <div className="relative w-10 h-10">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pHtiN2WpQXZM5t86oWlOyB1OgmLkFV.png"
            alt="Rocket cursor"
            width={40}
            height={40}
            className={`transition-all duration-300 drop-shadow-[0_0_8px_rgba(59,130,246,0.7)] ${isPointer ? "opacity-100" : "opacity-90"}`}
          />

          {/* Rocket trail/flame effect when hovering clickable elements */}
          {isPointer && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full">
              <div className="w-3 h-8 bg-gradient-to-b from-blue-500 via-blue-300 to-transparent rounded-full animate-pulse" />
            </div>
          )}
        </div>
      </motion.div>

      {/* Small dot for precision */}
      <motion.div
        className="fixed top-0 left-0 z-[100] w-1 h-1 bg-white rounded-full pointer-events-none"
        animate={{
          x: position.x,
          y: position.y,
          opacity: 0.8,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 50,
        }}
      />
    </>
  )
}
