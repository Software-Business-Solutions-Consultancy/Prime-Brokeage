import type { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonVariant = "primary" | "secondary" | "danger" | "outline" | 'transparent'
type ButtonSize = "sm" | "md" | "lg"
type IconType = "img" | "element"

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  iconType?: IconType
  iconPosition?: "left" | "right"
  children?: ReactNode
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconType = "element",
  iconPosition = "left",
  children,
  className = "",
  ...props
}: CustomButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold tracking-wide rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"

  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-[#C77DCC] text-white hover:bg-[#b56cba] active:bg-[#a35ba8]",
    secondary: "bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-700",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
    outline: "bg-transparent border-2 border-zinc-900 text-zinc-900 hover:bg-zinc-100",
    transparent: "bg-transparent",
  }

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-xs gap-2",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-3",
  }

  const renderIcon = () => {
    if (!icon) return null

    if (iconType === "img" && typeof icon === "string") {
      return <img src={icon || "/placeholder.svg"} alt="" className="w-5 h-5 flex-shrink-0" />
    }

    return <span className="flex-shrink-0">{icon}</span>
  }

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} {...props}>
      {iconPosition === "left" && renderIcon()}
      {children}
      {iconPosition === "right" && renderIcon()}
    </button>
  )
}

// Icon components
export function ContinueIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  )
}

export function CancelIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="17" y1="8" x2="23" y2="14" />
      <line x1="23" y1="8" x2="17" y2="14" />
    </svg>
  )
}
