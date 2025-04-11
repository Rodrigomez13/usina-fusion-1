"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el correo de restablecimiento")
      }

      setMessage({
        type: "success",
        text: "Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.",
      })
    } catch (error) {
      console.error("Error:", error)
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Error al enviar el correo de restablecimiento",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Image
            src="/images/LOGO_TEMA_CLARO.png"
            alt="Usina Leads Logo"
            width={200}
            height={80}
            className="dark:hidden"
            priority
          />
          <Image
            src="/images/LOGO_TEMA_OSCURO.png"
            alt="Usina Leads Logo"
            width={200}
            height={80}
            className="hidden dark:block"
            priority
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Recuperar Contraseña</CardTitle>
            <CardDescription className="text-center">
              Ingresa tu correo electrónico para recibir instrucciones de recuperación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {message && (
                <Alert variant={message.type === "error" ? "destructive" : "default"}>
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Enviar Instrucciones"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/login" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
              Volver al inicio de sesión
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
