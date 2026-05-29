"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  CreditCard,
  Banknote,
  MapPin,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  Search,
  Car,
  ClipboardList,
  MessageSquare,
} from "lucide-react"
import { Logo } from "./logo"
import {
  municipalMockData,
  pendingProfiles,
  payments,
  reservationHistory,
} from "@/lib/prototype-data"
import { cn } from "@/lib/utils"

function money(n: number) {
  return "$" + n.toLocaleString("es-AR")
}

type Tab =
  | "resumen"
  | "conductores"
  | "permisionarios"
  | "documentacion"
  | "vencimientos"
  | "servicios"
  | "reservas"
  | "cobros"
  | "reclamos"
  | "zonas"
  | "reportes"

const navItems: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "resumen", label: "Resumen", icon: LayoutDashboard },
  { id: "conductores", label: "Conductores", icon: Car },
  { id: "permisionarios", label: "Permisionarios", icon: Users },
  { id: "documentacion", label: "Documentación", icon: FileText },
  { id: "vencimientos", label: "Vencimientos", icon: Calendar },
  { id: "servicios", label: "Servicios", icon: ClipboardList },
  { id: "reservas", label: "Reservas", icon: Calendar },
  { id: "cobros", label: "Cobros", icon: CreditCard },
  { id: "reclamos", label: "Reclamos", icon: MessageSquare },
  { id: "zonas", label: "Zonas", icon: MapPin },
  { id: "reportes", label: "Reportes", icon: BarChart3 },
]

export function MunicipalDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("resumen")

  return (
    <div className="flex min-h-screen bg-gray-soft">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground md:flex">
        <div className="flex items-center gap-2 border-b border-sidebar-border px-5 py-4">
          <Logo variant="light" />
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => setActiveTab(n.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                activeTab === n.id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent",
              )}
            >
              <n.icon className="size-4" />
              {n.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-sidebar-primary/20 text-xs font-semibold text-sidebar-primary">
              M
            </span>
            <div className="text-xs">
              <p className="font-semibold text-white">Municipalidad</p>
              <p className="text-sidebar-foreground/70">Salta Capital</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-6 py-4">
          <div>
            <h1 className="font-heading text-xl font-bold text-navy">
              {navItems.find((n) => n.id === activeTab)?.label || "Panel Municipal"}
            </h1>
            <p className="text-sm text-gray-text">Salta Capital · Gestión municipal</p>
          </div>
          <select className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-navy">
            <option>Hoy</option>
            <option>Últimos 7 días</option>
            <option>Este mes</option>
          </select>
        </header>

        <div className="p-6">
          {activeTab === "resumen" && <ResumenTab />}
          {activeTab === "conductores" && <ConductoresTab />}
          {activeTab === "permisionarios" && <PermisionariosTab />}
          {activeTab === "documentacion" && <DocumentacionTab />}
          {activeTab === "vencimientos" && <VencimientosTab />}
          {activeTab === "servicios" && <ServiciosTab />}
          {activeTab === "reservas" && <ReservasTab />}
          {activeTab === "cobros" && <CobrosTab />}
          {activeTab === "reclamos" && <ReclamosTab />}
          {activeTab === "zonas" && <ZonasTab />}
          {activeTab === "reportes" && <ReportesTab />}
        </div>
      </main>
    </div>
  )
}

function KpiCard({ icon: Icon, label, value, sub, tone = "sky" }: {
  icon: React.ElementType; label: string; value: string; sub?: string; tone?: "sky" | "turquoise" | "danger" | "warning"
}) {
  const toneCls = { sky: "bg-sky/10 text-sky", turquoise: "bg-turquoise/10 text-turquoise", danger: "bg-alert-red/10 text-alert-red", warning: "bg-warning-yellow/10 text-warning-yellow" }[tone]
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <span className={cn("flex size-10 items-center justify-center rounded-xl", toneCls)}>
        <Icon className="size-5" />
      </span>
      <p className="mt-3 font-heading text-2xl font-bold text-navy">{value}</p>
      <p className="text-sm text-gray-text">{label}</p>
      {sub && <p className="mt-0.5 text-xs text-gray-text">{sub}</p>}
    </div>
  )
}

