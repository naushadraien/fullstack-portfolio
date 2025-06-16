"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  opacity: number
  lifetime: number
  maxLifetime: number
}

export default function MouseParticles() {
  const [particles, setParticles] = useState<Particle[]>([])
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isMovingRef = useRef(false)
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()
  const particleIdRef = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update refs instead of state to avoid re-renders
      mousePositionRef.current = { x: e.clientX, y: e.clientY }
      isMovingRef.current = true

      // Reset the moving state after a short delay
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        isMovingRef.current = false
      }, 100)

      // Add new particles when mouse is moving
      if (isMovingRef.current) {
        addNewParticles()
      }
    }

    const addNewParticles = () => {
      const colors = ["#c084fc", "#8b5cf6", "#4c1d95", "#7c3aed", "#6d28d9"]

      const newParticles = Array.from({ length: 2 }, () => {
        const size = Math.random() * 8 + 2
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * 20

        return {
          id: particleIdRef.current++,
          x: mousePositionRef.current.x + Math.cos(angle) * distance,
          y: mousePositionRef.current.y + Math.sin(angle) * distance,
          size,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 0.8,
          lifetime: 0,
          maxLifetime: Math.random() * 1000 + 500, // Between 0.5 and 1.5 seconds
        }
      })

      setParticles((prev) => [...prev, ...newParticles])
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(timeoutRef.current)
    }
  }, []) // Empty dependency array to run only once on mount

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current

      // Update particles
      setParticles((prevParticles) =>
        prevParticles
          .map((particle) => ({
            ...particle,
            lifetime: particle.lifetime + deltaTime,
            opacity: Math.max(0, 0.8 - (particle.lifetime / particle.maxLifetime) * 0.8),
            size: Math.max(0, particle.size - (deltaTime / particle.maxLifetime) * particle.size),
          }))
          .filter((particle) => particle.lifetime < particle.maxLifetime),
      )
    }

    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, []) // Empty dependency array to run only once on mount

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      ))}
    </div>
  )
}
