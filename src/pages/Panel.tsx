import { CircleCheck, Download, Package, Receipt, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/EmptyState"
import { KpiTile } from "@/components/KpiCard"
import { SectionTitle } from "@/components/SectionTitle"
import { formatFechaLarga, formatMesAnio, formatMoney } from "@/lib/format"

export default function Panel() {
  const hoy = new Date()

  return (
    <div className="space-y-6">
      <SectionTitle title="Panel Del Día" subtitle={formatFechaLarga(hoy)} />

      <EmptyState>No hay hoja de ruta creada para hoy.</EmptyState>

      <section className="space-y-4">
        <SectionTitle
          size="md"
          icon={TrendingUp}
          title="Resumen Del Día"
          action={
            <Button variant="outline" disabled>
              <Download />
              Descargar
            </Button>
          }
        />
        <p className="text-sm text-muted-foreground">{formatFechaLarga(hoy)}</p>
        <div className="grid grid-cols-2 gap-3">
          <KpiTile label="Bultos" value={0} icon={Package} />
          <KpiTile label="Facturado" value={formatMoney(0)} icon={Receipt} />
        </div>
        <Button size="lg" className="h-12 w-full text-[15px] font-bold" disabled>
          <CircleCheck className="size-5" />
          Terminar el día
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Aún no hay ventas registradas hoy.
        </p>
      </section>

      <section className="space-y-4">
        <SectionTitle
          size="md"
          icon={TrendingUp}
          title={`Resumen — ${formatMesAnio(hoy)}`}
          action={
            <Button variant="outline" disabled>
              <Download />
              Exportar
            </Button>
          }
        />
        <div className="grid grid-cols-2 gap-3">
          <KpiTile
            label="Bultos"
            value={0}
            icon={Package}
            hint="0 días con ventas"
          />
          <KpiTile
            label="Facturado"
            value={formatMoney(0)}
            icon={Receipt}
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
