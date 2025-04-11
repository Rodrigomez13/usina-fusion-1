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

interface AdSet {
  id: string
  name: string
}

interface NewAdDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated: (ad: any) => void
}

export default function NewAdDialog({ open, onOpenChange, onCreated }: NewAdDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    ad_set_id: "",
    creative_url: "",
    status: "active",
  })
  const [loading, setLoading] = useState(false)
  const [adSets, setAdSets] = useState<AdSet[]>([])
  const [loadingAdSets, setLoadingAdSets] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (open) {
      fetchAdSets()
    }
  }, [open])

  const fetchAdSets = async () => {
    setLoadingAdSets(true)
    try {
      const response = await fetch("/api/ad-sets")
      if (!response.ok) {
        throw new Error("Error al cargar conjuntos de anuncios")
      }
      const data = await response.json()
      setAdSets(data)
    } catch (error) {
      console.error("Error fetching ad sets:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los conjuntos de anuncios",
        variant: "destructive",
      })
    } finally {
      setLoadingAdSets(false)
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
      const response = await fetch("/api/ads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al crear el anuncio")
      }

      const ad = await response.json()
      onCreated(ad)

      // Resetear el formulario
      setFormData({
        name: "",
        ad_set_id: "",
        creative_url: "",
        status: "active",
      })
    } catch (error) {
      console.error("Error creating ad:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo crear el anuncio",
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
            <DialogTitle>Crear Nuevo Anuncio</DialogTitle>
            <DialogDescription>Completa los detalles para crear un nuevo anuncio.</DialogDescription>
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
              <Label htmlFor="ad_set_id" className="text-right">
                Conjunto
              </Label>
              <Select
                value={formData.ad_set_id}
                onValueChange={(value) => handleChange("ad_set_id", value)}
                disabled={loadingAdSets}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={loadingAdSets ? "Cargando..." : "Seleccionar conjunto"} />
                </SelectTrigger>
                <SelectContent>
                  {adSets.map((adSet) => (
                    <SelectItem key={adSet.id} value={adSet.id}>
                      {adSet.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="creative_url" className="text-right">
                URL Creativo
              </Label>
              <Input
                id="creative_url"
                value={formData.creative_url}
                onChange={(e) => handleChange("creative_url", e.target.value)}
                className="col-span-3"
                placeholder="https://ejemplo.com/imagen.jpg"
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
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                  <SelectItem value="paused">Pausado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading || loadingAdSets}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando...
                </>
              ) : (
                "Crear Anuncio"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
