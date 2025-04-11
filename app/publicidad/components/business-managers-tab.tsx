"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import NewBusinessManagerDialog from "./new-business-manager-dialog"

interface BusinessManager {
  id: string
  name: string
  accountId: string
  status: string
  portfolioId: string
  activeCampaignsCount: number
  created_at: string
  updated_at: string
}

interface Portfolio {
  id: string
  name: string
}

export default function BusinessManagersTab() {
  const [businessManagers, setBusinessManagers] = useState<BusinessManager[]>([])
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewDialog, setShowNewDialog] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchBusinessManagers()
    fetchPortfolios()
  }, [])

  const fetchBusinessManagers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/business-managers")
      if (!response.ok) {
        throw new Error("Error al cargar business managers")
      }
      const data = await response.json()
      setBusinessManagers(data)
    } catch (err) {
      console.error("Error fetching business managers:", err)
      setError(err instanceof Error ? err.message : "Error desconocido")
      toast({
        title: "Error",
        description: "No se pudieron cargar los business managers",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchPortfolios = async () => {
    try {
      const response = await fetch("/api/portfolios")
      if (!response.ok) {
        throw new Error("Error al cargar portfolios")
      }
      const data = await response.json()
      setPortfolios(data)
    } catch (err) {
      console.error("Error fetching portfolios:", err)
      toast({
        title: "Error",
        description: "No se pudieron cargar los portfolios",
        variant: "destructive",
      })
    }
  }

  const handleCreateBusinessManager = (newBusinessManager: BusinessManager) => {
    setBusinessManagers([...businessManagers, newBusinessManager])
    setShowNewDialog(false)
    toast({
      title: "Business Manager creado",
      description: `El business manager "${newBusinessManager.name}" ha sido creado exitosamente`,
    })
  }

  // Filtrar business managers según el término de búsqueda
  const filteredBusinessManagers = businessManagers.filter(
    (bm) =>
      bm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bm.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bm.accountId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Obtener el nombre del portfolio para un business manager
  const getPortfolioName = (portfolioId: string) => {
    const portfolio = portfolios.find((p) => p.id === portfolioId)
    return portfolio ? portfolio.name : "Desconocido"
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Business Managers</CardTitle>
          <CardDescription>Gestión de business managers vinculados a portfolios</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar business managers..."
              className="pl-8 w-[200px] md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button size="sm" onClick={() => setShowNewDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Business Manager
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
            <span>Cargando business managers...</span>
          </div>
        ) : error ? (
          <div className="p-4 border border-red-300 bg-red-50 rounded-md text-red-800">
            <h3 className="font-bold mb-2">Error</h3>
            <p>{error}</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={fetchBusinessManagers}>
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
                  <TableHead>Account ID</TableHead>
                  <TableHead>Portfolio</TableHead>
                  <TableHead>Campañas Activas</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBusinessManagers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                      No se encontraron business managers.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBusinessManagers.map((bm) => (
                    <TableRow key={bm.id}>
                      <TableCell className="font-medium">{bm.name}</TableCell>
                      <TableCell>{bm.id}</TableCell>
                      <TableCell>{bm.accountId}</TableCell>
                      <TableCell>{getPortfolioName(bm.portfolioId)}</TableCell>
                      <TableCell>{bm.activeCampaignsCount}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            bm.status === "active"
                              ? "bg-green-100 text-green-800"
                              : bm.status === "inactive"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {bm.status === "active" ? "Activo" : bm.status === "inactive" ? "Inactivo" : "Limitado"}
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

      <NewBusinessManagerDialog
        open={showNewDialog}
        onOpenChange={setShowNewDialog}
        onBusinessManagerCreated={handleCreateBusinessManager}
        portfolios={portfolios}
      />
    </Card>
  )
}
