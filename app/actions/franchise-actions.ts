"use server"

import { FranchiseService } from "@/lib/services/franchise-service"
import { revalidatePath } from "next/cache"

export async function registerLeadDistribution(
  franchiseId: string,
  franchisePhoneId: string,
  leadsCount: number,
  serverId: string,
) {
  try {
    const result = await FranchiseService.registerLeadDistribution(franchiseId, franchisePhoneId, leadsCount, serverId)

    if (!result) {
      return {
        success: false,
        message: "Error al registrar la distribución de leads",
      }
    }

    // Revalidar las rutas que muestran datos de distribución de leads
    revalidatePath("/leads")
    revalidatePath("/franquicias")

    return {
      success: true,
      message: "Distribución de leads registrada correctamente",
      id: result,
    }
  } catch (error) {
    console.error("Error en server action registerLeadDistribution:", error)
    return {
      success: false,
      message: "Error al registrar la distribución de leads",
    }
  }
}

export async function createFranchisePhone(
  franchiseId: string,
  number: string,
  order: number,
  dailyGoal: number,
  status = "active",
) {
  try {
    const result = await FranchiseService.createFranchisePhone({
      franchise_id: franchiseId,
      number,
      order,
      daily_goal: dailyGoal,
      status,
    })

    if (!result) {
      return {
        success: false,
        message: "Error al crear el teléfono de franquicia",
      }
    }

    // Revalidar las rutas que muestran datos de franquicias
    revalidatePath("/franquicias")

    return {
      success: true,
      message: "Teléfono de franquicia creado correctamente",
      phone: result,
    }
  } catch (error) {
    console.error("Error en server action createFranchisePhone:", error)
    return {
      success: false,
      message: "Error al crear el teléfono de franquicia",
    }
  }
}
