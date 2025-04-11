import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/client"

export async function GET(request: Request) {
  try {
    const supabase = createClient()

    // Obtener la sesión actual
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "No hay sesión activa" }, { status: 401 })
    }

    const userId = session.user.id

    // Verificar si el usuario tiene un rol asignado
    const { data: existingRole, error: roleError } = await supabase.from("user_roles").select("*").eq("user_id", userId)

    if (roleError) {
      return NextResponse.json({ error: roleError.message }, { status: 500 })
    }

    // Si el usuario tiene múltiples roles, eliminar los duplicados
    if (existingRole && existingRole.length > 1) {
      // Mantener solo el primer rol
      const [keepRole, ...deleteRoles] = existingRole

      for (const role of deleteRoles) {
        await supabase.from("user_roles").delete().eq("id", role.id)
      }

      return NextResponse.json({
        message: "Roles duplicados eliminados",
        keptRole: keepRole,
        deletedRoles: deleteRoles.length,
      })
    }

    // Si el usuario no tiene rol, asignarle uno
    if (!existingRole || existingRole.length === 0) {
      const { data: newRole, error: insertError } = await supabase
        .from("user_roles")
        .insert([{ user_id: userId, role: "admin" }])
        .select()

      if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 })
      }

      return NextResponse.json({
        message: "Rol asignado correctamente",
        role: newRole,
      })
    }

    // Si el usuario ya tiene un rol, verificar que sea "admin" (no "administración")
    if (existingRole[0].role === "administración") {
      const { data: updatedRole, error: updateError } = await supabase
        .from("user_roles")
        .update({ role: "admin" })
        .eq("id", existingRole[0].id)
        .select()

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 })
      }

      return NextResponse.json({
        message: "Rol actualizado de 'administración' a 'admin'",
        role: updatedRole,
      })
    }

    return NextResponse.json({
      message: "El usuario ya tiene un rol correcto",
      role: existingRole[0],
    })
  } catch (error) {
    console.error("Error al verificar/corregir el rol:", error)
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
