import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    console.log("Intentando obtener servidores...")
    const { data, error } = await supabase.from("servers").select("*")

    if (error) {
      console.error("Error al obtener servidores:", error)
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          details: error,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      count: data?.length || 0,
      data: data,
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
