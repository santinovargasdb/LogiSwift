import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface KpiCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  iconClassName?: string
  hint?: string
  className?: string
}

export function KpiCard({
  label,
  value,
  icon: Icon,
  iconClassName,
  hint,
  className,
}: KpiCardProps) {
  return (
    <div className={cn("rounded-xl border bg-card p-4", className)}>
      <div className="flex items-center gap-1.5">
        <Icon className={cn("size-3.5 shrink-0", iconClassName ?? "text-primary")} />
        <span className="kpi-label">{label}</span>
      </div>
      <p className="mt-2 text-[26px] font-extrabold leading-8 tracking-tight tabular-nums text-foreground">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}
