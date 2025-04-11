import { type NextRequest, NextResponse } from "next/server"
import { FranchiseService } from "@/lib/services/franchise-service"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const franchises = await FranchiseService.getFranchises()
    return NextResponse.json(franchises)
  } catch (error) {
    console.error("Error fetching franchises:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno del servidor" },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = createServerSupabaseClient()

    // Validar los datos de entrada
    if (!body.name || !body.password || !body.cvu || !body.owner || !body.link) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("franchises")
      .insert([
        {
          name: body.name,
          password: body.password,
          cvu: body.cvu,
          alias: body.alias || "",
          owner: body.owner,
          link: body.link,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating franchise:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/franchises:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno del servidor" },
      { status: 500 },
    )
  }
}
