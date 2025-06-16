import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export default function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className={cn("rounded-xl border border-white/10 shadow-xl", "bg-black/40 backdrop-blur-xl", className)}>
      {children}
    </div>
  )
}
