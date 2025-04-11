import { type NextRequest, NextResponse } from "next/server"
import { PortfolioService } from "@/lib/services/portfolio-service"

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const portfolio = await PortfolioService.getPortfolioById(params.id)

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio no encontrado" }, { status: 404 })
    }

    const businessManagerCount = await PortfolioService.getBusinessManagerCount(portfolio.id)
    const totalSpend = await PortfolioService.getPortfolioTotalSpend(portfolio.id)

    return NextResponse.json({
      ...portfolio,
      businessManagerCount,
      totalSpend,
    })
  } catch (error) {
    console.error(`Error fetching portfolio with ID ${params.id}:`, error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno del servidor" },
      { status: 500 },
    )
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const portfolio = await PortfolioService.updatePortfolio(params.id, {
      name: body.name,
      account_id: body.account_id,
      spend_limit: body.spend_limit,
      status: body.status,
      wallet_id: body.wallet_id,
    })

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio no encontrado o error al actualizar" }, { status: 404 })
    }

    return NextResponse.json(portfolio)
  } catch (error) {
    console.error(`Error updating portfolio with ID ${params.id}:`, error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno del servidor" },
      { status: 500 },
    )
  }
}
