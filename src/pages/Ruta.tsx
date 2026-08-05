import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { SectionTitle } from "@/components/SectionTitle"
import { formatFechaLarga } from "@/lib/format"

export default function Ruta() {
  const [modalAbierto, setModalAbierto] = useState(false)
  const [busqueda, setBusqueda] = useState("")

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Hoja de Ruta"
        subtitle={formatFechaLarga(new Date())}
      />

      <div className="flex flex-col items-center gap-4 rounded-xl border bg-card px-6 py-12 text-center">
        <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10">
          <Plus className="size-7 text-primary" strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="text-base font-bold text-foreground">
            Sin ruta para hoy
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Creá tu hoja de ruta seleccionando clientes
          </p>
        </div>
        <Button className="font-bold" onClick={() => setModalAbierto(true)}>
          <Plus />
          Crear Hoja de Ruta
        </Button>
      </div>

      <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
        <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Crear Hoja de Ruta</DialogTitle>
            <DialogDescription>
              Elegí los clientes que vas a visitar hoy.
            </DialogDescription>
          </DialogHeader>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Buscar cliente..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="rounded-lg border-2 border-dashed border-input px-4 py-8 text-center text-sm text-muted-foreground">
            Todavía no hay clientes para agregar. Crealos primero en la pestaña
            CLIENTES.
          </div>

          <DialogFooter className="flex-row items-center justify-between gap-2 sm:justify-between">
            <p className="text-xs text-muted-foreground">
              0 clientes seleccionados
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setModalAbierto(false)}>
                Cancelar
              </Button>
              <Button disabled>Crear ruta</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
