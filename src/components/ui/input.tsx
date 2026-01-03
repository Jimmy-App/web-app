import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "h-11 w-full rounded-xl border border-[#e2d6c7] bg-white px-4 text-sm text-[var(--ink-0)] shadow-[0_6px_18px_-14px_rgba(20,18,16,0.4)] transition-all placeholder:text-[#a89f93] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
        className
      )}
      {...props}
    />
  )
)

Input.displayName = "Input"

export { Input }
