"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import NewPortfolioDialog from "./new-portfolio-dialog"

interface Portfolio {
  id: string
  name: string
  description?: string
  card_info?: string
  status: string
  businessManagerCount: number
  totalSpend: number
  created_at: string
  updated_at: string
}

export default function PortfoliosTab() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewPortfolioDialog, setShowNewPortfolioDialog] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchPortfolios()
  }, [])

  const fetchPortfolios = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/portfolios")
      if (!response.ok) {
        throw new Error("Error al cargar portfolios")
      }
      const data = await response.json()
      setPortfolios(data)
    } catch (err) {
      console.error("Error fetching portfolios:", err)
      setError(err instanceof Error ? err.message : "Error desconocido")
      toast({
        title: "Error",
        description: "No se pudieron cargar los portfolios",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePortfolio = (newPortfolio: Portfolio) => {
    setPortfolios([...portfolios, newPortfolio])
    setShowNewPortfolioDialog(false)
    toast({
      title: "Portfolio creado",
      description: `El portfolio "${newPortfolio.name}" ha sido creado exitosamente`,
    })
  }

  // Filtrar portfolios según el término de búsqueda
  const filteredPortfolios = portfolios.filter(
    (portfolio) =>
      portfolio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      portfolio.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Portfolios Publicitarios</CardTitle>
          <CardDescription>Gestión de portfolios con tarjetas vinculadas para gastos</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar portfolios..."
              className="pl-8 w-[200px] md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button size="sm" onClick={() => setShowNewPortfolioDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Portfolio
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
            <span>Cargando portfolios...</span>
          </div>
        ) : error ? (
          <div className="p-4 border border-red-300 bg-red-50 rounded-md text-red-800">
            <h3 className="font-bold mb-2">Error</h3>
            <p>{error}</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={fetchPortfolios}>
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
                  <TableHead>Información de Tarjeta</TableHead>
                  <TableHead>Business Managers</TableHead>
                  <TableHead>Gasto Total</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPortfolios.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                      No se encontraron portfolios.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPortfolios.map((portfolio) => (
                    <TableRow key={portfolio.id}>
                      <TableCell className="font-medium">{portfolio.name}</TableCell>
                      <TableCell>{portfolio.id}</TableCell>
                      <TableCell>{portfolio.card_info || "****"}</TableCell>
                      <TableCell>{portfolio.businessManagerCount}</TableCell>
                      <TableCell>${portfolio.totalSpend.toFixed(2)}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            portfolio.status === "active"
                              ? "bg-green-100 text-green-800"
                              : portfolio.status === "inactive"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {portfolio.status === "active"
                            ? "Activo"
                            : portfolio.status === "inactive"
                              ? "Inactivo"
                              : "Limitado"}
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

      <NewPortfolioDialog
        open={showNewPortfolioDialog}
        onOpenChange={setShowNewPortfolioDialog}
        onPortfolioCreated={handleCreatePortfolio}
      />
    </Card>
  )
}
