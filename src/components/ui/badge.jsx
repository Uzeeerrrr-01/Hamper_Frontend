import * as React from "react"
import { cn } from "../../lib/utils"

const badgeVariants = {
  variant: {
    default:
      "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary:
      "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive:
      "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground border-border",
    gold: "border-transparent bg-[#C6A26B] text-white hover:bg-[#C6A26B]/80",
  }
}

function Badge({ className, variant = "default", ...props }) {
  const baseStyles = "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  return (
    <div className={cn(baseStyles, badgeVariants.variant[variant], className)} {...props} />
  )
}

export { Badge, badgeVariants }
