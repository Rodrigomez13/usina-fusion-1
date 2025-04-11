import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/client"

export async function GET() {
  try {
    const supabase = createClient()

    // Probar la conexión con Supabase
    const { data, error } = await supabase.from("user_roles").select("*").limit(1)

    if (error) {
      console.error("Error de conexión con Supabase:", error)
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          details: error,
          env: {
            url: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Configurado" : "No configurado",
            key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Configurado" : "No configurado",
          },
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Conexión exitosa con Supabase",
      data,
      env: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Configurado" : "No configurado",
        key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Configurado" : "No configurado",
      },
    })
  } catch (error) {
    console.error("Error al probar la conexión:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : String(error),
        env: {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Configurado" : "No configurado",
          key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Configurado" : "No configurado",
        },
      },
      { status: 500 },
    )
  }
}
