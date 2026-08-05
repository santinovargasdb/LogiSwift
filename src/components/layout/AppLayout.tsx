import { Outlet } from "react-router-dom"
import { AppHeader } from "./AppHeader"
import { BottomNav } from "./BottomNav"

export function AppLayout() {
  return (
    <div className="min-h-dvh">
      <AppHeader />
      <main className="mx-auto w-full max-w-[600px] px-4 pb-32 pt-[104px]">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
