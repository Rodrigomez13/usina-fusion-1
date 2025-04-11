"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Download, Filter, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function FinanzasPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestión Financiera</h2>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-green-500">+20.1% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastos Publicitarios</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$21,562.50</div>
            <p className="text-xs text-red-500">+15.3% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastos Administrativos</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,350.00</div>
            <p className="text-xs text-green-500">-2.5% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$15,319.39</div>
            <p className="text-xs text-green-500">+35.2% desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="balance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="balance">Balance General</TabsTrigger>
          <TabsTrigger value="income">Ingresos</TabsTrigger>
          <TabsTrigger value="expenses">Gastos</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>

        <TabsContent value="balance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Balance General</CardTitle>
              <CardDescription>Resumen financiero del negocio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Leads</TableHead>
                      <TableHead>Cargas</TableHead>
                      <TableHead>Conversión</TableHead>
                      <TableHead>Gasto Publicitario</TableHead>
                      <TableHead>Ingresos</TableHead>
                      <TableHead>Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 10 }).map((_, i) => {
                      const date = new Date()
                      date.setDate(date.getDate() - i)
                      const leads = Math.floor(Math.random() * 2000) + 500
                      const loads = Math.floor(leads * (Math.random() * 0.6 + 0.2))
                      const conversion = Math.floor((loads / leads) * 100)
                      const adSpend = Math.floor(Math.random() * 3000) + 1000
                      const income = Math.floor(adSpend * (Math.random() * 0.5 + 1.3))
                      const balance = income - adSpend

                      return (
                        <TableRow key={i}>
                          <TableCell>{date.toLocaleDateString()}</TableCell>
                          <TableCell>{leads}</TableCell>
                          <TableCell>{loads}</TableCell>
                          <TableCell>{conversion}%</TableCell>
                          <TableCell>${adSpend.toFixed(2)}</TableCell>
                          <TableCell>${income.toFixed(2)}</TableCell>
                          <TableCell
                            className={balance >= 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}
                          >
                            ${balance.toFixed(2)}
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
                    <p className="text-sm font-medium">Total Gastos</p>
                    <p className="text-2xl font-bold">$29,912.50</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Ingresos</p>
                    <p className="text-2xl font-bold">$45,231.89</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Balance Total</p>
                    <p className="text-2xl font-bold text-green-600">$15,319.39</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Ingresos</CardTitle>
                <CardDescription>Registro de ingresos por franquicia</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Registrar Ingreso
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Franquicia</TableHead>
                      <TableHead>Concepto</TableHead>
                      <TableHead>Monto</TableHead>
                      <TableHead>Método de Pago</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 10 }).map((_, i) => {
                      const date = new Date()
                      date.setDate(date.getDate() - Math.floor(Math.random() * 10))
                      const franchise = ["FENIX", "FORTUNA", "ATENEA", "EROS", "GANA24", "FLASHBET"][
                        Math.floor(Math.random() * 6)
                      ]
                      const concept = ["Publicidad", "Adelanto", "Pago Mensual"][Math.floor(Math.random() * 3)]
                      const amount = Math.floor(Math.random() * 5000) + 1000
                      const paymentMethod = ["Transferencia", "Efectivo", "Cripto"][Math.floor(Math.random() * 3)]
                      const status = ["Confirmado", "Pendiente", "Rechazado"][Math.floor(Math.random() * 3)]

                      return (
                        <TableRow key={i}>
                          <TableCell>{date.toLocaleDateString()}</TableCell>
                          <TableCell className="font-medium">{franchise}</TableCell>
                          <TableCell>{concept}</TableCell>
                          <TableCell>${amount.toFixed(2)}</TableCell>
                          <TableCell>{paymentMethod}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                status === "Confirmado"
                                  ? "bg-green-100 text-green-800"
                                  : status === "Pendiente"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {status}
                            </span>
                          </TableCell>
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

              <div className="mt-6 p-4 bg-slate-100 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium">Total Ingresos del Mes</p>
                    <p className="text-2xl font-bold">$45,231.89</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pendiente de Cobro</p>
                    <p className="text-2xl font-bold">$8,750.00</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Proyección Mensual</p>
                    <p className="text-2xl font-bold">$53,981.89</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Gastos</CardTitle>
                <CardDescription>Registro de gastos publicitarios y administrativos</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Registrar Gasto
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Concepto</TableHead>
                      <TableHead>Monto</TableHead>
                      <TableHead>Método de Pago</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 10 }).map((_, i) => {
                      const date = new Date()
                      date.setDate(date.getDate() - Math.floor(Math.random() * 10))
                      const category = ["Publicidad", "Administrativo", "Sueldos", "APIs", "Cuentas FB"][
                        Math.floor(Math.random() * 5)
                      ]
                      const concept = ["Meta Ads", "WhatsApp API", "Sueldo Personal", "Compra Cuentas", "Servicios"][
                        Math.floor(Math.random() * 5)
                      ]
                      const amount = Math.floor(Math.random() * 3000) + 500
                      const paymentMethod = ["Tarjeta", "Transferencia", "Efectivo", "Cripto"][
                        Math.floor(Math.random() * 4)
                      ]
                      const status = ["Pagado", "Pendiente", "Programado"][Math.floor(Math.random() * 3)]

                      return (
                        <TableRow key={i}>
                          <TableCell>{date.toLocaleDateString()}</TableCell>
                          <TableCell>{category}</TableCell>
                          <TableCell className="font-medium">{concept}</TableCell>
                          <TableCell>${amount.toFixed(2)}</TableCell>
                          <TableCell>{paymentMethod}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                status === "Pagado"
                                  ? "bg-green-100 text-green-800"
                                  : status === "Pendiente"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {status}
                            </span>
                          </TableCell>
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

              <div className="mt-6 p-4 bg-slate-100 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium">Gastos Publicitarios</p>
                    <p className="text-2xl font-bold">$21,562.50</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Gastos Administrativos</p>
                    <p className="text-2xl font-bold">$8,350.00</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Gastos</p>
                    <p className="text-2xl font-bold">$29,912.50</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reportes Financieros</CardTitle>
              <CardDescription>Generación de reportes financieros</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Reporte Mensual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Genera un reporte completo de ingresos, gastos y balance del mes actual.
                    </p>
                    <Button>Generar Reporte</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Reporte por Franquicia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Genera un reporte detallado por franquicia con métricas de rendimiento.
                    </p>
                    <Button>Generar Reporte</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Reporte de Publicidad</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Genera un reporte detallado de gastos publicitarios y rendimiento.
                    </p>
                    <Button>Generar Reporte</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Reporte de Sueldos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Genera un reporte detallado de sueldos y horas trabajadas.
                    </p>
                    <Button>Generar Reporte</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
