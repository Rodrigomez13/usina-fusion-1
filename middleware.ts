import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Rutas públicas que no requieren autenticación
  const publicRoutes = ["/", "/login", "/api"]

  // Verificar si la ruta actual es pública
  const isPublicRoute = publicRoutes.some(
    (route) =>
      request.nextUrl.pathname === route ||
      request.nextUrl.pathname.startsWith(`${route}/`) ||
      request.nextUrl.pathname.includes("."),
  )

  // Si es una ruta pública, permitir acceso
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Verificar si el usuario está autenticado usando cookies
  const hasSessionCookie = request.cookies.has("sb-access-token") || request.cookies.has("sb-refresh-token")

  // Si no hay sesión, redirigir a la página de login
  if (!hasSessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Usuario autenticado, permitir acceso
  return NextResponse.next()
}

// Aplicar middleware a todas las rutas excepto a los archivos estáticos
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images).*)"],
}
