"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Wallet {
  id: string
  name: string
  account_number: string
  balance: number
  currency: string
}

interface Portfolio {
  id: string
  name: string
  account_id: string
  spend_limit: number
  status: string
  wallet_id: string | null
  created_at: string
  updated_at: string
}

interface NewPortfolioDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated: (portfolio: Portfolio) => void
}

export default function NewPortfolioDialog({ open, onOpenChange, onCreated }: NewPortfolioDialogProps) {
  const [name, setName] = useState("")
  const [accountId, setAccountId] = useState("")
  const [spendLimit, setSpendLimit] = useState("")
  const [status, setStatus] = useState("active")
  const [walletId, setWalletId] = useState("")
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingWallets, setIsLoadingWallets] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (open) {
      fetchWallets()
    }
  }, [open])

  const fetchWallets = async () => {
    setIsLoadingWallets(true)
    try {
      const response = await fetch("/api/wallets")
      if (!response.ok) {
        throw new Error("Error al cargar wallets")
      }
      const data = await response.json()
      setWallets(data)
    } catch (err) {
      console.error("Error fetching wallets:", err)
      toast({
        title: "Error",
        description: "No se pudieron cargar las wallets",
        variant: "destructive",
      })
    } finally {
      setIsLoadingWallets(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/portfolios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          account_id: accountId,
          spend_limit: Number.parseFloat(spendLimit),
          status,
          wallet_id: walletId || null,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al crear el portfolio")
      }

      const newPortfolio = await response.json()
      onCreated(newPortfolio)
      resetForm()
    } catch (error) {
      console.error("Error creating portfolio:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al crear el portfolio",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setName("")
    setAccountId("")
    setSpendLimit("")
    setStatus("active")
    setWalletId("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Portfolio</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre del portfolio"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="accountId">ID de Cuenta</Label>
              <Input
                id="accountId"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                placeholder="ID de la cuenta publicitaria"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="spendLimit">Límite de Gasto</Label>
              <Input
                id="spendLimit"
                type="number"
                step="0.01"
                value={spendLimit}
                onChange={(e) => setSpendLimit(e.target.value)}
                placeholder="Límite de gasto diario"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="wallet">Wallet Asociada</Label>
              <Select value={walletId} onValueChange={setWalletId}>
                <SelectTrigger id="wallet">
                  <SelectValue placeholder="Seleccionar wallet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Ninguna</SelectItem>
                  {isLoadingWallets ? (
                    <SelectItem value="loading" disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                      Cargando wallets...
                    </SelectItem>
                  ) : wallets.length === 0 ? (
                    <SelectItem value="empty" disabled>
                      No hay wallets disponibles
                    </SelectItem>
                  ) : (
                    wallets.map((wallet) => (
                      <SelectItem key={wallet.id} value={wallet.id}>
                        {wallet.name} ({wallet.currency})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Estado</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="paused">Pausado</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm()
                onOpenChange(false)
              }}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando...
                </>
              ) : (
                "Crear Portfolio"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
