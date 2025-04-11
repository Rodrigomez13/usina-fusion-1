import { type NextRequest, NextResponse } from "next/server"
import { CampaignService } from "@/lib/services/campaign-service"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const businessManagerId = searchParams.get("businessManagerId")

    let campaigns
    if (businessManagerId) {
      campaigns = await CampaignService.getCampaignsByBusinessManager(businessManagerId)
    } else {
      campaigns = await CampaignService.getCampaigns()
    }

    return NextResponse.json(campaigns)
  } catch (error) {
    console.error("Error fetching campaigns:", error)
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
    if (!body.name || !body.business_manager_id || !body.objective) {
      return NextResponse.json({ error: "Nombre, business_manager_id y objective son requeridos" }, { status: 400 })
    }

    const campaign = await CampaignService.createCampaign({
      name: body.name,
      business_manager_id: body.business_manager_id,
      objective: body.objective,
      status: body.status || "active",
    })

    if (!campaign) {
      return NextResponse.json({ error: "Error al crear la campaña" }, { status: 500 })
    }

    return NextResponse.json(campaign, { status: 201 })
  } catch (error) {
    console.error("Error creating campaign:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno del servidor" },
      { status: 500 },
    )
  }
}
