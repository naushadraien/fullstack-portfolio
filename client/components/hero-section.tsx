"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Download, FileText, ExternalLink, Github, Linkedin, Twitter } from "lucide-react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import Typewriter from "@/components/typewriter"
import GlassCard from "@/components/glass-card"
import { motion } from "framer-motion"
import AnimatedName from "@/components/animated-name"

export default function HeroSection() {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Three.js setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    canvasRef.current.appendChild(renderer.domElement)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add directional light with shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024
    scene.add(directionalLight)

    // Add point lights with different colors for visual interest
    const pointLight1 = new THREE.PointLight(0x8b5cf6, 2, 10)
    pointLight1.position.set(2, 2, 2)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x4c1d95, 2, 10)
    pointLight2.position.set(-2, 1, -2)
    scene.add(pointLight2)

    // Camera position
    camera.position.z = 5
    camera.position.y = 1

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.3 // Slowed down rotation speed

    // Create a floating 3D logo/icon
    const createFloatingLogo = () => {
      const group = new THREE.Group()

      // Create a torus (ring)
      const torusGeometry = new THREE.TorusGeometry(1.5, 0.2, 16, 100)
      const torusMaterial = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        metalness: 0.7,
        roughness: 0.2,
        emissive: 0x4c1d95,
        emissiveIntensity: 0.3,
      })
      const torus = new THREE.Mesh(torusGeometry, torusMaterial)
      torus.castShadow = true
      torus.receiveShadow = true
      group.add(torus)

      // Create a sphere in the center
      const sphereGeometry = new THREE.SphereGeometry(0.8, 32, 32)
      const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0xc084fc,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x8b5cf6,
        emissiveIntensity: 0.2,
      })
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      sphere.castShadow = true
      sphere.receiveShadow = true
      group.add(sphere)

      // Create orbiting small spheres
      const smallSphereCount = 5
      const smallSpheres = []

      for (let i = 0; i < smallSphereCount; i++) {
        const angle = (i / smallSphereCount) * Math.PI * 2
        const radius = 2.5

        const smallSphereGeometry = new THREE.SphereGeometry(0.15, 16, 16)
        const smallSphereMaterial = new THREE.MeshStandardMaterial({
          color: 0xc084fc,
          metalness: 0.9,
          roughness: 0.1,
          emissive: 0x8b5cf6,
          emissiveIntensity: 0.5,
        })

        const smallSphere = new THREE.Mesh(smallSphereGeometry, smallSphereMaterial)
        smallSphere.position.x = Math.cos(angle) * radius
        smallSphere.position.z = Math.sin(angle) * radius
        smallSphere.castShadow = true

        group.add(smallSphere)
        smallSpheres.push({
          mesh: smallSphere,
          baseAngle: angle,
          speed: 0.2 + Math.random() * 0.2, // Slowed down speed
          verticalOffset: Math.random() * 0.5,
        })
      }

      // Add animation function
      const animate = (time: number) => {
        // Rotate the torus
        torus.rotation.x = time * 0.1 // Slowed down
        torus.rotation.y = time * 0.08 // Slowed down

        // Pulse the center sphere
        const scale = 1 + Math.sin(time * 0.8) * 0.05 // Slowed down
        sphere.scale.set(scale, scale, scale)

        // Animate the small orbiting spheres
        smallSpheres.forEach((smallSphere, index) => {
          const angle = smallSphere.baseAngle + time * smallSphere.speed
          const radius = 2.5

          smallSphere.mesh.position.x = Math.cos(angle) * radius
          smallSphere.mesh.position.z = Math.sin(angle) * radius
          smallSphere.mesh.position.y = Math.sin(time * 0.8 + index) * smallSphere.verticalOffset // Slowed down

          // Pulse the small spheres
          const smallScale = 1 + Math.sin(time * 1.2 + index) * 0.2 // Slowed down
          smallSphere.mesh.scale.set(smallScale, smallScale, smallScale)
        })
      }

      return { group, animate }
    }

    // Create and add the floating logo
    const floatingLogo = createFloatingLogo()
    scene.add(floatingLogo.group)

    // Create particles for background effect
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 1000

    const posArray = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: new THREE.Color(0x8b5cf6),
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Mouse interaction
    const mouse = new THREE.Vector2()
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      // Store mouse position for object movement
      mouseX = event.clientX - window.innerWidth / 2
      mouseY = event.clientY - window.innerHeight / 2
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const clock = new THREE.Clock()

    const animate = () => {
      requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      // Update object positions based on mouse
      targetX = mouseX * 0.001
      targetY = mouseY * 0.001

      // Move the floating logo based on mouse position
      floatingLogo.group.position.x += (targetX - floatingLogo.group.position.x) * 0.05
      floatingLogo.group.position.y += (-targetY - floatingLogo.group.position.y) * 0.05 + 0.2

      // Animate the floating logo
      floatingLogo.animate(elapsedTime)

      // Rotate the entire logo group
      floatingLogo.group.rotation.y = elapsedTime * 0.05 // Slowed down

      // Particle animation
      particlesMesh.rotation.x += 0.0002 // Slowed down
      particlesMesh.rotation.y += 0.0002 // Slowed down

      // Update controls
      controls.update()

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement)
      }

      // Dispose of geometries and materials
      particlesGeometry.dispose()
      particlesMaterial.dispose()

      // Clean up the scene
      scene.clear()
      renderer.dispose()
    }
  }, [])

  const typewriterTexts = ["Full Stack Developer", "Web Developer", "Mobile Developer", "3D Enthusiast"]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div ref={canvasRef} className="canvas-container" />
      <div className="container mx-auto px-4 z-10">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center">
          <motion.div variants={item} className="w-full max-w-3xl">
            <GlassCard className="p-8 md:p-12 animated-border glow hoverable">
              <div className="text-center">
                <motion.div variants={item} className="mb-6">
                  <AnimatedName name="John Doe" />
                </motion.div>
                <motion.p className="text-xl md:text-2xl text-foreground/80 mb-8" variants={item}>
                  I am a{" "}
                  <Typewriter
                    texts={typewriterTexts}
                    className="text-primary font-semibold"
                    typingSpeed={150}
                    deletingSpeed={80}
                  />
                </motion.p>
                <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={item}>
                  <Button
                    size="lg"
                    className="text-lg px-8 btn-hover-effect bg-linear-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 hoverable"
                  >
                    View My Work
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 flex items-center gap-2 border-primary/50 hover:border-primary hoverable"
                  >
                    <Download className="h-5 w-5" />
                    Download CV
                  </Button>
                </motion.div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={item} className="flex gap-4 mt-8">
            {[
              { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
              { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
              { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="bg-black/30 hover:bg-primary/80 text-white p-3 rounded-full backdrop-blur-xs transition-all duration-300 hoverable"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Resume Download Section */}
          <motion.div variants={item} className="mt-16 text-center w-full max-w-xl">
            <GlassCard className="p-6 mx-auto animated-border hoverable">
              <h3 className="text-xl font-semibold mb-4">Download My Resume</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="flex items-center gap-2 bg-linear-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 hoverable"
                >
                  <FileText className="h-5 w-5" />
                  PDF Resume
                </Button>
                <Button size="lg" variant="secondary" className="flex items-center gap-2 hoverable">
                  <Download className="h-5 w-5" />
                  Word Resume
                </Button>
              </div>
              <div className="mt-4 flex justify-center">
                <a href="#" className="flex items-center gap-2 text-primary hover:underline hoverable">
                  View Resume Online
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <a href="#about" aria-label="Scroll down" className="hoverable">
            <ArrowDown className="h-8 w-8 text-primary" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
