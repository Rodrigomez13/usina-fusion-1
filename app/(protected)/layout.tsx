"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Sidebar } from "@/components/sidebar"
import { Loader2 } from "lucide-react"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) throw error

        if (!data.session) {
          router.push("/login")
          return
        }

        setIsAuthenticated(true)
      } catch (error) {
        console.error("Error al verificar autenticación:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, supabase])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0e2a38]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-[#3d7a80]" />
          <p className="text-white text-lg">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
