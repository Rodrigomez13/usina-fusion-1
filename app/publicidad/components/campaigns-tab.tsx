"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import NewCampaignDialog from "./new-campaign-dialog"

interface Campaign {
  id: string
  name: string
  business_manager_id: string
  objective: string
  status: string
  created_at: string
  updated_at: string
}

export default function CampaignsTab() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewDialog, setShowNewDialog] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/campaigns")
      if (!response.ok) {
        throw new Error("Error al cargar campañas")
      }
      const data = await response.json()
      setCampaigns(data)
    } catch (err) {
      console.error("Error fetching campaigns:", err)
      setError(err instanceof Error ? err.message : "Error desconocido")
      toast({
        title: "Error",
        description: "No se pudieron cargar las campañas",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = (newItem: Campaign) => {
    setCampaigns([...campaigns, newItem])
    setShowNewDialog(false)
    toast({
      title: "Campaña creada",
      description: `La campaña "${newItem.name}" ha sido creada exitosamente`,
    })
  }

  // Filtrar según el término de búsqueda
  const filteredItems = campaigns.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Campañas</CardTitle>
          <CardDescription>Gestión de campañas publicitarias</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar campañas..."
              className="pl-8 w-[200px] md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button size="sm" onClick={() => setShowNewDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Campaña
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
            <span>Cargando campañas...</span>
          </div>
        ) : error ? (
          <div className="p-4 border border-red-300 bg-red-50 rounded-md text-red-800">
            <h3 className="font-bold mb-2">Error</h3>
            <p>{error}</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={fetchCampaigns}>
              Reintentar
            </Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Business Manager</TableHead>
                  <TableHead>Objetivo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      No se encontraron campañas.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.business_manager_id}</TableCell>
                      <TableCell>{item.objective}</TableCell>
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
                          {item.status === "active" ? "Activo" : item.status === "inactive" ? "Inactivo" : "Pausado"}
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

      <NewCampaignDialog open={showNewDialog} onOpenChange={setShowNewDialog} onCreated={handleCreate} />
    </Card>
  )
}
