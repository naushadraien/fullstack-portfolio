"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface RainEffectProps {
  intensity?: "light" | "medium" | "heavy"
  color?: string
}

export default function RainEffect({ intensity = "medium", color = "#8b5cf6" }: RainEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Set up scene
    const scene = new THREE.Scene()

    // Set up camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 20

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Determine number of raindrops based on intensity
    const dropCounts = {
      light: 500,
      medium: 1000,
      heavy: 2000,
    }

    const rainCount = dropCounts[intensity]

    // Create raindrop geometry
    const rainGeometry = new THREE.BufferGeometry()
    const rainPositions = new Float32Array(rainCount * 3)
    const rainSizes = new Float32Array(rainCount)
    const rainVelocities = new Float32Array(rainCount)

    for (let i = 0; i < rainCount; i++) {
      const i3 = i * 3

      // Position
      rainPositions[i3] = (Math.random() - 0.5) * 100 // x
      rainPositions[i3 + 1] = Math.random() * 100 // y
      rainPositions[i3 + 2] = (Math.random() - 0.5) * 50 // z

      // Size
      rainSizes[i] = Math.random() * 0.5 + 0.1

      // Velocity
      rainVelocities[i] = Math.random() * 0.5 + 0.2
    }

    rainGeometry.setAttribute("position", new THREE.BufferAttribute(rainPositions, 3))
    rainGeometry.setAttribute("size", new THREE.BufferAttribute(rainSizes, 1))

    // Create raindrop material
    const rainMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })

    // Create rain particles
    const rain = new THREE.Points(rainGeometry, rainMaterial)
    scene.add(rain)

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      const positions = rainGeometry.attributes.position.array as Float32Array

      for (let i = 0; i < rainCount; i++) {
        const i3 = i * 3

        // Update y position (falling)
        positions[i3 + 1] -= rainVelocities[i]

        // Reset position when raindrop goes below the screen
        if (positions[i3 + 1] < -50) {
          positions[i3 + 1] = 50
          positions[i3] = (Math.random() - 0.5) * 100 // randomize x again
          positions[i3 + 2] = (Math.random() - 0.5) * 50 // randomize z again
        }
      }

      rainGeometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose resources
      rainGeometry.dispose()
      rainMaterial.dispose()
      renderer.dispose()
    }
  }, [intensity, color])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.7 }} />
}
