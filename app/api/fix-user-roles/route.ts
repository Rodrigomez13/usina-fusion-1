import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/client"

export async function GET() {
  try {
    const supabase = createClient()

    // 1. Obtener todos los roles duplicados
    const { data: duplicateRoles, error: fetchError } = await supabase
      .from("user_roles")
      .select("user_id, count(*)")
      .group("user_id")
      .having("count(*)", "gt", 1)

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 })
    }

    if (!duplicateRoles || duplicateRoles.length === 0) {
      return NextResponse.json({ message: "No duplicate roles found" })
    }

    // 2. Para cada usuario con roles duplicados, mantener solo uno
    const results = []

    for (const item of duplicateRoles) {
      const userId = item.user_id

      // Obtener todos los roles para este usuario
      const { data: userRoles, error: rolesError } = await supabase
        .from("user_roles")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: true })

      if (rolesError) {
        results.push({ userId, error: rolesError.message })
        continue
      }

      if (!userRoles || userRoles.length <= 1) {
        results.push({ userId, message: "No duplicate roles found for this user" })
        continue
      }

      // Mantener el primer rol (el más antiguo) y eliminar los demás
      const [keepRole, ...deleteRoles] = userRoles

      for (const role of deleteRoles) {
        const { error: deleteError } = await supabase.from("user_roles").delete().eq("id", role.id)

        if (deleteError) {
          results.push({ userId, roleId: role.id, error: deleteError.message })
        } else {
          results.push({ userId, roleId: role.id, message: "Deleted duplicate role" })
        }
      }
    }

    return NextResponse.json({
      message: "Fixed duplicate roles",
      details: results,
    })
  } catch (error) {
    console.error("Error fixing user roles:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
