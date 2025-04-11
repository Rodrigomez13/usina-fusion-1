"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import NewAdDialog from "./new-ad-dialog"

interface Ad {
  ad_id: string
  ad_name: string
  ad_status: string
  ad_set_id: string
  ad_set_name: string
  campaign_id: string
  campaign_name: string
  business_manager_id: string
  business_manager_name: string
  portfolio_id: string
  portfolio_name: string
}

export default function AdsTab() {
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewDialog, setShowNewDialog] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchAds()
  }, [])

  const fetchAds = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/ads?withHierarchy=true")
      if (!response.ok) {
        throw new Error("Error al cargar anuncios")
      }
      const data = await response.json()
      setAds(data)
    } catch (err) {
      console.error("Error fetching ads:", err)
      setError(err instanceof Error ? err.message : "Error desconocido")
      toast({
        title: "Error",
        description: "No se pudieron cargar los anuncios",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = (newItem: any) => {
    // Aquí necesitaríamos obtener la jerarquía completa del anuncio
    // Por simplicidad, recargaremos todos los anuncios
    fetchAds()
    setShowNewDialog(false)
    toast({
      title: "Anuncio creado",
      description: `El anuncio "${newItem.name}" ha sido creado exitosamente`,
    })
  }

  // Filtrar según el término de búsqueda
  const filteredItems = ads.filter(
    (item) =>
      (item.ad_name && item.ad_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.ad_id && item.ad_id.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Anuncios</CardTitle>
          <CardDescription>Gestión de anuncios individuales para activar en servidores</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar anuncios..."
              className="pl-8 w-[200px] md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button size="sm" onClick={() => setShowNewDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Anuncio
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
            <span>Cargando anuncios...</span>
          </div>
        ) : error ? (
          <div className="p-4 border border-red-300 bg-red-50 rounded-md text-red-800">
            <h3 className="font-bold mb-2">Error</h3>
            <p>{error}</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={fetchAds}>
              Reintentar
            </Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Conjunto</TableHead>
                  <TableHead>Campaña</TableHead>
                  <TableHead>BM</TableHead>
                  <TableHead>Rendimiento Histórico</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                      No se encontraron anuncios.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                    <TableRow key={item.ad_id}>
                      <TableCell className="font-medium">{item.ad_id}</TableCell>
                      <TableCell>{item.ad_name}</TableCell>
                      <TableCell>{item.ad_set_name}</TableCell>
                      <TableCell>{item.campaign_name}</TableCell>
                      <TableCell>{item.business_manager_name}</TableCell>
                      <TableCell>
                        <div className="text-xs">
                          <div>Leads: {Math.floor(Math.random() * 1000)}</div>
                          <div>Cargas: {Math.floor(Math.random() * 500)}</div>
                          <div>Conversión: {Math.floor(Math.random() * 100)}%</div>
                          <div>Costo por Lead: ${(Math.random() * 5).toFixed(2)}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.ad_status === "active"
                              ? "bg-green-100 text-green-800"
                              : item.ad_status === "inactive"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {item.ad_status === "active"
                            ? "Activo"
                            : item.ad_status === "inactive"
                              ? "Inactivo"
                              : "Pausado"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Activar en Servidor
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

      <NewAdDialog open={showNewDialog} onOpenChange={setShowNewDialog} onCreated={handleCreate} />
    </Card>
  )
}
