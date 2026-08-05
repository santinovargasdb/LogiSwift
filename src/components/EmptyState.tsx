import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Card de estado vacío con borde punteado. */
export function EmptyState({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-xl border-2 border-dashed border-input px-6 py-7 text-center text-sm text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  )
}
