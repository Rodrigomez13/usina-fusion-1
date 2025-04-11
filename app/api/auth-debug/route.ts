import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/client"

export async function GET() {
  try {
    const supabase = createClient()

    // Obtener la sesión actual
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
      return NextResponse.json(
        {
          success: false,
          error: "Error al obtener la sesión",
          details: sessionError,
        },
        { status: 500 },
      )
    }

    // Si no hay sesión, devolver un mensaje claro
    if (!sessionData.session) {
      return NextResponse.json(
        {
          success: false,
          message: "No hay sesión activa",
          cookies: Object.fromEntries(
            Object.entries(
              document.cookie.split(";").reduce((acc, cookie) => {
                const [key, value] = cookie.trim().split("=")
                acc[key] = value
                return acc
              }, {}),
            ).filter(([key]) => key.startsWith("sb-")),
          ),
        },
        { status: 401 },
      )
    }

    // Si hay sesión, intentar obtener el rol del usuario
    const userId = sessionData.session.user.id
    const { data: roleData, error: roleError } = await supabase.from("user_roles").select("*").eq("user_id", userId)

    // Devolver toda la información para diagnóstico
    return NextResponse.json({
      success: true,
      session: {
        id: sessionData.session.id,
        user: {
          id: sessionData.session.user.id,
          email: sessionData.session.user.email,
        },
        expires_at: sessionData.session.expires_at,
      },
      role: roleError ? { error: roleError.message } : roleData,
      cookies: Object.fromEntries(
        Object.entries(
          document.cookie.split(";").reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split("=")
            acc[key] = value
            return acc
          }, {}),
        ).filter(([key]) => key.startsWith("sb-")),
      ),
    })
  } catch (error) {
    console.error("Error en auth-debug:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
