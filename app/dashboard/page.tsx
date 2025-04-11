import { redirect } from "next/navigation"

export default function DashboardPage() {
  redirect("/servidores")

  // Este código nunca se ejecutará debido a la redirección anterior
  return null
}
