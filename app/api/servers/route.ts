import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("servers").select("*").order("name")

    if (error) {
      console.error("Error fetching servers:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in GET /api/servers:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno del servidor" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = createServerSupabaseClient()

    // Validar los datos de entrada
    if (!body.name || body.tax_coefficient === undefined) {
      return NextResponse.json({ error: "Nombre y coeficiente de impuesto son requeridos" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("servers")
      .insert([
        {
          name: body.name,
          description: body.description || null,
          tax_coefficient: body.tax_coefficient,
          is_active: body.is_active !== undefined ? body.is_active : true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating server:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/servers:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno del servidor" },
      { status: 500 },
    )
  }
}
