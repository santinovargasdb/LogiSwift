import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EmptyState } from "@/components/EmptyState"
import { SectionTitle } from "@/components/SectionTitle"

export default function Clientes() {
  const [busqueda, setBusqueda] = useState("")

  return (
    <div className="space-y-5">
      <SectionTitle
        title="Clientes"
        action={
          <Button className="fold-br px-5 font-semibold" disabled>
            <Plus />
            Nuevo
          </Button>
        }
      />

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="h-12 bg-card pl-10 text-[15px]"
          placeholder="Buscar por nombre o dirección..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <EmptyState>
        Todavía no hay clientes.
        <br />
        El alta se habilita al conectar la base de datos.
      </EmptyState>
    </div>
  )
}
