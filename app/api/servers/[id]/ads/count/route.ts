import { NextResponse } from "next/server"
import { ServerService } from "@/lib/services/server-service"

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const activeAds = await ServerService.getActiveServerAds(params.id)
    return NextResponse.json({ count: activeAds.length })
  } catch (error) {
    console.error("Error fetching active ads count:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno del servidor", count: 0 },
      { status: 500 },
    )
  }
}
