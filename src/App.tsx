import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AppLayout } from "@/components/layout/AppLayout"
import Panel from "@/pages/Panel"
import Ruta from "@/pages/Ruta"
import Stock from "@/pages/Stock"
import Clientes from "@/pages/Clientes"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Panel />} />
            <Route path="/ruta" element={<Ruta />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/clientes" element={<Clientes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
