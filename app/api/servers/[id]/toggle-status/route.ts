import { type NextRequest, NextResponse } from "next/server"
import { ServerService } from "@/lib/services/server-service"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const isActive = body.is_active

    if (isActive === undefined) {
      return NextResponse.json({ error: "El estado es requerido" }, { status: 400 })
    }

    const success = await ServerService.toggleServerStatus(params.id, isActive)

    if (!success) {
      return NextResponse.json({ error: "Error al cambiar el estado del servidor" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error toggling server status:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno del servidor" },
      { status: 500 },
    )
  }
}
