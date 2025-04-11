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

interface Campaign {
  id: string
  name: string
}

interface NewAdSetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated: (adSet: any) => void
}

export default function NewAdSetDialog({ open, onOpenChange, onCreated }: NewAdSetDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    campaign_id: "",
    status: "active",
  })
  const [loading, setLoading] = useState(false)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loadingCampaigns, setLoadingCampaigns] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (open) {
      fetchCampaigns()
    }
  }, [open])

  const fetchCampaigns = async () => {
    setLoadingCampaigns(true)
    try {
      const response = await fetch("/api/campaigns")
      if (!response.ok) {
        throw new Error("Error al cargar campañas")
      }
      const data = await response.json()
      setCampaigns(data)
    } catch (error) {
      console.error("Error fetching campaigns:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar las campañas",
        variant: "destructive",
      })
    } finally {
      setLoadingCampaigns(false)
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
      const response = await fetch("/api/ad-sets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al crear el conjunto de anuncios")
      }

      const adSet = await response.json()
      onCreated(adSet)

      // Resetear el formulario
      setFormData({
        name: "",
        campaign_id: "",
        status: "active",
      })
    } catch (error) {
      console.error("Error creating ad set:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo crear el conjunto de anuncios",
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
            <DialogTitle>Crear Nuevo Conjunto de Anuncios</DialogTitle>
            <DialogDescription>Completa los detalles para crear un nuevo conjunto de anuncios.</DialogDescription>
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
              <Label htmlFor="campaign_id" className="text-right">
                Campaña
              </Label>
              <Select
                value={formData.campaign_id}
                onValueChange={(value) => handleChange("campaign_id", value)}
                disabled={loadingCampaigns}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={loadingCampaigns ? "Cargando..." : "Seleccionar campaña"} />
                </SelectTrigger>
                <SelectContent>
                  {campaigns.map((campaign) => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </SelectItem>
                  ))}
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
            <Button type="submit" disabled={loading || loadingCampaigns}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando...
                </>
              ) : (
                "Crear Conjunto de Anuncios"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
