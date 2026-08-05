import { Truck } from "lucide-react"

export function AppHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b bg-card">
      <div className="flex h-[72px] items-center justify-between px-5">
        <div className="flex items-center gap-3.5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-[8px] bg-[#111111]">
            <Truck className="size-6 text-white" strokeWidth={2} />
          </div>
          <div className="leading-tight">
            <p className="text-[17px] font-bold tracking-[0.02em] text-foreground">
              LOGISWIFT
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Logística Urbana
            </p>
          </div>
        </div>
        <span aria-hidden className="h-6 w-1.5 bg-primary" />
      </div>
    </header>
  )
}
