"use client"

import { User, Car, Mail, Phone, CreditCard, ShieldCheck } from "lucide-react"
import { conductor } from "@/lib/prototype-data"
import { ScreenHeader, InfoRow } from "../shared"
import type { ConductorScreen } from "../conductor-app"

export function ProfileScreen({ onNavigate }: { onNavigate: (s: ConductorScreen) => void }) {
  return (
    <div className="flex h-full flex-col bg-gray-soft">
      <ScreenHeader title="Mi perfil" onBack={() => onNavigate("main-panel")} />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-4 flex flex-col items-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-navy text-2xl font-bold text-white shadow-md">
            {conductor.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <h2 className="mt-3 font-heading text-lg font-bold text-navy">{conductor.name}</h2>
          <span className="flex items-center gap-1.5 text-xs text-approved-green">
            <ShieldCheck className="size-3.5" /> Cuenta activa
          </span>
        </div>

        <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
          <div className="divide-y divide-border">
            <InfoRow label="DNI" value={conductor.dni} />
            <InfoRow label="Teléfono" value={conductor.phone} />
            <InfoRow label="Correo" value={conductor.email} />
            <InfoRow label="Patente" value={conductor.patente} />
            <InfoRow label="Método de pago" value={conductor.paymentMethod} />
          </div>
        </div>

        <button
          onClick={() => onNavigate("main-panel")}
          className="mt-6 w-full rounded-2xl border-2 border-navy py-3.5 text-center font-heading text-sm font-semibold text-navy"
        >
          Volver al panel
        </button>
      </div>
    </div>
  )
}
