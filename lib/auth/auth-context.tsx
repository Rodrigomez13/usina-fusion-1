"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  userRole: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setIsLoading(true)
        console.log("Fetching session...")

        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Error fetching session:", error)
          return
        }

        console.log("Session:", session ? "Found" : "Not found")
        setSession(session)
        setUser(session?.user || null)

        if (session?.user) {
          try {
            console.log("Fetching user role for user:", session.user.id)
            const { data: roleData, error: roleError } = await supabase
              .from("user_roles")
              .select("role")
              .eq("user_id", session.user.id)
              .single()

            if (roleError) {
              console.error("Error fetching user role:", roleError)
              // No establecer un rol por defecto en caso de error
            } else {
              console.log("User role:", roleData?.role || "No role found")
              setUserRole(roleData?.role || null)
            }
          } catch (roleError) {
            console.error("Exception fetching user role:", roleError)
          }
        }
      } catch (error) {
        console.error("Exception in session fetch:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event)
      setSession(session)
      setUser(session?.user || null)

      if (session?.user) {
        try {
          const { data: roleData, error: roleError } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", session.user.id)
            .single()

          if (roleError) {
            console.error("Error fetching user role on auth change:", roleError)
          } else {
            setUserRole(roleData?.role || null)
          }
        } catch (error) {
          console.error("Exception fetching user role on auth change:", error)
        }
      } else {
        setUserRole(null)
      }

      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in with email:", email)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Sign in error:", error)
        return { error }
      }

      console.log("Sign in successful:", data.user?.id)
      return { error: null }
    } catch (error) {
      console.error("Exception during sign in:", error)
      return { error }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signOut,
    userRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
