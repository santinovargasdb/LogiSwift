import { Download, DollarSign, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/EmptyState"
import { KpiCard } from "@/components/KpiCard"
import { SectionTitle } from "@/components/SectionTitle"
import { formatFechaLarga, formatMesAnio, formatMoney } from "@/lib/format"

export default function Panel() {
  const hoy = new Date()

  return (
    <div className="space-y-6">
      <SectionTitle title="Panel Del Día" subtitle={formatFechaLarga(hoy)} />

      <EmptyState>No hay hoja de ruta creada para hoy.</EmptyState>

      <section className="space-y-3">
        <SectionTitle
          title="Resumen Del Día"
          action={
            <Button variant="outline" size="sm" disabled>
              <Download />
              Descargar
            </Button>
          }
        />
        <div className="grid grid-cols-2 gap-3">
          <KpiCard label="Bultos" value={0} icon={Package} />
          <KpiCard label="Facturado" value={formatMoney(0)} icon={DollarSign} />
        </div>
        <Button size="lg" className="w-full font-bold" disabled>
          Terminar el día
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Aún no hay ventas registradas hoy.
        </p>
      </section>

      <section className="space-y-3">
        <SectionTitle
          title={`Resumen — ${formatMesAnio(hoy)}`}
          action={
            <Button variant="outline" size="sm" disabled>
              <Download />
              Exportar
            </Button>
          }
        />
        <div className="grid grid-cols-2 gap-3">
          <KpiCard
            label="Bultos"
            value={0}
            icon={Package}
            hint="0 días con ventas"
          />
          <KpiCard
            label="Facturado"
            value={formatMoney(0)}
            icon={DollarSign}
            hint="Sin datos aún"
          />
        </div>
      </section>

      <EmptyState>
        Cerrá el día al final para registrar las ventas del mes.
      </EmptyState>
    </div>
  )
}
