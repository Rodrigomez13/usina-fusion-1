import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    // Intenta hacer una consulta simple
    const { data, error } = await supabase.from("servers").select("count")

    if (error) {
      console.error("Error de conexión a Supabase:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Conexión a Supabase establecida correctamente",
      data,
    })
  } catch (error) {
    console.error("Error inesperado:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}
