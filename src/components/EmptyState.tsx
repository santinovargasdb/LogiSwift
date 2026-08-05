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
        "border border-dotted border-[#cfcfcf] bg-card px-6 py-7 text-center text-[15px] text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  )
}
