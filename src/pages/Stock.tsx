import { useState } from "react"
import {
  Package,
  PackageCheck,
  PackageOpen,
  PackagePlus,
  Pencil,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EmptyState } from "@/components/EmptyState"
import { KpiCard } from "@/components/KpiCard"
import { SectionTitle, SubTitle } from "@/components/SectionTitle"

export default function Stock() {
  const [gastosFijos, setGastosFijos] = useState("")
  const [gananciaMeta, setGananciaMeta] = useState("")

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <SectionTitle title="Stock y Ventas" />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" disabled>
            <PackagePlus />
            Reponer
          </Button>
          <Button variant="outline" size="sm" className="flex-1" disabled>
            <Settings />
            Config
          </Button>
          <Button variant="outline" size="sm" className="flex-1" disabled>
            <Pencil />
            Editar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <KpiCard className="p-3" label="Inicial" value={0} icon={Package} />
        <KpiCard
          className="p-3"
          label="Vendidos"
          value={0}
          icon={PackageCheck}
        />
        <KpiCard
          className="p-3"
          label="Restante"
          value={0}
          icon={PackageOpen}
          iconClassName="text-amber-500"
        />
      </div>

      <section className="space-y-3 rounded-xl border bg-card p-4">
        <h3 className="text-sm font-bold text-foreground">
          ¿Cuánto necesito vender para llegar a la meta?
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="gastos-fijos" className="kpi-label">
              Gastos Fijos
            </Label>
            <Input
              id="gastos-fijos"
              inputMode="decimal"
              placeholder="$ 0"
              value={gastosFijos}
              onChange={(e) => setGastosFijos(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ganancia-meta" className="kpi-label">
              Ganancia Meta
            </Label>
            <Input
              id="ganancia-meta"
              inputMode="decimal"
              placeholder="$ 0"
              value={gananciaMeta}
              onChange={(e) => setGananciaMeta(e.target.value)}
            />
          </div>
        </div>
        <div className="rounded-lg bg-primary/10 px-4 py-3 text-center">
          <p className="kpi-label text-accent-foreground">
            Unidades totales para alcanzar la meta
          </p>
          <p className="mt-1 text-2xl font-extrabold tabular-nums text-foreground">
            —
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Se calcula con el precio de tus productos cargados.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <SubTitle>Inventario del Vehículo</SubTitle>
        <EmptyState>Todavía no cargaste stock para hoy.</EmptyState>
      </section>

      <section className="space-y-3">
        <SubTitle>Registro de Ventas</SubTitle>
        <EmptyState>Aún no hay ventas registradas hoy.</EmptyState>
      </section>
    </div>
  )
}
