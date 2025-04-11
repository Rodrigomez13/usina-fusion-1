"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Download, Filter } from "lucide-react"

// Datos de ejemplo para empleados
const employeeData = [
  {
    id: 1,
    name: "GAWRYLCZUCK SEBASTIAN",
    role: "GERENTE",
    shift: "ROTATIVO",
    account: "sebogw299",
    salary: "$1,000,000.00",
    dayOff: "Lunes",
    hoursToday: 0,
    overtime: 0,
    totalToPay: "$650,000.00",
  },
  {
    id: 2,
    name: "AGUIRRE RODRIGO",
    role: "GERENTE",
    shift: "ROTATIVO",
    account: "rodrigoaguirregomez99120",
    salary: "$1,000,000.00",
    dayOff: "Martes",
    hoursToday: 0,
    overtime: 0,
    totalToPay: "$1,000,000.00",
  },
  {
    id: 3,
    name: "RODRIGO TAPIA",
    role: "ENCARGADO",
    shift: "MAÑANA",
    account: "000000310000079540575",
    salary: "$425,000.00",
    dayOff: "Miércoles",
    hoursToday: 8,
    overtime: 0,
    totalToPay: "$85,000.00",
  },
  {
    id: 4,
    name: "MATEO VIERA",
    role: "SUBENCARGADO",
    shift: "MAÑANA",
    account: "mateo.viera05",
    salary: "$395,000.00",
    dayOff: "Jueves",
    hoursToday: 8,
    overtime: 1.5,
    totalToPay: "$92,166.67",
  },
  {
    id: 5,
    name: "ALEJO VIERA",
    role: "ENCARGADO",
    shift: "TARDE",
    account: "alejokviera",
    salary: "$425,000.00",
    dayOff: "Viernes",
    hoursToday: 8,
    overtime: 0,
    totalToPay: "$85,000.00",
  },
  {
    id: 6,
    name: "EMANUEL SCARSI",
    role: "ENCARGADO",
    shift: "NOCHE",
    account: "000000310001740245132",
    salary: "$425,000.00",
    dayOff: "Sábado",
    hoursToday: 8,
    overtime: 1.75,
    totalToPay: "$92,083.33",
  },
]

export default function PersonalPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Personal</h2>
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

      <Tabs defaultValue="employees" className="space-y-4">
        <TabsList>
          <TabsTrigger value="employees">Empleados</TabsTrigger>
          <TabsTrigger value="attendance">Asistencia</TabsTrigger>
          <TabsTrigger value="payroll">Nómina</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Listado de Empleados</CardTitle>
                <CardDescription>Gestión de empleados y sus datos personales</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Buscar empleados..." className="pl-8 w-[200px] md:w-[300px]" />
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo Empleado
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead>Turno</TableHead>
                      <TableHead>Cuenta</TableHead>
                      <TableHead>Sueldo</TableHead>
                      <TableHead>Franco</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeeData.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.role}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              employee.shift === "MAÑANA"
                                ? "bg-blue-100 text-blue-800"
                                : employee.shift === "TARDE"
                                  ? "bg-orange-100 text-orange-800"
                                  : employee.shift === "NOCHE"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {employee.shift}
                          </span>
                        </TableCell>
                        <TableCell>{employee.account}</TableCell>
                        <TableCell>{employee.salary}</TableCell>
                        <TableCell>{employee.dayOff}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Ver Detalles
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

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Asistencia</CardTitle>
              <CardDescription>Control de horas trabajadas y francos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Empleado</TableHead>
                      <TableHead>Turno</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Horas Trabajadas</TableHead>
                      <TableHead>Horas Extra</TableHead>
                      <TableHead>Franco Trabajado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeeData.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.shift}</TableCell>
                        <TableCell>{new Date().toLocaleDateString()}</TableCell>
                        <TableCell>{employee.hoursToday}</TableCell>
                        <TableCell>{employee.overtime}</TableCell>
                        <TableCell>{employee.overtime > 0 ? "Sí" : "No"}</TableCell>
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

        <TabsContent value="payroll" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nómina de Sueldos</CardTitle>
              <CardDescription>Cálculo y gestión de sueldos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Empleado</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead>Sueldo Base</TableHead>
                      <TableHead>Horas Extra</TableHead>
                      <TableHead>Franco Trabajado</TableHead>
                      <TableHead>Total a Pagar</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeeData.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.role}</TableCell>
                        <TableCell>{employee.salary}</TableCell>
                        <TableCell>{employee.overtime > 0 ? `${employee.overtime}h` : "-"}</TableCell>
                        <TableCell>{employee.overtime > 0 ? "Sí" : "No"}</TableCell>
                        <TableCell className="font-bold">{employee.totalToPay}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pendiente
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Pagar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6 p-4 bg-slate-100 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium">Total Sueldos Básicos</p>
                    <p className="text-2xl font-bold">$3,670,000.00</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Horas Extra</p>
                    <p className="text-2xl font-bold">$34,250.00</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total a Pagar</p>
                    <p className="text-2xl font-bold">$3,704,250.00</p>
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
