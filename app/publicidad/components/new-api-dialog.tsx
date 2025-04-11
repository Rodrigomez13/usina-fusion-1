"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

interface NewApiDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated: (api: any) => void
}

export default function NewApiDialog({ open, onOpenChange, onCreated }: NewApiDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    token: "",
    phone: "",
    messages_per_day: 200,
    monthly_cost: 50,
    status: "active",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/apis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al crear la API")
      }

      const api = await response.json()
      onCreated(api)

      // Resetear el formulario
      setFormData({
        name: "",
        token: "",
        phone: "",
        messages_per_day: 200,
        monthly_cost: 50,
        status: "active",
      })
    } catch (error) {
      console.error("Error creating API:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo crear la API",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Crear Nueva API de WhatsApp</DialogTitle>
            <DialogDescription>Completa los detalles para crear una nueva API.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="token" className="text-right">
                Token
              </Label>
              <Input
                id="token"
                value={formData.token}
                onChange={(e) => handleChange("token", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Teléfono
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="col-span-3"
                placeholder="+54 9 11 12345678"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="messages_per_day" className="text-right">
                Mensajes/Día
              </Label>
              <Input
                id="messages_per_day"
                type="number"
                value={formData.messages_per_day}
                onChange={(e) => handleChange("messages_per_day", Number.parseInt(e.target.value))}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="monthly_cost" className="text-right">
                Costo Mensual
              </Label>
              <Input
                id="monthly_cost"
                type="number"
                step="0.01"
                value={formData.monthly_cost}
                onChange={(e) => handleChange("monthly_cost", Number.parseFloat(e.target.value))}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Estado
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activa</SelectItem>
                  <SelectItem value="inactive">Inactiva</SelectItem>
                  <SelectItem value="limited">Limitada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando...
                </>
              ) : (
                "Crear API"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
