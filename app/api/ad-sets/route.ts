import { type NextRequest, NextResponse } from "next/server"
import { AdSetService } from "@/lib/services/ad-set-service"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const campaignId = searchParams.get("campaignId")

    let adSets
    if (campaignId) {
      adSets = await AdSetService.getAdSetsByCampaign(campaignId)
    } else {
      adSets = await AdSetService.getAdSets()
    }

    return NextResponse.json(adSets)
  } catch (error) {
    console.error("Error fetching ad sets:", error)
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
    if (!body.name || !body.campaign_id) {
      return NextResponse.json({ error: "Nombre y campaign_id son requeridos" }, { status: 400 })
    }

    const adSet = await AdSetService.createAdSet({
      name: body.name,
      campaign_id: body.campaign_id,
      status: body.status || "active",
    })

    if (!adSet) {
      return NextResponse.json({ error: "Error al crear el conjunto de anuncios" }, { status: 500 })
    }

    return NextResponse.json(adSet, { status: 201 })
  } catch (error) {
    console.error("Error creating ad set:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno del servidor" },
      { status: 500 },
    )
  }
}
