import { useState } from "react"
import {
  Package,
  Scale,
  Settings,
  ShoppingCart,
  SquarePen,
  TrendingDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { KpiStat } from "@/components/KpiCard"
import { SectionTitle } from "@/components/SectionTitle"

export default function Stock() {
  const [gastosFijos, setGastosFijos] = useState("")
  const [gananciaMeta, setGananciaMeta] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SectionTitle title="Stock y Ventas" />
        <div className="flex flex-wrap gap-2">
          <Button className="fold-br font-semibold" disabled>
            <ShoppingCart />
            Reponer
          </Button>
          <Button variant="outline" disabled>
            <Settings />
            Config
          </Button>
          <Button variant="outline" disabled>
            <SquarePen />
            Editar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <KpiStat label="Inicial" value={0} icon={Package} />
        <KpiStat label="Vendidos" value={0} icon={TrendingDown} accent />
        <KpiStat
          label="Restante"
          value={0}
          icon={Package}
          iconClassName="text-amber-500"
        />
      </div>

      <section className="space-y-4 border border-l-2 border-l-primary bg-card p-5">
        <h3 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.06em] text-foreground">
          <Scale className="size-4.5 shrink-0 text-primary" />
          ¿Cuánto necesito vender para llegar a la meta?
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-secondary px-4 py-3">
            <label htmlFor="gastos-fijos" className="kpi-label">
              Gastos Fijos
            </label>
            <div className="flex items-baseline text-lg font-bold text-foreground">
              $
              <input
                id="gastos-fijos"
                inputMode="numeric"
                placeholder="0"
                className="w-full bg-transparent text-lg font-bold outline-none placeholder:text-foreground"
                value={gastosFijos}
                onChange={(e) => setGastosFijos(e.target.value)}
              />
            </div>
          </div>
          <div className="bg-secondary px-4 py-3">
            <label htmlFor="ganancia-meta" className="kpi-label">
              Ganancia Meta
            </label>
            <div className="flex items-baseline text-lg font-bold text-foreground">
              $
              <input
                id="ganancia-meta"
                inputMode="numeric"
                placeholder="0"
                className="w-full bg-transparent text-lg font-bold outline-none placeholder:text-foreground"
                value={gananciaMeta}
                onChange={(e) => setGananciaMeta(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="border border-primary/40 border-l-2 border-l-primary bg-accent px-4 py-4 text-center">
          <p className="kpi-label">Unidades totales para alcanzar la meta</p>
          <p className="mt-1 text-[28px] font-bold leading-8 tabular-nums text-primary">
            0
          </p>
        </div>
      </section>

      <section className="space-y-4 border bg-card p-5">
        <h3 className="text-[13px] font-bold uppercase tracking-[0.06em] text-foreground">
          Inventario del Vehículo
        </h3>
        <p className="border border-dotted border-[#cfcfcf] px-4 py-7 text-center text-sm text-muted-foreground">
          Todavía no cargaste stock para hoy.
        </p>
      </section>

      <section className="space-y-4 border bg-card p-5">
        <h3 className="text-[13px] font-bold uppercase tracking-[0.06em] text-foreground">
          Registro de Ventas
        </h3>
        <p className="border border-dotted border-[#cfcfcf] px-4 py-7 text-center text-sm text-muted-foreground">
          Aún no hay ventas registradas hoy.
        </p>
      </section>
    </div>
  )
}
