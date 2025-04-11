"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function RedirectTestPage() {
  const [sessionInfo, setSessionInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          setError(error.message)
          return
        }

        setSessionInfo(data)

        // Intentar redirección manual
        if (data.session) {
          console.log("Sesión activa, intentando redirección manual a /servidores")
          setTimeout(() => {
            window.location.href = "/servidores"
          }, 3000) // Esperar 3 segundos para poder ver la información
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Prueba de Redirección</h1>

      {loading && <p>Cargando información de sesión...</p>}

      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-4">Error: {error}</div>}

      {sessionInfo && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded mb-4">
          <p>Sesión: {sessionInfo.session ? "Activa" : "Inactiva"}</p>
          {sessionInfo.session && (
            <>
              <p>Usuario ID: {sessionInfo.session.user.id}</p>
              <p>Email: {sessionInfo.session.user.email}</p>
              <p>Redirección a /servidores en 3 segundos...</p>
            </>
          )}
        </div>
      )}

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Cookies de sesión:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {document.cookie
            .split(";")
            .map((cookie) => cookie.trim())
            .join("\n")}
        </pre>
      </div>
    </div>
  )
}
