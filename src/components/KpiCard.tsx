import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface KpiTileProps {
  label: string
  value: string | number
  icon: LucideIcon
  hint?: string
  className?: string
}

/** KPI horizontal (Panel): tile de ícono celeste a la izquierda, label y número a la derecha. */
export function KpiTile({ label, value, icon: Icon, hint, className }: KpiTileProps) {
  return (
    <div className={cn("flex items-center gap-4 border bg-card p-4", className)}>
      <div className="fold-tr flex size-12 shrink-0 items-center justify-center bg-primary/15">
        <Icon className="size-6 text-primary" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="kpi-label">{label}</p>
        <p className="text-[26px] font-bold leading-8 tracking-tight tabular-nums text-foreground">
          {value}
        </p>
        {hint && (
          <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
        )}
      </div>
    </div>
  )
}

interface KpiStatProps {
  label: string
  value: string | number
  icon: LucideIcon
  iconClassName?: string
  /** Resalta la card con borde y número cyan (como VENDIDOS en el diseño). */
  accent?: boolean
  className?: string
}

/** KPI centrado (Stock): ícono arriba, número grande y label abajo. */
export function KpiStat({
  label,
  value,
  icon: Icon,
  iconClassName,
  accent = false,
  className,
}: KpiStatProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1.5 border bg-card px-3 py-5",
        accent && "border-primary",
        className
      )}
    >
      <Icon
        className={cn("size-6", iconClassName ?? "text-primary")}
        strokeWidth={2}
      />
      <p
        className={cn(
          "text-[26px] font-bold leading-8 tracking-tight tabular-nums",
          accent ? "text-primary" : "text-foreground"
        )}
      >
        {value}
      </p>
      <p className="kpi-label">{label}</p>
    </div>
  )
}
