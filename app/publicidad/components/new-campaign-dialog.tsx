"use client"

import type React from "react"

import { useState, useEffect } from "react"
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

interface BusinessManager {
  id: string
  name: string
}

interface NewCampaignDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated: (campaign: any) => void
}

export default function NewCampaignDialog({ open, onOpenChange, onCreated }: NewCampaignDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    business_manager_id: "",
    objective: "",
    status: "active",
  })
  const [loading, setLoading] = useState(false)
  const [businessManagers, setBusinessManagers] = useState<BusinessManager[]>([])
  const [loadingBusinessManagers, setLoadingBusinessManagers] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (open) {
      fetchBusinessManagers()
    }
  }, [open])

  const fetchBusinessManagers = async () => {
    setLoadingBusinessManagers(true)
    try {
      const response = await fetch("/api/business-managers")
      if (!response.ok) {
        throw new Error("Error al cargar business managers")
      }
      const data = await response.json()
      setBusinessManagers(data)
    } catch (error) {
      console.error("Error fetching business managers:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los business managers",
        variant: "destructive",
      })
    } finally {
      setLoadingBusinessManagers(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al crear la campaña")
      }

      const campaign = await response.json()
      onCreated(campaign)

      // Resetear el formulario
      setFormData({
        name: "",
        business_manager_id: "",
        objective: "",
        status: "active",
      })
    } catch (error) {
      console.error("Error creating campaign:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo crear la campaña",
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
            <DialogTitle>Crear Nueva Campaña</DialogTitle>
            <DialogDescription>Completa los detalles para crear una nueva campaña publicitaria.</DialogDescription>
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
              <Label htmlFor="business_manager_id" className="text-right">
                Business Manager
              </Label>
              <Select
                value={formData.business_manager_id}
                onValueChange={(value) => handleChange("business_manager_id", value)}
                disabled={loadingBusinessManagers}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={loadingBusinessManagers ? "Cargando..." : "Seleccionar BM"} />
                </SelectTrigger>
                <SelectContent>
                  {businessManagers.map((bm) => (
                    <SelectItem key={bm.id} value={bm.id}>
                      {bm.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="objective" className="text-right">
                Objetivo
              </Label>
              <Select value={formData.objective} onValueChange={(value) => handleChange("objective", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar objetivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CONVERSIONS">Conversiones</SelectItem>
                  <SelectItem value="TRAFFIC">Tráfico</SelectItem>
                  <SelectItem value="ENGAGEMENT">Interacción</SelectItem>
                  <SelectItem value="LEADS">Generación de Leads</SelectItem>
                  <SelectItem value="AWARENESS">Reconocimiento</SelectItem>
                </SelectContent>
              </Select>
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
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                  <SelectItem value="paused">Pausado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading || loadingBusinessManagers}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando...
                </>
              ) : (
                "Crear Campaña"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
