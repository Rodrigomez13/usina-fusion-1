import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function GET() {
  try {
    // Verificar si las variables de entorno están configuradas
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    // Intentar crear un cliente con la clave anon
    const anonClient = createServerClient(supabaseUrl!, supabaseAnonKey!, {
      auth: { persistSession: false },
      cookies: { get: () => undefined },
    })

    // Intentar crear un cliente con la clave de servicio
    const serviceClient = createServerClient(supabaseUrl!, supabaseServiceKey!, {
      auth: { persistSession: false },
      cookies: { get: () => undefined },
    })

    // Probar ambos clientes
    const anonTest = await anonClient.from("servers").select("count")
    const serviceTest = await serviceClient.from("servers").select("count")

    // Devolver información sobre las claves y los resultados de las pruebas
    return NextResponse.json({
      success: true,
      environment: {
        url: supabaseUrl,
        anon_key_exists: !!supabaseAnonKey,
        anon_key_prefix: supabaseAnonKey ? supabaseAnonKey.substring(0, 10) + "..." : null,
        anon_key_length: supabaseAnonKey?.length,
        service_key_exists: !!supabaseServiceKey,
        service_key_prefix: supabaseServiceKey ? supabaseServiceKey.substring(0, 10) + "..." : null,
        service_key_length: supabaseServiceKey?.length,
        // Verificar si las claves comienzan con "eyJ" (formato JWT)
        anon_key_format_valid: supabaseAnonKey?.startsWith("eyJ"),
        service_key_format_valid: supabaseServiceKey?.startsWith("eyJ"),
      },
      tests: {
        anon_client: {
          success: !anonTest.error,
          error: anonTest.error
            ? {
                message: anonTest.error.message,
                code: anonTest.error.code,
                details: anonTest.error.details,
              }
            : null,
          data: anonTest.data,
        },
        service_client: {
          success: !serviceTest.error,
          error: serviceTest.error
            ? {
                message: serviceTest.error.message,
                code: serviceTest.error.code,
                details: serviceTest.error.details,
              }
            : null,
          data: serviceTest.data,
        },
      },
    })
  } catch (error) {
    console.error("Error en el endpoint de depuración:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}
