import { type NextRequest, NextResponse } from "next/server"
import { WalletService } from "@/lib/services/wallet-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const wallet = await WalletService.getWalletById(params.id)

    if (!wallet) {
      return NextResponse.json({ error: "Wallet no encontrada" }, { status: 404 })
    }

    // Obtener información adicional
    const portfolioCount = await WalletService.getPortfolioCount(wallet.id)

    return NextResponse.json({
      ...wallet,
      portfolioCount,
    })
  } catch (error) {
    console.error(`Error fetching wallet with ID ${params.id}:`, error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno del servidor" },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const wallet = await WalletService.updateWallet(params.id, {
      name: body.name,
      account_number: body.account_number,
      balance: body.balance,
      currency: body.currency,
    })

    if (!wallet) {
      return NextResponse.json({ error: "Wallet no encontrada o error al actualizar" }, { status: 404 })
    }

    return NextResponse.json(wallet)
  } catch (error) {
    console.error(`Error updating wallet with ID ${params.id}:`, error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno del servidor" },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verificar si hay portfolios asociados
    const portfolioCount = await WalletService.getPortfolioCount(params.id)

    if (portfolioCount > 0) {
      return NextResponse.json(
        { error: `No se puede eliminar la wallet porque tiene ${portfolioCount} portfolios asociados` },
        { status: 400 },
      )
    }

    const supabase = createServerSupabaseClient()
    const { error } = await supabase.from("wallets").delete().eq("id", params.id)

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting wallet with ID ${params.id}:`, error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno del servidor" },
      { status: 500 },
    )
  }
}

// Importación necesaria para DELETE
import { createServerSupabaseClient } from "@/lib/supabase/server"
