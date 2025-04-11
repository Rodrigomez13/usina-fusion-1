import { type NextRequest, NextResponse } from "next/server"
import { AdService } from "@/lib/services/ad-service"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const adSetId = searchParams.get("adSetId")
    const withHierarchy = searchParams.get("withHierarchy") === "true"

    if (withHierarchy) {
      const adsWithHierarchy = await AdService.getAdsWithHierarchy()
      return NextResponse.json(adsWithHierarchy)
    }

    let ads
    if (adSetId) {
      ads = await AdService.getAdsByAdSet(adSetId)
    } else {
      ads = await AdService.getAds()
    }

    return NextResponse.json(ads)
  } catch (error) {
    console.error("Error fetching ads:", error)
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
    if (!body.name || !body.ad_set_id) {
      return NextResponse.json({ error: "Nombre y ad_set_id son requeridos" }, { status: 400 })
    }

    const ad = await AdService.createAd({
      name: body.name,
      ad_set_id: body.ad_set_id,
      creative_url: body.creative_url,
      status: body.status || "active",
    })

    if (!ad) {
      return NextResponse.json({ error: "Error al crear el anuncio" }, { status: 500 })
    }

    return NextResponse.json(ad, { status: 201 })
  } catch (error) {
    console.error("Error creating ad:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno del servidor" },
      { status: 500 },
    )
  }
}
