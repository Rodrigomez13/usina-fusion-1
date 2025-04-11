"use server"

import { ServerService } from "@/lib/services/server-service"
import { revalidatePath } from "next/cache"

export async function activateAdInServer(adId: string, apiId: string, dailyBudget: number, serverId: string) {
  try {
    const result = await ServerService.activateAdInServer(adId, apiId, dailyBudget, serverId)

    if (!result) {
      return {
        success: false,
        message: "Error al activar el anuncio en el servidor",
      }
    }

    // Revalidar las rutas que muestran datos de servidores
    revalidatePath("/")
    revalidatePath("/servidores")

    return {
      success: true,
      message: "Anuncio activado correctamente",
      id: result,
    }
  } catch (error) {
    console.error("Error en server action activateAdInServer:", error)
    return {
      success: false,
      message: "Error al activar el anuncio en el servidor",
    }
  }
}

export async function updateServerAdMetrics(serverAdId: string, leads: number, loads: number, spent: number) {
  try {
    const result = await ServerService.updateServerAdMetrics(serverAdId, leads, loads, spent)

    if (!result) {
      return {
        success: false,
        message: "Error al actualizar las métricas del anuncio",
      }
    }

    // Revalidar las rutas que muestran datos de servidores
    revalidatePath("/")
    revalidatePath("/servidores")

    return {
      success: true,
      message: "Métricas actualizadas correctamente",
    }
  } catch (error) {
    console.error("Error en server action updateServerAdMetrics:", error)
    return {
      success: false,
      message: "Error al actualizar las métricas del anuncio",
    }
  }
}

export async function deactivateServerAd(serverAdId: string) {
  try {
    const result = await ServerService.deactivateServerAd(serverAdId)

    if (!result) {
      return {
        success: false,
        message: "Error al desactivar el anuncio en el servidor",
      }
    }

    // Revalidar las rutas que muestran datos de servidores
    revalidatePath("/")
    revalidatePath("/servidores")

    return {
      success: true,
      message: "Anuncio desactivado correctamente",
    }
  } catch (error) {
    console.error("Error en server action deactivateServerAd:", error)
    return {
      success: false,
      message: "Error al desactivar el anuncio en el servidor",
    }
  }
}
