import type { ReactNode } from "react"
import { ChevronLeft, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function ScreenHeader({
  title,
  onBack,
  right,
  subtitle,
}: {
  title: string
  onBack?: () => void
  right?: ReactNode
  subtitle?: string
}) {
  return (
    <div className="sticky top-0 z-10 flex items-center gap-3 bg-navy px-4 py-3.5 text-white">
      {onBack && (
        <button
          onClick={onBack}
          aria-label="Volver"
          className="-ml-1 flex size-9 items-center justify-center rounded-full transition-colors hover:bg-white/10"
        >
          <ChevronLeft className="size-6" />
        </button>
      )}
      <div className="min-w-0 flex-1">
        <h1 className="font-heading text-lg font-semibold leading-tight">{title}</h1>
        {subtitle && <p className="truncate text-xs text-white/60">{subtitle}</p>}
      </div>
      {right}
    </div>
  )
}

export function BigButton({
  icon: Icon,
  label,
  onClick,
  variant = "primary",
  className,
  disabled,
}: {
  icon?: React.ElementType
  label: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "outline" | "success" | "danger" | "warning"
  className?: string
  disabled?: boolean
}) {
  const base = "flex items-center justify-center gap-3 rounded-2xl font-heading font-semibold transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
  const variants: Record<string, string> = {
    primary: "bg-navy text-white hover:bg-navy-2 shadow-md",
    secondary: "bg-sky text-white hover:bg-sky/90 shadow-md",
    success: "bg-approved-green text-white hover:bg-approved-green/90",
    danger: "bg-alert-red text-white hover:bg-alert-red/90",
    warning: "bg-warning-yellow text-navy hover:bg-warning-yellow/90",
    outline: "border-2 border-navy bg-white text-navy hover:bg-gray-soft",
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variants[variant], "h-14 px-6 text-base", className)}
    >
      {Icon && <Icon className="size-6 shrink-0" />}
      {label}
    </button>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "falta-cargar": "bg-gray-soft text-gray-text border border-border",
    cargado: "bg-sky/10 text-sky border border-sky/30",
    "en-revision": "bg-warning-yellow/10 text-warning-yellow border border-warning-yellow/30",
    aprobado: "bg-approved-green/10 text-approved-green border border-approved-green/30",
    rechazado: "bg-alert-red/10 text-alert-red border border-alert-red/30",
    "vence-pronto": "bg-warning-yellow/10 text-warning-yellow border border-warning-yellow/30",
    vencido: "bg-alert-red/10 text-alert-red border border-alert-red/30",
    pending: "bg-warning-yellow/10 text-warning-yellow border border-warning-yellow/30",
    confirmed: "bg-approved-green/10 text-approved-green border border-approved-green/30",
    waiting: "bg-sky/10 text-sky border border-sky/30",
    active: "bg-approved-green/10 text-approved-green border border-approved-green/30",
    cancelled: "bg-alert-red/10 text-alert-red border border-alert-red/30",
    finished: "bg-gray-soft text-gray-text border border-border",
  }
  const labels: Record<string, string> = {
    "falta-cargar": "Falta cargar",
    cargado: "Cargado",
    "en-revision": "En revisión",
    aprobado: "Aprobado",
    rechazado: "Rechazado",
    "vence-pronto": "Vence pronto",
    vencido: "Vencido",
    pending: "Pendiente",
    confirmed: "Confirmada",
    waiting: "En espera",
    active: "Activa",
    cancelled: "Cancelada",
    finished: "Finalizada",
  }
  return (
    <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", styles[status] || styles["falta-cargar"])}>
      {labels[status] || status}
    </span>
  )
}

export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-gray-text">{label}</span>
      <span className="text-sm font-medium text-navy">{value}</span>
    </div>
  )
}