function ResumenTab() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard icon={Users} label="Permisionarios activos" value={String(municipalMockData.activePermisionarios)} sub={`${municipalMockData.suspended} suspendidos`} tone="turquoise" />
        <KpiCard icon={Car} label="Conductores registrados" value={String(municipalMockData.registeredConductores)} sub="Usuarios activos" tone="sky" />
        <KpiCard icon={CreditCard} label="Cobros hoy" value={String(municipalMockData.todayQRCobros + municipalMockData.todayEfectivoCobros)} sub={money(municipalMockData.todayTotalRecaudado)} tone="sky" />
        <KpiCard icon={Calendar} label="Reservas activas" value={String(municipalMockData.activeReservas)} sub={`${municipalMockData.cancelledReservas} canceladas`} tone="warning" />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-heading text-base font-semibold text-navy mb-4">Alertas</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-warning-yellow/10 p-3">
              <div className="flex items-center gap-3">
                <Clock className="size-5 text-warning-yellow" />
                <div><p className="text-sm font-semibold text-navy">Por vencer (30 días)</p><p className="text-xs text-gray-text">{municipalMockData.aboutToExpire} permisionarios</p></div>
              </div>
              <button className="rounded-lg bg-warning-yellow px-3 py-1.5 text-xs font-semibold text-navy">Enviar aviso</button>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-alert-red/10 p-3">
              <div className="flex items-center gap-3">
                <AlertTriangle className="size-5 text-alert-red" />
                <div><p className="text-sm font-semibold text-navy">Vencidos</p><p className="text-xs text-gray-text">{municipalMockData.expired} permisionarios</p></div>
              </div>
              <button className="rounded-lg bg-alert-red px-3 py-1.5 text-xs font-semibold text-white">Bloquear cobro</button>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-alert-red/10 p-3">
              <div className="flex items-center gap-3">
                <MessageSquare className="size-5 text-alert-red" />
                <div><p className="text-sm font-semibold text-navy">Reclamos pendientes</p><p className="text-xs text-gray-text">{municipalMockData.reclamosPendientes} sin resolver</p></div>
              </div>
              <button className="rounded-lg bg-alert-red px-3 py-1.5 text-xs font-semibold text-white">Revisar</button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-heading text-base font-semibold text-navy mb-4">Actividad reciente</h2>
          <div className="space-y-2">
            {payments.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-lg bg-gray-soft px-4 py-2.5 text-sm">
                <div className="flex items-center gap-2">
                  {p.method === "QR" ? <CreditCard className="size-4 text-sky" /> : <Banknote className="size-4 text-warning-yellow" />}
                  <span className="text-navy">{p.zone}</span>
                </div>
                <span className="text-gray-text">{p.time}</span>
                <span className="font-semibold text-navy">{money(p.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function ConductoresTab() {
  const conductores = [
    { name: "Laura Gómez", dni: "30.123.456", patente: "AB 123 CD", reservas: 8, status: "Activo" },
    { name: "Pedro Martínez", dni: "31.654.789", patente: "CD 456 EF", reservas: 3, status: "Activo" },
    { name: "Lucía Fernández", dni: "27.890.123", patente: "EF 789 GH", reservas: 12, status: "Activo" },
    { name: "Miguel Ángel Ruiz", dni: "33.456.789", patente: "GH 012 IJ", reservas: 0, status: "Inactivo" },
  ]
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-text">Usuarios conductores registrados en la plataforma.</p>
      {conductores.map((c, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">{c.name}</p>
                <p className="text-xs text-gray-text">DNI: {c.dni} · {c.patente}</p>
              </div>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${c.status === "Activo" ? "bg-approved-green/10 text-approved-green" : "bg-gray-soft text-gray-text"}`}>{c.status}</span>
          </div>
          <p className="mt-1 text-xs text-gray-text">Reservas realizadas: {c.reservas}</p>
        </div>
      ))}
    </div>
  )
}

function PermisionariosTab() {
  const allPermisionarios = [
    { id: "PD-0142", name: "Juan Pérez", zone: "Leguizamón", status: "Habilitado", vencimiento: "15/05/2027", servicio: "Aceptado" },
    { id: "PD-0143", name: "María García", zone: "Gorriti", status: "Habilitado", vencimiento: "20/08/2026", servicio: "Aceptado" },
    { id: "PD-0144", name: "Carlos Mendoza", zone: "España", status: "Por vencer", vencimiento: "10/06/2026", servicio: "Rechazado" },
    { id: "PD-0145", name: "Ana López", zone: "Caseros", status: "Vencido", vencimiento: "01/01/2026", servicio: "No asignado" },
    { id: "PD-0146", name: "Roberto Sánchez", zone: "Balcarce", status: "Suspendido", vencimiento: "15/03/2026", servicio: "No asignado" },
  ]
  return (
    <div className="space-y-4">
      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-text" />
        <input className="w-full rounded-xl border border-border bg-white py-2.5 pl-10 pr-4 text-sm text-navy placeholder:text-gray-text/50" placeholder="Buscar permisionario..." />
      </div>
      {allPermisionarios.map((p) => (
        <div key={p.id} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">{p.name}</p>
                <p className="text-xs text-gray-text">{p.id} · {p.zone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                p.status === "Habilitado" ? "bg-approved-green/10 text-approved-green" :
                p.status === "Por vencer" ? "bg-warning-yellow/10 text-warning-yellow" :
                p.status === "Vencido" ? "bg-alert-red/10 text-alert-red" : "bg-gray-soft text-gray-text"
              }`}>{p.status}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                p.servicio === "Aceptado" ? "bg-approved-green/10 text-approved-green" :
                p.servicio === "Rechazado" ? "bg-warning-yellow/10 text-warning-yellow" : "bg-gray-soft text-gray-text"
              }`}>{p.servicio}</span>
            </div>
          </div>
          <div className="mt-2 flex gap-2">
            <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-navy hover:bg-gray-soft">Asignar zona</button>
            <button className="rounded-lg bg-alert-red/10 px-3 py-1.5 text-xs font-medium text-alert-red hover:bg-alert-red/20">Suspender</button>
            <button className="rounded-lg bg-sky/10 px-3 py-1.5 text-xs font-medium text-sky hover:bg-sky/20">Ver servicios</button>
          </div>
        </div>
      ))}
    </div>
  )
}

function DocumentacionTab() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-text">Documentos pendientes de revisión municipal.</p>
      {[
        { name: "Juan Pérez", doc: "Certificado de residencia", status: "en-revision" },
        { name: "Ana López", doc: "Antecedentes nacionales", status: "cargado" },
        { name: "Carlos Mendoza", doc: "Declaración jurada", status: "en-revision" },
        { name: "Roberto Sánchez", doc: "Capacitación obligatoria", status: "cargado" },
      ].map((item, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-navy">{item.name}</p>
              <p className="text-xs text-gray-text">{item.doc}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
              item.status === "en-revision" ? "bg-warning-yellow/10 text-warning-yellow" : "bg-sky/10 text-sky"
            }`}>{item.status === "en-revision" ? "En revisión" : "Cargado"}</span>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="rounded-xl bg-approved-green px-4 py-1.5 text-xs font-semibold text-white">Aprobar</button>
            <button className="rounded-xl bg-alert-red px-4 py-1.5 text-xs font-semibold text-white">Rechazar</button>
            <button className="rounded-xl border border-border px-4 py-1.5 text-xs font-semibold text-gray-text">Ver</button>
          </div>
        </div>
      ))}
    </div>
  )
}

