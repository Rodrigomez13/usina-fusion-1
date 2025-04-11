import { type NextRequest, NextResponse } from "next/server"
import { FranchiseService } from "@/lib/services/franchise-service"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const serverId = searchParams.get("serverId") || "todos"
    const date = searchParams.get("date") || undefined

    console.log(`Fetching franchise distribution for serverId: ${serverId}, date: ${date || "all dates"}`)

    const distributionData = await FranchiseService.getLeadDistributionByServer(serverId, date)

    return NextResponse.json(distributionData)
  } catch (error) {
    console.error("Error fetching franchise distribution:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Error interno del servidor",
        details: error,
      },
      { status: 500 },
    )
  }
}
