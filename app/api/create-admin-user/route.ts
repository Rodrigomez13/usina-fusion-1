import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    // Usar la clave de servicio para tener acceso completo
    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // 1. Crear el usuario
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: "rodrigomez13@example.com", // Cambia esto a un email real
      password: "usina234",
      email_confirm: true, // Confirmar el email automáticamente
    })

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 500 })
    }

    // 2. Asignar el rol de admin
    const { error: roleError } = await supabaseAdmin.from("user_roles").insert([
      {
        user_id: userData.user.id,
        role: "admin",
      },
    ])

    if (roleError) {
      return NextResponse.json({ error: roleError.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Usuario admin creado correctamente",
      user: {
        id: userData.user.id,
        email: userData.user.email,
      },
    })
  } catch (error) {
    console.error("Error al crear usuario admin:", error)
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
