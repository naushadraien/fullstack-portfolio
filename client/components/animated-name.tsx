"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface AnimatedNameProps {
  name: string
  className?: string
}

export default function AnimatedName({ name, className = "" }: AnimatedNameProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  // Split the name into first and last name
  const nameParts = name.split(" ")
  const firstName = nameParts[0] || ""
  const lastName = nameParts.slice(1).join(" ")

  // Animation variants for container
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  // Animation variants for each letter
  const letterVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <div className={className}>
      <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-wrap justify-center">
        {/* First name */}
        <div className="flex mr-3">
          {firstName.split("").map((char, index) => (
            <motion.span
              key={`first-${index}`}
              variants={letterVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        {/* Last name with gradient */}
        <div className="flex">
          {lastName.split("").map((char, index) => (
            <motion.span
              key={`last-${index}`}
              variants={letterVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
