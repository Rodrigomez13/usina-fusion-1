import ServerList from "@/components/server/server-list"
import ServerForm from "@/components/server/server-form"

export default function ServersPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Gestión de Servidores</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ServerForm />
        <ServerList />
      </div>
    </div>
  )
}
