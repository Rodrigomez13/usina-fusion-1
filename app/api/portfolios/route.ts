import { type NextRequest, NextResponse } from "next/server"
import { PortfolioService } from "@/lib/services/portfolio-service"

export async function GET() {
  try {
    const portfolios = await PortfolioService.getPortfolios()

    // Para cada portfolio, obtener información adicional
    const portfoliosWithDetails = await Promise.all(
      portfolios.map(async (portfolio) => {
        const businessManagerCount = await PortfolioService.getBusinessManagerCount(portfolio.id)
        const totalSpend = await PortfolioService.getPortfolioTotalSpend(portfolio.id)

        return {
          ...portfolio,
          businessManagerCount,
          totalSpend,
        }
      }),
    )

    return NextResponse.json(portfoliosWithDetails)
  } catch (error) {
    console.error("Error fetching portfolios:", error)
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
    if (!body.name || !body.status) {
      return NextResponse.json({ error: "Nombre y estado son requeridos" }, { status: 400 })
    }

    const portfolio = await PortfolioService.createPortfolio({
      name: body.name,
      account_id: body.account_id,
      spend_limit: body.spend_limit,
      status: body.status,
      wallet_id: body.wallet_id,
    })

    if (!portfolio) {
      return NextResponse.json({ error: "Error al crear el portfolio" }, { status: 500 })
    }

    return NextResponse.json(portfolio, { status: 201 })
  } catch (error) {
    console.error("Error creating portfolio:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno del servidor" },
      { status: 500 },
    )
  }
}
