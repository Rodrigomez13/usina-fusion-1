"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Download, Filter } from "lucide-react"

export default function LeadsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Leads</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="leads" className="space-y-4">
        <TabsList>
          <TabsTrigger value="leads">Leads Generados</TabsTrigger>
          <TabsTrigger value="distribution">Distribución a Franquicias</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Leads Generados</CardTitle>
                <CardDescription>Listado de todos los leads generados por las campañas publicitarias</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Buscar leads..." className="pl-8 w-[200px] md:w-[300px]" />
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Lead
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Teléfono</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Campaña</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Franquicia</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">LD-{1000 + i}</TableCell>
                        <TableCell>Cliente Ejemplo {i + 1}</TableCell>
                        <TableCell>+54 9 11 {Math.floor(Math.random() * 10000000) + 1000000}</TableCell>
                        <TableCell>{new Date().toLocaleDateString()}</TableCell>
                        <TableCell>Campaña {Math.floor(Math.random() * 5) + 1}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              i % 3 === 0
                                ? "bg-green-100 text-green-800"
                                : i % 3 === 1
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {i % 3 === 0 ? "Convertido" : i % 3 === 1 ? "Pendiente" : "No Interesado"}
                          </span>
                        </TableCell>
                        <TableCell>{i % 3 === 0 ? ["FENIX", "EROS", "GANA24", "ATENEA"][i % 4] : "-"}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Ver
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribución a Franquicias</CardTitle>
              <CardDescription>Gestión de la distribución de leads convertidos a las franquicias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Franquicia</TableHead>
                      <TableHead>Teléfono</TableHead>
                      <TableHead>Leads Asignados</TableHead>
                      <TableHead>Leads Disponibles</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {["FENIX", "FORTUNA", "ATENEA", "EROS", "GANA24", "FLASHBET"].map((franchise, i) => (
                      <TableRow key={franchise}>
                        <TableCell className="font-medium">{franchise}</TableCell>
                        <TableCell>+54 9 11 {Math.floor(Math.random() * 10000000) + 1000000}</TableCell>
                        <TableCell>{Math.floor(Math.random() * 200) + 50}</TableCell>
                        <TableCell>{Math.floor(Math.random() * 20)}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              i % 2 === 0 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {i % 2 === 0 ? "Activo" : "Pendiente"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Gestionar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Distribución</CardTitle>
              <CardDescription>Registro histórico de leads distribuidos a franquicias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Franquicia</TableHead>
                      <TableHead>Teléfono</TableHead>
                      <TableHead>Leads Enviados</TableHead>
                      <TableHead>Servidor</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 10 }).map((_, i) => {
                      const date = new Date()
                      date.setDate(date.getDate() - i)

                      return (
                        <TableRow key={i}>
                          <TableCell>{date.toLocaleDateString()}</TableCell>
                          <TableCell className="font-medium">
                            {["FENIX", "FORTUNA", "ATENEA", "EROS", "GANA24", "FLASHBET"][i % 6]}
                          </TableCell>
                          <TableCell>+54 9 11 {Math.floor(Math.random() * 10000000) + 1000000}</TableCell>
                          <TableCell>{Math.floor(Math.random() * 50) + 10}</TableCell>
                          <TableCell>Server {Math.floor(Math.random() * 3) + 4}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Ver Detalles
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
