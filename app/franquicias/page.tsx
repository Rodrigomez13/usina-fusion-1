"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Download, Filter, ExternalLink } from "lucide-react"

// Datos de ejemplo para franquicias
const franchiseData = [
  {
    name: "ATENEA",
    password: "atenea123",
    cvu: "0000156008828339890974",
    alias: "atenea258",
    owner: "José Alberto Alarcón",
    link: "https://casinoatenea.com",
    phones: 12,
    activePhones: 8,
  },
  {
    name: "EROS",
    password: "eros12345",
    cvu: "0000156008697713464368",
    alias: "-",
    owner: "Roberto Gastón Sosa",
    link: "https://erosonline.net",
    phones: 15,
    activePhones: 10,
  },
  {
    name: "FENIX",
    password: "fenix123",
    cvu: "0000156008697713464368",
    alias: "-",
    owner: "Roberto Gastón Sosa",
    link: "https://fenixcasino.vip",
    phones: 18,
    activePhones: 12,
  },
  {
    name: "FLASHBET",
    password: "flash123",
    cvu: "0000031000925398118571",
    alias: "carlos.178.ria.mp",
    owner: "Carlos Alberto Rodríguez",
    link: "https://flashbet.pro",
    phones: 10,
    activePhones: 6,
  },
  {
    name: "GANA24",
    password: "gana123",
    cvu: "0000156004617500628770",
    alias: "peralta.6",
    owner: "Peralta",
    link: "https://gana24.net",
    phones: 14,
    activePhones: 9,
  },
  {
    name: "FORTUNA",
    password: "fortuna123",
    cvu: "0000156004617500628770",
    alias: "peralta.6",
    owner: "Peralta",
    link: "https://evfortuna.com",
    phones: 20,
    activePhones: 14,
  },
]

export default function FranquiciasPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Franquicias</h2>
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

      <Tabs defaultValue="franchises" className="space-y-4">
        <TabsList>
          <TabsTrigger value="franchises">Franquicias</TabsTrigger>
          <TabsTrigger value="phones">Teléfonos</TabsTrigger>
          <TabsTrigger value="payments">Pagos</TabsTrigger>
        </TabsList>

        <TabsContent value="franchises" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Listado de Franquicias</CardTitle>
                <CardDescription>Gestión de franquicias y sus datos</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Buscar franquicias..." className="pl-8 w-[200px] md:w-[300px]" />
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Franquicia
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Contraseña</TableHead>
                      <TableHead>CVU</TableHead>
                      <TableHead>Alias</TableHead>
                      <TableHead>Titular</TableHead>
                      <TableHead>Link</TableHead>
                      <TableHead>Teléfonos</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {franchiseData.map((franchise) => (
                      <TableRow key={franchise.name}>
                        <TableCell className="font-medium">{franchise.name}</TableCell>
                        <TableCell>{franchise.password}</TableCell>
                        <TableCell>{franchise.cvu}</TableCell>
                        <TableCell>{franchise.alias}</TableCell>
                        <TableCell>{franchise.owner}</TableCell>
                        <TableCell>
                          <a
                            href={franchise.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-600 hover:underline"
                          >
                            {franchise.link.replace("https://", "")}
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </TableCell>
                        <TableCell>
                          {franchise.activePhones} / {franchise.phones}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Editar
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

        <TabsContent value="phones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Teléfonos por Franquicia</CardTitle>
              <CardDescription>Gestión de teléfonos asignados a cada franquicia</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="fortuna">
                <TabsList className="mb-4">
                  {franchiseData.map((franchise) => (
                    <TabsTrigger key={franchise.name.toLowerCase()} value={franchise.name.toLowerCase()}>
                      {franchise.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {franchiseData.map((franchise) => (
                  <TabsContent key={franchise.name.toLowerCase()} value={franchise.name.toLowerCase()}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Teléfonos de {franchise.name}</h3>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Agregar Teléfono
                      </Button>
                    </div>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Orden</TableHead>
                            <TableHead>Número</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Leads Asignados</TableHead>
                            <TableHead>Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Array.from({ length: 10 }).map((_, i) => (
                            <TableRow key={i}>
                              <TableCell>{i + 1}</TableCell>
                              <TableCell>+54 9 11 {Math.floor(Math.random() * 10000000) + 1000000}</TableCell>
                              <TableCell>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    i % 3 === 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {i % 3 === 0 ? "ACTIVO" : "NO PUBLI"}
                                </span>
                              </TableCell>
                              <TableCell>{Math.floor(Math.random() * 50) + 10}</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm">
                                  Editar
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pagos y Fondos</CardTitle>
              <CardDescription>Gestión de pagos y fondos por franquicia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Franquicia</TableHead>
                      <TableHead>Gasto Publicitario</TableHead>
                      <TableHead>Coeficiente</TableHead>
                      <TableHead>Total con Incremento</TableHead>
                      <TableHead>Fondos Disponibles</TableHead>
                      <TableHead>Último Pago</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {franchiseData.map((franchise, i) => {
                      const adSpend = Math.floor(Math.random() * 5000) + 1000
                      const coefficient = [0.12, 0.03, 0.19][i % 3]
                      const totalWithIncrease = adSpend * (1 + coefficient)
                      const availableFunds = Math.floor(Math.random() * 10000) + 2000

                      return (
                        <TableRow key={franchise.name}>
                          <TableCell className="font-medium">{franchise.name}</TableCell>
                          <TableCell>${adSpend.toFixed(2)}</TableCell>
                          <TableCell>{(coefficient * 100).toFixed(0)}%</TableCell>
                          <TableCell>${totalWithIncrease.toFixed(2)}</TableCell>
                          <TableCell>${availableFunds.toFixed(2)}</TableCell>
                          <TableCell>
                            {new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Registrar Pago
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6 p-4 bg-slate-100 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium">Total Gasto Publicitario</p>
                    <p className="text-2xl font-bold">$18,750.00</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total con Incremento</p>
                    <p className="text-2xl font-bold">$21,562.50</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Fondos Disponibles</p>
                    <p className="text-2xl font-bold">$35,000.00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
