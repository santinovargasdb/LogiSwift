import { NavLink } from "react-router-dom"
import { LayoutGrid, MapPin, Package, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { to: "/", label: "Panel", icon: LayoutGrid },
  { to: "/ruta", label: "Ruta", icon: MapPin },
  { to: "/stock", label: "Stock", icon: Package },
  { to: "/clientes", label: "Clientes", icon: Users },
]

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-card pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto grid w-full max-w-[600px] grid-cols-4">
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              cn(
                "relative flex flex-col items-center gap-1.5 pb-4 pt-4 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors",
                isActive
                  ? "bg-accent text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute top-0 h-[3px] w-10 bg-primary"
                  />
                )}
                <Icon className="size-6" strokeWidth={2} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
