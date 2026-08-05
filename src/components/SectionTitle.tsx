import type { ReactNode } from "react"

interface SectionTitleProps {
  title: string
  subtitle?: string
  action?: ReactNode
}

/** Título de sección precedido por la barra vertical cyan. */
export function SectionTitle({ title, subtitle, action }: SectionTitleProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex gap-2.5">
        <span aria-hidden className="w-1 self-stretch rounded-full bg-primary" />
        <div>
          <h2 className="text-lg font-bold leading-6 text-foreground">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

/** Encabezado chico de subsección, en mayúsculas. */
export function SubTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-foreground">
      <span aria-hidden className="h-3.5 w-1 rounded-full bg-primary" />
      {children}
    </h3>
  )
}
