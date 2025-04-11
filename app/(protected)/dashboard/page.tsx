import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | USINA Leads",
  description: "Panel de control principal de USINA Leads",
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Servidores Activos</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">+2% desde el último mes</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Franquicias</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">+25</div>
            <p className="text-xs text-muted-foreground">+15% desde el último mes</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Campañas Activas</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">+48</div>
            <p className="text-xs text-muted-foreground">+8% desde el último mes</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Leads Generados</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">+1,234</div>
            <p className="text-xs text-muted-foreground">+12% desde el último mes</p>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Rendimiento de Campañas</h3>
            <p className="text-sm text-muted-foreground">Rendimiento de las campañas en los últimos 30 días</p>
          </div>
          <div className="p-6">
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Gráfico de rendimiento (datos de ejemplo)
            </div>
          </div>
        </div>
        <div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Actividad Reciente</h3>
            <p className="text-sm text-muted-foreground">Últimas actividades en el sistema</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M12 2v20"></path>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Nueva campaña creada</p>
                  <p className="text-sm text-muted-foreground">Hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Nuevo usuario registrado</p>
                  <p className="text-sm text-muted-foreground">Hace 5 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Servidor actualizado</p>
                  <p className="text-sm text-muted-foreground">Hace 8 horas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