function VencimientosTab() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-text">Control de vencimientos de habilitación y documentación.</p>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Vigentes", value: "47", color: "text-approved-green" },
          { label: "Por vencer", value: "6", color: "text-warning-yellow" },
          { label: "Vencidos", value: "3", color: "text-alert-red" },
          { label: "Renovaciones pendientes", value: "9", color: "text-sky" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
            <p className={cn("text-2xl font-bold", s.color)}>{s.value}</p>
            <p className="text-xs text-gray-text">{s.label}</p>
          </div>
        ))}
      </div>
      {[
        { name: "Ana López", id: "PD-0145", vence: "30 días", action: "Enviar aviso" },
        { name: "Carlos Mendoza", id: "PD-0144", vence: "Vencido", action: "Bloquear cobro" },
        { name: "Roberto Sánchez", id: "PD-0146", vence: "Vencido", action: "Solicitar documentación" },
      ].map((item, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-navy">{item.name}</p>
              <p className="text-xs text-gray-text">{item.id}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.vence === "Vencido" ? "bg-alert-red/10 text-alert-red" : "bg-warning-yellow/10 text-warning-yellow"}`}>{item.vence}</span>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="rounded-xl bg-sky px-4 py-1.5 text-xs font-semibold text-white">{item.action}</button>
            <button className="rounded-xl border border-border px-4 py-1.5 text-xs font-semibold text-gray-text">Habilitar nuevamente</button>
          </div>
        </div>
      ))}
    </div>
  )
}

function ServiciosTab() {
  const servicios = [
    { name: "Juan Pérez", id: "PD-0142", option: "1ra opción", zona: "Leguizamón", horario: "12:00 - 20:00", estado: "Aceptado" },
    { name: "María García", id: "PD-0143", option: "1ra opción", zona: "Gorriti", horario: "08:00 - 16:00", estado: "Aceptado" },
    { name: "Carlos Mendoza", id: "PD-0144", option: "2da opción", zona: "España", horario: "08:00 - 21:00", estado: "Rechazado" },
    { name: "Pedro Gómez", id: "PD-0147", option: "1ra opción", zona: "Belgrano", horario: "10:00 - 18:00", estado: "Pendiente" },
  ]
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-text">Servicios asignados del día. Cada permisionario recibe hasta 2 opciones.</p>
      {servicios.map((s, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-navy">{s.name}</p>
              <p className="text-xs text-gray-text">{s.id} · {s.option}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
              s.estado === "Aceptado" ? "bg-approved-green/10 text-approved-green" :
              s.estado === "Rechazado" ? "bg-alert-red/10 text-alert-red" :
              "bg-warning-yellow/10 text-warning-yellow"
            }`}>{s.estado}</span>
          </div>
          <div className="mt-2 text-xs text-gray-text">
            {s.zona} · {s.horario}
          </div>
          {s.estado === "Pendiente" && (
            <div className="mt-3 flex gap-2">
              <button className="rounded-lg bg-approved-green px-3 py-1.5 text-xs font-semibold text-white">Asignar</button>
              <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-navy">Reasignar</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function ReservasTab() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-text">Reservas de estacionamiento activas e historial.</p>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <KpiCard icon={Calendar} label="Reservas activas" value={String(municipalMockData.activeReservas)} tone="turquoise" />
        <KpiCard icon={Calendar} label="Canceladas" value={String(municipalMockData.cancelledReservas)} tone="danger" />
        <KpiCard icon={Calendar} label="Total hoy" value={String(municipalMockData.activeReservas + municipalMockData.cancelledReservas)} tone="sky" />
      </div>
      {[
        { address: "Av. San Martín 1815", tramo: "Ituzaingó - Pellegrini", conductor: "Laura Gómez", horario: "14:30 - 15:30", status: "Activa" },
        { address: "Calle Mitre 320", tramo: "España - Pueyrredón", conductor: "Pedro Martínez", horario: "10:00 - 11:00", status: "Finalizada" },
        { address: "Av. Belgrano 550", tramo: "Balcarce - Caseros", conductor: "Lucía Fernández", horario: "09:00 - 10:00", status: "Finalizada" },
      ].map((r, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-navy">{r.address}</p>
              <p className="text-xs text-gray-text">{r.tramo} · {r.conductor}</p>
              <p className="text-xs text-gray-text">{r.horario}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
              r.status === "Activa" ? "bg-approved-green/10 text-approved-green" : "bg-gray-soft text-gray-text"
            }`}>{r.status}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function CobrosTab() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-text">Todos los cobros realizados en el sistema.</p>
      <div className="space-y-2">
        {payments.map((p) => (
          <div key={p.id} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {p.method === "QR" ? <CreditCard className="size-4 text-sky" /> : <Banknote className="size-4 text-warning-yellow" />}
                <div>
                  <p className="text-sm font-semibold text-navy">{money(p.amount)}</p>
                  <p className="text-xs text-gray-text">{p.date} · {p.time} · {p.zone}</p>
                </div>
              </div>
              <span className="text-xs text-gray-text">{p.operationCode}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReclamosTab() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-text">Reclamos de conductores pendientes de resolución.</p>
      {[
        { type: "Mal cobro", conductor: "Laura Gómez", desc: "Me cobraron $1600 en vez de $800", date: "29/05/2026", status: "Pendiente" },
        { type: "Permisionario no presente", conductor: "Pedro Martínez", desc: "No había nadie en la zona asignada", date: "28/05/2026", status: "Pendiente" },
        { type: "QR no funciona", conductor: "Lucía Fernández", desc: "El QR del permisionario no se escaneaba", date: "28/05/2026", status: "Resuelto" },
        { type: "Mala atención", conductor: "Miguel Ruiz", desc: "El permisionario fue grosero", date: "27/05/2026", status: "Pendiente" },
      ].map((r, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-navy">{r.type}</p>
              <p className="text-xs text-gray-text">{r.conductor} · {r.date}</p>
              <p className="text-xs text-gray-text mt-1">{r.desc}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
              r.status === "Pendiente" ? "bg-warning-yellow/10 text-warning-yellow" : "bg-approved-green/10 text-approved-green"
            }`}>{r.status}</span>
          </div>
          {r.status === "Pendiente" && (
            <div className="mt-3 flex gap-2">
              <button className="rounded-lg bg-approved-green px-3 py-1.5 text-xs font-semibold text-white">Resolver</button>
              <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-navy">Ver detalle</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function ZonasTab() {
  const zones = [
    { name: "Leguizamón", tramo: "Mitre - Balcarce", horario: "12:00 - 20:00", permisionario: "Juan Pérez", status: "Activa", ocupacion: "75%" },
    { name: "Gorriti", tramo: "San Martín - Alsina", horario: "08:00 - 20:00", permisionario: "María García", status: "Activa", ocupacion: "54%" },
    { name: "España", tramo: "Mitre - Balcarce", horario: "08:00 - 21:00", permisionario: "Carlos Mendoza", status: "Activa", ocupacion: "91%" },
    { name: "Caseros", tramo: "San Martín - Alsina", horario: "08:00 - 20:00", permisionario: "Sin asignar", status: "Inactiva", ocupacion: "42%" },
    { name: "San Martín", tramo: "Ituzaingó - Pellegrini", horario: "08:00 - 20:00", permisionario: "Sin asignar", status: "Activa", ocupacion: "68%" },
    { name: "Belgrano", tramo: "Balcarce - Caseros", horario: "10:00 - 18:00", permisionario: "Pedro Gómez", status: "Activa", ocupacion: "33%" },
  ]
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-text">Gestión de zonas, ocupación y permisionarios asignados.</p>
      <div className="grid gap-4 lg:grid-cols-2">
        {zones.map((z, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-heading text-base font-semibold text-navy">{z.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-text">Ocupación: {z.ocupacion}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                  z.status === "Activa" ? "bg-approved-green/10 text-approved-green" : "bg-gray-soft text-gray-text"
                }`}>{z.status}</span>
              </div>
            </div>
            <p className="text-xs text-gray-text">{z.tramo}</p>
            <p className="text-xs text-gray-text">{z.horario}</p>
            <p className="text-xs text-gray-text mt-1">Asignado: <span className="font-medium text-navy">{z.permisionario}</span></p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div className={cn("h-full rounded-full", parseInt(z.ocupacion) > 85 ? "bg-alert-red" : parseInt(z.ocupacion) > 60 ? "bg-warning-yellow" : "bg-turquoise")} style={{ width: z.ocupacion }} />
            </div>
            <div className="mt-3 flex gap-2">
              <button className="rounded-lg bg-sky/10 px-3 py-1.5 text-xs font-medium text-sky hover:bg-sky/20">Editar zona</button>
              <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-navy hover:bg-gray-soft">Reasignar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReportesTab() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-text">Reportes de recaudación, cumplimiento y ocupación.</p>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h3 className="font-heading text-base font-semibold text-navy mb-3">Recaudación</h3>
          <div className="space-y-3">
            {[
              { label: "Del día", value: money(municipalMockData.todayTotalRecaudado) },
              { label: "Semanal", value: money(municipalMockData.weeklyRecaudacion.reduce((a, b) => a + b, 0)) },
              { label: "Mensual", value: money(municipalMockData.monthlyRecaudacion) },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between rounded-lg bg-gray-soft px-4 py-2.5">
                <span className="text-sm text-gray-text">{r.label}</span>
                <span className="text-sm font-bold text-navy">{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h3 className="font-heading text-base font-semibold text-navy mb-3">Cumplimiento</h3>
          <div className="space-y-3">
            {[
              { label: "Permisionarios activos", value: `${municipalMockData.activePermisionarios} / ${municipalMockData.totalPermisionarios}` },
              { label: "Documentación al día", value: "38 / 47" },
              { label: "Servicios aceptados hoy", value: "12 / 15" },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between rounded-lg bg-gray-soft px-4 py-2.5">
                <span className="text-sm text-gray-text">{r.label}</span>
                <span className="text-sm font-bold text-navy">{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h3 className="font-heading text-base font-semibold text-navy mb-3">Conductores</h3>
          <div className="space-y-3">
            {[
              { label: "Registrados", value: String(municipalMockData.registeredConductores) },
              { label: "Reservas activas", value: String(municipalMockData.activeReservas) },
              { label: "Reclamos pendientes", value: String(municipalMockData.reclamosPendientes) },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between rounded-lg bg-gray-soft px-4 py-2.5">
                <span className="text-sm text-gray-text">{r.label}</span>
                <span className="text-sm font-bold text-navy">{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
