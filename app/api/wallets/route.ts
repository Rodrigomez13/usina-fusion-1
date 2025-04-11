import { type NextRequest, NextResponse } from "next/server"
import { WalletService } from "@/lib/services/wallet-service"

export async function GET() {
  try {
    const wallets = await WalletService.getWallets()

    // Para cada wallet, obtener información adicional
    const walletsWithDetails = await Promise.all(
      wallets.map(async (wallet) => {
        const portfolioCount = await WalletService.getPortfolioCount(wallet.id)

        return {
          ...wallet,
          portfolioCount,
        }
      }),
    )

    return NextResponse.json(walletsWithDetails)
  } catch (error) {
    console.error("Error fetching wallets:", error)
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
    if (!body.name) {
      return NextResponse.json({ error: "El nombre es requerido" }, { status: 400 })
    }

    console.log("Datos recibidos para crear wallet:", JSON.stringify(body, null, 2))

    const wallet = await WalletService.createWallet({
      name: body.name,
      account_number: body.account_number || "",
      balance: body.balance || 0,
      currency: body.currency || "USD",
    })

    if (!wallet) {
      return NextResponse.json({ error: "Error al crear la wallet" }, { status: 500 })
    }

    return NextResponse.json(wallet, { status: 201 })
  } catch (error) {
    console.error("Error creating wallet:", error)

    // Verificar si es un error de Supabase y extraer el mensaje
    if (error && typeof error === "object" && "message" in error) {
      const errorMessage = String(error.message)

      // Si es un error de RLS, dar instrucciones más claras
      if (errorMessage.includes("row-level security") || errorMessage.includes("42501")) {
        return NextResponse.json(
          {
            error: "Error de permisos en Supabase. Necesitas configurar las políticas RLS para la tabla wallets.",
            details: errorMessage,
          },
          { status: 403 },
        )
      }

      return NextResponse.json({ error: errorMessage }, { status: 500 })
    }

    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
