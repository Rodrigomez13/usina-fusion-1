import { type NextRequest, NextResponse } from "next/server"
import { BusinessManagerService } from "@/lib/services/business-manager-service"

export async function GET() {
  try {
    const businessManagers = await BusinessManagerService.getBusinessManagers()

    // Para cada business manager, obtener información adicional
    const businessManagersWithDetails = await Promise.all(
      businessManagers.map(async (bm) => {
        const activeCampaignsCount = await BusinessManagerService.getActiveCampaignsCount(bm.id)
        const portfolioId = await BusinessManagerService.getPortfolioForBusinessManager(bm.id)

        return {
          ...bm,
          activeCampaignsCount,
          portfolioId,
        }
      }),
    )

    return NextResponse.json(businessManagersWithDetails)
  } catch (error) {
    console.error("Error fetching business managers:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno del servidor" },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar los datos de entrada
    if (!body.name || !body.portfolio_id || !body.accountId) {
      return NextResponse.json({ error: "Nombre, portfolio_id y accountId son requeridos" }, { status: 400 })
    }

    const businessManager = await BusinessManagerService.createBusinessManager({
      name: body.name,
      portfolio_id: body.portfolio_id,
      accountId: body.accountId,
      status: body.status || "active",
    })

    if (!businessManager) {
      return NextResponse.json({ error: "Error al crear el business manager" }, { status: 500 })
    }

    return NextResponse.json(businessManager, { status: 201 })
  } catch (error) {
    console.error("Error creating business manager:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno del servidor" },
      { status: 500 },
    )
  }
}
