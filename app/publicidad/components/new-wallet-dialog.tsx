"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, AlertTriangle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

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

interface NewWalletDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onWalletCreated: (wallet: Wallet) => void
}

export default function NewWalletDialog({ open, onOpenChange, onWalletCreated }: NewWalletDialogProps) {
  const [name, setName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [balance, setBalance] = useState("0")
  const [currency, setCurrency] = useState("USD")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      console.log("Enviando datos para crear wallet:", {
        name,
        account_number: accountNumber,
        balance: Number.parseFloat(balance),
        currency,
      })

      const response = await fetch("/api/wallets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          account_number: accountNumber,
          balance: Number.parseFloat(balance),
          currency,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("Error response:", data)

        // Verificar si es un error de RLS
        if (data.error && (data.error.includes("row-level security") || response.status === 403)) {
          throw new Error(
            "Error de permisos en Supabase. Necesitas configurar las políticas RLS para la tabla wallets. " +
              (data.details || ""),
          )
        }

        throw new Error(data.error || "Error al crear la wallet")
      }

      // Añadir propiedades adicionales que normalmente vendrían de la API
      const walletWithDetails = {
        ...data,
        portfolioCount: 0,
      }

      onWalletCreated(walletWithDetails)
      resetForm()

      toast({
        title: "Éxito",
        description: "Wallet creada correctamente",
      })
    } catch (error) {
      console.error("Error creating wallet:", error)

      const errorMessage = error instanceof Error ? error.message : "Error al crear la wallet"
      setError(errorMessage)

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setName("")
    setAccountNumber("")
    setBalance("0")
    setCurrency("USD")
    setError(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Nueva Wallet</DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre de la wallet"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="accountNumber">Número de Cuenta</Label>
              <Input
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Número de cuenta o identificador"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="balance">Balance Inicial</Label>
                <Input
                  id="balance"
                  type="number"
                  step="0.01"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="currency">Moneda</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Seleccionar moneda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - Dólar Estadounidense</SelectItem>
                    <SelectItem value="ARS">ARS - Peso Argentino</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                "Crear Wallet"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
