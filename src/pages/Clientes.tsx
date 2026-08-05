import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EmptyState } from "@/components/EmptyState"
import { SectionTitle } from "@/components/SectionTitle"

export default function Clientes() {
  const [busqueda, setBusqueda] = useState("")

  return (
    <div className="space-y-4">
      <SectionTitle
        title="Clientes"
        action={
          <Button size="sm" className="font-bold" disabled>
            <Plus />
            Nuevo
          </Button>
        }
      />

      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="bg-card pl-9"
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
