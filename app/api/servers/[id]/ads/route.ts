import { type NextRequest, NextResponse } from "next/server"
import { ServerService } from "@/lib/services/server-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Asegurarnos de que params.id esté disponible antes de usarlo
    if (!params || !params.id) {
      return NextResponse.json({ error: "ID de servidor no proporcionado" }, { status: 400 })
    }

    const serverId = params.id
    console.log(`Obteniendo anuncios activos para servidor con ID: ${serverId}`)

    const activeAds = await ServerService.getActiveServerAds(serverId)
    return NextResponse.json(activeAds)
  } catch (error) {
    console.error("Error fetching active ads:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Error interno del servidor",
        details: error,
      },
      { status: 500 },
    )
  }
}
