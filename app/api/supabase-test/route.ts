import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    // Log environment variables (without exposing full keys)
    console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY exists:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    console.log("SUPABASE_SERVICE_ROLE_KEY exists:", !!process.env.SUPABASE_SERVICE_ROLE_KEY)

    // Intenta hacer una consulta simple
    const { data, error } = await supabase.from("servers").select("count")

    if (error) {
      console.error("Error de conexión a Supabase:", error)
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          details: {
            url: process.env.NEXT_PUBLIC_SUPABASE_URL,
            // No mostrar las claves completas por seguridad
            anon_key_prefix: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 10) + "...",
            service_key_prefix: process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 10) + "...",
            service_key_length: process.env.SUPABASE_SERVICE_ROLE_KEY?.length,
          },
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Conexión a Supabase establecida correctamente",
      data,
      env_check: {
        url_exists: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        anon_key_exists: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        service_key_exists: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
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
