import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e2a38]">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-[#3d7a80]" />
        <p className="text-white text-lg">Cargando...</p>
      </div>
    </div>
  )
}
