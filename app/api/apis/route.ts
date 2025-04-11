import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("apis").select("*").order("name")

    if (error) {
      console.error("Error fetching APIs:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in GET /api/apis:", error)
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
    if (!body.name || !body.token || !body.phone) {
      return NextResponse.json({ error: "Nombre, token y teléfono son requeridos" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("apis")
      .insert([
        {
          name: body.name,
          token: body.token,
          phone: body.phone,
          messages_per_day: body.messages_per_day || 200,
          monthly_cost: body.monthly_cost || 50,
          status: body.status || "active",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating API:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/apis:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno del servidor" },
      { status: 500 },
    )
  }
}
