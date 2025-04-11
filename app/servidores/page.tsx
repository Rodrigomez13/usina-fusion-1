import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Settings, Power } from "lucide-react"
import ServerSettings from "@/components/server/server-settings"
import { ServerService } from "@/lib/services/server-service"
import ServerTableSkeleton from "@/components/server/server-table-skeleton"
import ServerTabsSkeleton from "@/components/server/server-tabs-skeleton"
import NewServerDialog from "@/components/server/new-server-dialog"
import SupabaseConnectionStatus from "@/components/supabase-connection-status"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function ServidoresPage() {
  let servers = []
  let error = null

  try {
    servers = await ServerService.getServers()
  } catch (err) {
    console.error("Error fetching servers:", err)
    error = err
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Servidores</h2>
        <div className="flex items-center space-x-2">
          <NewServerDialog />
        </div>
      </div>

      <SupabaseConnectionStatus />

      {error ? (
        <div className="p-4 border border-red-300 bg-red-50 rounded-md text-red-800">
          <h3 className="font-bold mb-2">Error al cargar los servidores</h3>
          <p>
            Ha ocurrido un error al intentar cargar los servidores. Por favor, verifica tu conexión a Supabase y las
            credenciales.
          </p>
          <p className="text-sm mt-2">Detalles: {error.message || "Error desconocido"}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <Suspense fallback={<ServerTableSkeleton />}>
            <ServersTable servers={servers} />
          </Suspense>

          <Suspense fallback={<ServerTabsSkeleton />}>
            <ServerTabs servers={servers} />
          </Suspense>
        </div>
      )}
    </div>
  )
}

function ServersTable({ servers }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Servidores Disponibles</CardTitle>
        <CardDescription>Configuración de servidores como entornos de trabajo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Coeficiente de Impuesto</TableHead>
                <TableHead>Anuncios Activos</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {servers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No hay servidores disponibles. Crea uno nuevo para comenzar.
                  </TableCell>
                </TableRow>
              ) : (
                servers.map((server) => (
                  <TableRow key={server.id}>
                    <TableCell className="font-medium">{server.name}</TableCell>
                    <TableCell>{server.description || "-"}</TableCell>
                    <TableCell>{(server.tax_coefficient * 100).toFixed(0)}%</TableCell>
                    <TableCell>
                      <ServerAdCount serverId={server.id} />
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          server.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {server.is_active ? "Activo" : "Inactivo"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <ServerActions server={server} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

function ServerTabs({ servers }) {
  if (servers.length === 0) {
    return null
  }

  return (
    <Tabs defaultValue={servers[0]?.id} className="space-y-4">
      <TabsList>
        {servers.map((server) => (
          <TabsTrigger key={server.id} value={server.id}>
            {server.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {servers.map((server) => (
        <TabsContent key={server.id} value={server.id} className="space-y-4">
          <ServerSettings server={server} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

async function ServerAdCount({ serverId }) {
  const activeAds = await ServerService.getActiveServerAds(serverId)
  return <span>{activeAds.length}</span>
}

function ServerActions({ server }) {
  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="sm" asChild>
        <a href={`/servidores/${server.id}`}>
          <Settings className="h-4 w-4 mr-1" />
          Configurar
        </a>
      </Button>
      <ToggleServerStatus server={server} />
    </div>
  )
}

function ToggleServerStatus({ server }) {
  return (
    <form
      action={async () => {
        "use server"
        await ServerService.toggleServerStatus(server.id, !server.is_active)
      }}
    >
      <Button variant={server.is_active ? "destructive" : "default"} size="sm" type="submit">
        <Power className="h-4 w-4 mr-1" />
        {server.is_active ? "Desactivar" : "Activar"}
      </Button>
    </form>
  )
}
