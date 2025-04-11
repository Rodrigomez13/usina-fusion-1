import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/client"

export async function GET() {
  try {
    const supabase = createClient()
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError) {
      return NextResponse.json(
        {
          error: "Error getting session",
          details: sessionError.message,
        },
        { status: 500 },
      )
    }

    if (!session) {
      return NextResponse.json({
        status: "No active session",
        authenticated: false,
        session: null,
        user: null,
        role: null,
      })
    }

    // Si hay sesión, obtener el rol del usuario
    const { data: roleData, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .single()

    if (roleError && roleError.code !== "PGRST116") {
      return NextResponse.json({
        status: "Authenticated but error getting role",
        authenticated: true,
        session: {
          expires_at: session.expires_at,
          created_at: session.created_at,
        },
        user: {
          id: session.user.id,
          email: session.user.email,
        },
        role: null,
        error: roleError.message,
      })
    }

    return NextResponse.json({
      status: "Authenticated",
      authenticated: true,
      session: {
        expires_at: session.expires_at,
        created_at: session.created_at,
      },
      user: {
        id: session.user.id,
        email: session.user.email,
      },
      role: roleData?.role || "No role assigned",
    })
  } catch (error) {
    console.error("Error in test-auth route:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
