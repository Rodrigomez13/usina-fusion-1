import { NextResponse } from "next/server"
import { ServerService } from "@/lib/services/server-service"

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    // Validar los datos de entrada
    if (!body.name || body.tax_coefficient === undefined) {
      return NextResponse.json({ error: "Nombre y coeficiente de impuesto son requeridos" }, { status: 400 })
    }

    // Actualizar el servidor
    const server = await ServerService.updateServer(params.id, {
      name: body.name,
      description: body.description,
      tax_coefficient: body.tax_coefficient,
      is_active: body.is_active,
    })

    if (!server) {
      return NextResponse.json({ error: "Error al actualizar el servidor o servidor no encontrado" }, { status: 404 })
    }

    return NextResponse.json(server)
  } catch (error) {
    console.error("Error updating server:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const server = await ServerService.getServerById(params.id)

    if (!server) {
      return NextResponse.json({ error: "Servidor no encontrado" }, { status: 404 })
    }

    return NextResponse.json(server)
  } catch (error) {
    console.error("Error fetching server:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    // Aquí implementarías la lógica para eliminar un servidor
    // Por ahora, solo devolvemos un mensaje de éxito
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting server:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
