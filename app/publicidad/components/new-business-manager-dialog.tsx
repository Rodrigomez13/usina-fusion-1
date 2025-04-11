"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Portfolio {
  id: string
  name: string
}

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

interface NewBusinessManagerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBusinessManagerCreated: (businessManager: BusinessManager) => void
  portfolios: Portfolio[]
}

export default function NewBusinessManagerDialog({
  open,
  onOpenChange,
  onBusinessManagerCreated,
  portfolios,
}: NewBusinessManagerDialogProps) {
  const [name, setName] = useState("")
  const [accountId, setAccountId] = useState("")
  const [portfolioId, setPortfolioId] = useState("")
  const [status, setStatus] = useState("active")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/business-managers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          accountId,
          portfolio_id: portfolioId,
          status,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al crear el business manager")
      }

      const newBusinessManager = await response.json()

      // Añadir propiedades adicionales que normalmente vendrían de la API
      const businessManagerWithDetails = {
        ...newBusinessManager,
        portfolioId: newBusinessManager.portfolio_id,
        activeCampaignsCount: 0,
      }

      onBusinessManagerCreated(businessManagerWithDetails)
      resetForm()
    } catch (error) {
      console.error("Error creating business manager:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al crear el business manager",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setName("")
    setAccountId("")
    setPortfolioId("")
    setStatus("active")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Business Manager</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre del business manager"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="accountId">Account ID</Label>
              <Input
                id="accountId"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                placeholder="ID de la cuenta"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="portfolioId">Portfolio</Label>
              <Select value={portfolioId} onValueChange={setPortfolioId} required>
                <SelectTrigger id="portfolioId">
                  <SelectValue placeholder="Seleccionar portfolio" />
                </SelectTrigger>
                <SelectContent>
                  {portfolios.map((portfolio) => (
                    <SelectItem key={portfolio.id} value={portfolio.id}>
                      {portfolio.name}
                    </SelectItem>
                  ))}
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
                  <SelectItem value="inactive">Inactivo</SelectItem>
                  <SelectItem value="limited">Limitado</SelectItem>
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
                "Crear Business Manager"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
