import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "@/app/providers"
import { AuthProvider } from "@/lib/auth/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Usina Leads - Sistema de Gestión",
  description: "Sistema de gestión para Usina Leads",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers>
            <AuthProvider>{children}</AuthProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'