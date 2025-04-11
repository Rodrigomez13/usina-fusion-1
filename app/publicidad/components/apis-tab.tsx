"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import NewApiDialog from "./new-api-dialog"

interface API {
  id: string
  name: string
  token: string
  phone: string
  messages_per_day: number
  monthly_cost: number
  status: string
  created_at: string
  updated_at: string
}

export default function ApisTab() {
  const [apis, setApis] = useState<API[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewDialog, setShowNewDialog] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchApis()
  }, [])

  const fetchApis = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/apis")
      if (!response.ok) {
        throw new Error("Error al cargar APIs")
      }
      const data = await response.json()
      setApis(data)
    } catch (err) {
      console.error("Error fetching APIs:", err)
      setError(err instanceof Error ? err.message : "Error desconocido")
      toast({
        title: "Error",
        description: "No se pudieron cargar las APIs",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = (newItem: API) => {
    setApis([...apis, newItem])
    setShowNewDialog(false)
    toast({
      title: "API creada",
      description: `La API "${newItem.name}" ha sido creada exitosamente`,
    })
  }

  // Filtrar según el término de búsqueda
  const filteredItems = apis.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>APIs de WhatsApp</CardTitle>
          <CardDescription>Gestión de APIs para respuesta de mensajes</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar APIs..."
              className="pl-8 w-[200px] md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button size="sm" onClick={() => setShowNewDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva API
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
            <span>Cargando APIs...</span>
          </div>
        ) : error ? (
          <div className="p-4 border border-red-300 bg-red-50 rounded-md text-red-800">
            <h3 className="font-bold mb-2">Error</h3>
            <p>{error}</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={fetchApis}>
              Reintentar
            </Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Mensajes/Día</TableHead>
                  <TableHead>Costo Mensual</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                      No se encontraron APIs.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.token.substring(0, 10)}...</TableCell>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell>{item.messages_per_day}</TableCell>
                      <TableCell>${item.monthly_cost.toFixed(2)}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === "active"
                              ? "bg-green-100 text-green-800"
                              : item.status === "inactive"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {item.status === "active" ? "Activa" : item.status === "inactive" ? "Inactiva" : "Limitada"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Ver Detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      <NewApiDialog open={showNewDialog} onOpenChange={setShowNewDialog} onCreated={handleCreate} />
    </Card>
  )
}
