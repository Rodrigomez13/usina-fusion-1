"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Verificar si hay un hash en la URL (necesario para el restablecimiento de contraseña)
    const hashFragment = window.location.hash
    if (!hashFragment) {
      setError("Enlace de restablecimiento de contraseña inválido o expirado")
    }
  }, [])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({ password })

      if (error) {
        throw error
      }

      setSuccess(true)

      // Esperar 3 segundos y luego redirigir al login
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (error: any) {
      console.error("Error al restablecer la contraseña:", error)
      setError(error.message || "Error al restablecer la contraseña")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-6">
        <div className="flex justify-center mb-8">
          <Image
            src="/images/LOGO_TEMA_CLARO.png"
            alt="Usina Leads"
            width={180}
            height={180}
            priority
            className="h-auto"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Restablecer Contraseña</h1>
          <p className="text-center text-gray-600 mb-6">Ingresa tu nueva contraseña</p>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          {success ? (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
              Contraseña actualizada correctamente. Serás redirigido al inicio de sesión en unos segundos...
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Nueva Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Contraseña
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0e2a35] text-white py-2 px-4 rounded-md hover:bg-[#1a3e4e] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? "Procesando..." : "Cambiar Contraseña"}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-gray-600">Sistema de Gestión de Usina Leads</p>
        </div>
      </div>
    </div>
  )
}
