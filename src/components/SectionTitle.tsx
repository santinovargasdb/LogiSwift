import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionTitleProps {
  title: string
  subtitle?: string
  icon?: LucideIcon
  action?: ReactNode
  /** "lg" para títulos de página, "md" para encabezados de sección */
  size?: "lg" | "md"
}

/** Título precedido por la barra vertical cyan. */
export function SectionTitle({
  title,
  subtitle,
  icon: Icon,
  action,
  size = "lg",
}: SectionTitleProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex gap-3">
        <span aria-hidden className="w-[3px] self-stretch bg-primary" />
        <div>
          <div className="flex items-center gap-2">
            {Icon && <Icon className="size-4.5 shrink-0 text-primary" />}
            <h2
              className={cn(
                "font-bold leading-snug text-foreground",
                size === "lg" ? "text-[22px]" : "text-[17px]"
              )}
            >
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
