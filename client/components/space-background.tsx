"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Set up scene
    const scene = new THREE.Scene()

    // Set up camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    camera.position.z = 500

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Create stars
    const createStarfield = () => {
      const starGeometry = new THREE.BufferGeometry()
      const starCount = 15000
      const starPositions = new Float32Array(starCount * 3)
      const starSizes = new Float32Array(starCount)
      const starColors = new Float32Array(starCount * 3)

      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3
        // Position stars in a sphere around the camera
        const radius = Math.random() * 1500 + 50
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)

        starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta)
        starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        starPositions[i3 + 2] = radius * Math.cos(phi)

        // Random star sizes
        starSizes[i] = Math.random() * 2 + 0.5

        // Star colors - purple/blue hues
        const colorChoice = Math.random()
        if (colorChoice > 0.9) {
          // Purple stars
          starColors[i3] = 0.8 + Math.random() * 0.2 // R
          starColors[i3 + 1] = 0.3 + Math.random() * 0.3 // G
          starColors[i3 + 2] = 0.8 + Math.random() * 0.2 // B
        } else if (colorChoice > 0.8) {
          // Blue stars
          starColors[i3] = 0.3 + Math.random() * 0.2 // R
          starColors[i3 + 1] = 0.5 + Math.random() * 0.3 // G
          starColors[i3 + 2] = 0.8 + Math.random() * 0.2 // B
        } else if (colorChoice > 0.6) {
          // White stars
          starColors[i3] = 0.8 + Math.random() * 0.2 // R
          starColors[i3 + 1] = 0.8 + Math.random() * 0.2 // G
          starColors[i3 + 2] = 0.8 + Math.random() * 0.2 // B
        } else {
          // Dim stars
          const brightness = 0.5 + Math.random() * 0.3
          starColors[i3] = brightness // R
          starColors[i3 + 1] = brightness // G
          starColors[i3 + 2] = brightness + Math.random() * 0.2 // B slightly brighter
        }
      }

      starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3))
      starGeometry.setAttribute("size", new THREE.BufferAttribute(starSizes, 1))
      starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3))

      // Star material with custom shader for better looking stars
      const starMaterial = new THREE.PointsMaterial({
        size: 2,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        vertexColors: true,
      })

      const stars = new THREE.Points(starGeometry, starMaterial)
      scene.add(stars)
      return stars
    }

    const stars = createStarfield()

    // Create nebula clouds
    const createNebulaClouds = () => {
      const clouds = []
      const cloudCount = 5

      for (let i = 0; i < cloudCount; i++) {
        const cloudGeometry = new THREE.BufferGeometry()
        const particleCount = 2000
        const particlePositions = new Float32Array(particleCount * 3)

        // Create a cloud centered at a random position
        const centerX = (Math.random() - 0.5) * 1000
        const centerY = (Math.random() - 0.5) * 1000
        const centerZ = (Math.random() - 0.5) * 1000

        // Cloud size
        const sizeX = 100 + Math.random() * 200
        const sizeY = 100 + Math.random() * 200
        const sizeZ = 100 + Math.random() * 200

        for (let j = 0; j < particleCount; j++) {
          const j3 = j * 3

          // Position particles in a 3D gaussian distribution
          particlePositions[j3] = centerX + (Math.random() - 0.5) * sizeX
          particlePositions[j3 + 1] = centerY + (Math.random() - 0.5) * sizeY
          particlePositions[j3 + 2] = centerZ + (Math.random() - 0.5) * sizeZ
        }

        cloudGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3))

        // Choose a color for the cloud
        const colorChoice = Math.random()
        let cloudColor

        if (colorChoice < 0.3) {
          // Purple nebula
          cloudColor = new THREE.Color(0.5, 0.2, 0.8)
        } else if (colorChoice < 0.6) {
          // Blue nebula
          cloudColor = new THREE.Color(0.2, 0.4, 0.8)
        } else if (colorChoice < 0.8) {
          // Pink nebula
          cloudColor = new THREE.Color(0.8, 0.3, 0.7)
        } else {
          // Teal nebula
          cloudColor = new THREE.Color(0.2, 0.8, 0.7)
        }

        const cloudMaterial = new THREE.PointsMaterial({
          color: cloudColor,
          size: 3,
          transparent: true,
          opacity: 0.2,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true,
        })

        const cloud = new THREE.Points(cloudGeometry, cloudMaterial)
        scene.add(cloud)
        clouds.push({
          mesh: cloud,
          rotationSpeed: {
            x: (Math.random() - 0.5) * 0.0001,
            y: (Math.random() - 0.5) * 0.0001,
            z: (Math.random() - 0.5) * 0.0001,
          },
        })
      }

      return clouds
    }

    const nebulaClouds = createNebulaClouds()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Mouse interaction
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    }

    const handleMouseMove = (event: MouseEvent) => {
      // Calculate normalized mouse position (-1 to 1)
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Smooth mouse movement
      mouse.x += (mouse.targetX - mouse.x) * 0.05
      mouse.y += (mouse.targetY - mouse.y) * 0.05

      // Rotate stars based on mouse position
      stars.rotation.y += 0.0001
      stars.rotation.x += 0.0001

      // Apply subtle camera movement based on mouse
      camera.position.x = mouse.x * 30
      camera.position.y = mouse.y * 30
      camera.lookAt(scene.position)

      // Animate nebula clouds
      nebulaClouds.forEach((cloud) => {
        cloud.mesh.rotation.x += cloud.rotationSpeed.x
        cloud.mesh.rotation.y += cloud.rotationSpeed.y
        cloud.mesh.rotation.z += cloud.rotationSpeed.z
      })

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose resources
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />
}
