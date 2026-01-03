import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

type ButtonVariant = "primary" | "secondary" | "ghost"

type ButtonSize = "sm" | "md" | "lg"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--ink-0)] text-white hover:bg-[#2b2825] shadow-[0_10px_30px_-18px_rgba(20,18,16,0.6)]",
  secondary:
    "bg-[var(--card-1)] text-[var(--ink-0)] hover:bg-[#efe6d8] border border-[#e2d6c7]",
  ghost: "bg-transparent text-[var(--ink-0)] hover:bg-[#efe6d8]"
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-6 text-base"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
