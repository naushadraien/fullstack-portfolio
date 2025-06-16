"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function WaterCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const rippleRef = useRef<HTMLDivElement>(null)
  const droplets = useRef<{ x: number; y: number; size: number; opacity: number; angle: number }[]>([])
  const requestRef = useRef<number>()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isHoverable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("hoverable") ||
        target.closest(".hoverable")

      setIsHovering(isHoverable)

      if (isHoverable && rippleRef.current) {
        // Create ripple effect
        rippleRef.current.style.opacity = "1"
        rippleRef.current.style.transform = "scale(1.5)"

        // Create water droplets on hover
        createDroplets()

        setTimeout(() => {
          if (rippleRef.current) {
            rippleRef.current.style.opacity = "0.5"
            rippleRef.current.style.transform = "scale(1)"
          }
        }, 300)
      }
    }

    const createDroplets = () => {
      const newDroplets = []
      const count = Math.floor(Math.random() * 3) + 2 // 2-4 droplets

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * 30 + 20
        newDroplets.push({
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          size: Math.random() * 8 + 4,
          opacity: 0.8,
          angle: angle,
        })
      }

      droplets.current = newDroplets
    }

    const animateDroplets = () => {
      if (droplets.current.length > 0 && cursorRef.current) {
        const dropletsContainer = cursorRef.current.querySelector(".droplets") as HTMLDivElement
        if (dropletsContainer) {
          // Clear previous droplets
          dropletsContainer.innerHTML = ""

          // Create a copy of the droplets array to avoid modification issues during iteration
          const currentDroplets = [...droplets.current]

          // Create new array to store updated droplets
          const updatedDroplets = []

          // Create and animate droplets
          for (let i = 0; i < currentDroplets.length; i++) {
            const droplet = currentDroplets[i]

            // Skip if droplet is undefined
            if (!droplet) continue

            const dropletEl = document.createElement("div")
            dropletEl.className = "absolute rounded-full bg-blue-400 pointer-events-none"
            dropletEl.style.width = `${droplet.size}px`
            dropletEl.style.height = `${droplet.size}px`
            dropletEl.style.left = `${droplet.x}px`
            dropletEl.style.top = `${droplet.y}px`
            dropletEl.style.opacity = droplet.opacity.toString()
            dropletEl.style.transform = "translate(-50%, -50%)"

            dropletsContainer.appendChild(dropletEl)

            // Update droplet position and opacity
            const updatedDroplet = {
              ...droplet,
              x: droplet.x + Math.cos(droplet.angle) * 2,
              y: droplet.y + Math.sin(droplet.angle) * 2,
              opacity: droplet.opacity - 0.03,
            }

            // Only keep droplets that are still visible
            if (updatedDroplet.opacity > 0) {
              updatedDroplets.push(updatedDroplet)
            }
          }

          // Update the droplets array with the filtered and updated droplets
          droplets.current = updatedDroplets
        }
      }

      requestRef.current = requestAnimationFrame(animateDroplets)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mouseover", handleMouseOver)

    requestRef.current = requestAnimationFrame(animateDroplets)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseover", handleMouseOver)

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-50 pointer-events-none"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {/* Main water droplet cursor */}
      <motion.div
        className="relative flex items-center justify-center"
        animate={{
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <div
          className="w-8 h-8 rounded-full bg-blue-400/30 backdrop-blur-sm border border-blue-300/50"
          style={{ boxShadow: "0 0 20px rgba(96, 165, 250, 0.5)" }}
        ></div>

        {/* Inner ripple */}
        <div
          ref={rippleRef}
          className="absolute w-12 h-12 rounded-full border-2 border-blue-300/30 transition-all duration-300"
          style={{ opacity: 0.5 }}
        ></div>

        {/* Water droplets container */}
        <div className="droplets absolute top-0 left-0"></div>
      </motion.div>
    </div>
  )
}
