import { Truck } from "lucide-react"

export function AppHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b bg-card">
      <div className="mx-auto flex h-14 w-full max-w-[600px] items-center gap-3 px-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-foreground">
          <Truck className="size-5 text-white" strokeWidth={2.25} />
        </div>
        <div className="leading-tight">
          <p className="text-base font-extrabold tracking-tight text-foreground">
            LOGISWIFT
          </p>
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Logística Urbana
          </p>
        </div>
      </div>
    </header>
  )
}
