import { NavLink } from "react-router-dom"
import { LayoutDashboard, Route, Package, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { to: "/", label: "Panel", icon: LayoutDashboard },
  { to: "/ruta", label: "Ruta", icon: Route },
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
                "flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            <Icon className="size-5" strokeWidth={2.25} />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
