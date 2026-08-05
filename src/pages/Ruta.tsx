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

export default function Ruta() {
  const [modalAbierto, setModalAbierto] = useState(false)
  const [busqueda, setBusqueda] = useState("")

  return (
    <div className="flex min-h-[calc(100dvh-16rem)] flex-col items-center justify-center gap-5 text-center">
      <div className="fold-tr flex size-20 items-center justify-center bg-primary/15">
        <Plus className="size-9 text-primary" strokeWidth={2} />
      </div>
      <div>
        <h2 className="text-xl font-bold text-foreground">Sin ruta para hoy</h2>
        <p className="mt-1.5 text-[15px] text-muted-foreground">
          Creá tu hoja de ruta seleccionando clientes
        </p>
      </div>
      <Button
        className="fold-br h-11 px-6 text-[15px] font-bold"
        onClick={() => setModalAbierto(true)}
      >
        <Plus />
        Crear Hoja de Ruta
      </Button>

      <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
        <DialogContent className="max-w-[calc(100%-2rem)] text-left sm:max-w-[620px]">
          <DialogHeader className="text-left">
            <DialogTitle>Crear Hoja de Ruta</DialogTitle>
            <DialogDescription>
              Elegí los clientes que vas a visitar hoy.
            </DialogDescription>
          </DialogHeader>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-11 pl-9"
              placeholder="Buscar cliente..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="border border-dotted border-[#cfcfcf] px-4 py-8 text-center text-sm text-muted-foreground">
            Todavía no hay clientes para agregar. Crealos primero en la pestaña
            CLIENTES.
          </div>

          <DialogFooter className="flex-row items-center justify-between gap-2 sm:justify-between">
            <p className="text-sm text-muted-foreground">
              0 clientes seleccionados
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setModalAbierto(false)}>
                Cancelar
              </Button>
              <Button className="fold-br" disabled>
                Crear ruta
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
