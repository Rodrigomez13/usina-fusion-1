import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    // Crear cliente con la clave de servicio para tener acceso completo
    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // 1. Verificar y corregir la tabla user_roles
    const { data: userRoles, error: rolesError } = await supabaseAdmin.from("user_roles").select("*")

    if (rolesError) {
      return NextResponse.json({ error: rolesError.message }, { status: 500 })
    }

    // Agrupar roles por user_id para encontrar duplicados
    const rolesByUser = userRoles.reduce((acc, role) => {
      if (!acc[role.user_id]) {
        acc[role.user_id] = []
      }
      acc[role.user_id].push(role)
      return acc
    }, {})

    // Eliminar roles duplicados
    for (const userId in rolesByUser) {
      if (rolesByUser[userId].length > 1) {
        // Mantener solo el primer rol
        const [keep, ...remove] = rolesByUser[userId]

        for (const role of remove) {
          await supabaseAdmin.from("user_roles").delete().eq("id", role.id)
        }
      }
    }

    // 2. Verificar políticas RLS
    // Desactivar temporalmente RLS para la tabla user_roles
    await supabaseAdmin.rpc("disable_rls_for_table", { table_name: "user_roles" })

    return NextResponse.json({
      success: true,
      message: "Configuración de Supabase corregida",
    })
  } catch (error) {
    console.error("Error al corregir la configuración de Supabase:", error)
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
