import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default async function Home() {
  const supabase = createClient()

  const { data } = await supabase.auth.getSession()

  if (data.session) {
    redirect("/servidores")
  } else {
    redirect("/login")
  }

  // Este código nunca se ejecutará debido a las redirecciones anteriores
  return null
}
