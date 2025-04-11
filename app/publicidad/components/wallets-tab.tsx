"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import NewWalletDialog from "./new-wallet-dialog"

interface Wallet {
  id: string
  name: string
  account_number: string
  balance: number
  currency: string
  portfolioCount: number
  created_at: string
  updated_at: string
}

export default function WalletsTab() {
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewDialog, setShowNewDialog] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchWallets()
  }, [])

  const fetchWallets = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/wallets")
      if (!response.ok) {
        throw new Error("Error al cargar wallets")
      }
      const data = await response.json()
      setWallets(data)
    } catch (err) {
      console.error("Error fetching wallets:", err)
      setError(err instanceof Error ? err.message : "Error desconocido")
      toast({
        title: "Error",
        description: "No se pudieron cargar las wallets",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = (newItem: Wallet) => {
    setWallets((prev) => [...prev, newItem])
    setShowNewDialog(false)
    toast({
      title: "Wallet creada",
      description: `La wallet "${newItem.name}" ha sido creada exitosamente`,
    })
  }

  // Filtrar según el término de búsqueda
  const filteredItems = wallets.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.account_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.currency.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Formatear el balance con el símbolo de la moneda
  const formatBalance = (balance: number, currency: string) => {
    const formatter = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: currency,
    })
    return formatter.format(balance)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Wallets</CardTitle>
          <CardDescription>Gestión de billeteras y tarjetas para portfolios</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar wallets..."
              className="pl-8 w-[200px] md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button size="sm" onClick={() => setShowNewDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Wallet
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
            <span>Cargando wallets...</span>
          </div>
        ) : error ? (
          <div className="p-4 border border-red-300 bg-red-50 rounded-md text-red-800">
            <h3 className="font-bold mb-2">Error</h3>
            <p>{error}</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={fetchWallets}>
              Reintentar
            </Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Número de Cuenta</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Portfolios</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                      No se encontraron wallets.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.account_number || "—"}</TableCell>
                      <TableCell>{formatBalance(item.balance, item.currency)}</TableCell>
                      <TableCell>{item.portfolioCount}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={item.portfolioCount > 0}
                            className={item.portfolioCount > 0 ? "opacity-50 cursor-not-allowed" : ""}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      <NewWalletDialog open={showNewDialog} onOpenChange={setShowNewDialog} onWalletCreated={handleCreate} />
    </Card>
  )
}
