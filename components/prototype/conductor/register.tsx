"use client"

import { useState } from "react"
import { UserPlus, Car, Mail, Phone, CreditCard, Lock } from "lucide-react"
import { BigButton, ScreenHeader } from "../shared"
import type { ConductorScreen } from "../conductor-app"

const fields = [
  { id: "name", label: "Nombre completo", type: "text", icon: UserPlus, placeholder: "Ej: Laura Gómez" },
  { id: "dni", label: "DNI", type: "text", icon: UserPlus, placeholder: "Ej: 30.123.456" },
  { id: "phone", label: "Teléfono", type: "tel", icon: Phone, placeholder: "Ej: 387 511-2233" },
  { id: "email", label: "Correo electrónico", type: "email", icon: Mail, placeholder: "Ej: laura@email.com" },
  { id: "patente", label: "Patente del vehículo", type: "text", icon: Car, placeholder: "Ej: AB 123 CD" },
  { id: "payment", label: "Método de pago preferido", type: "select", icon: CreditCard, options: ["Mercado Pago", "MODO", "Visa", "Mastercard", "Otra billetera"] },
  { id: "password", label: "Contraseña", type: "password", icon: Lock, placeholder: "Mínimo 6 caracteres" },
]

export function RegisterScreen({ onNavigate }: { onNavigate: (s: ConductorScreen) => void }) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [saved, setSaved] = useState(false)

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => onNavigate("main-panel"), 1500)
  }

  if (saved) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-navy px-6 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-approved-green/20">
          <UserPlus className="size-8 text-approved-green" />
        </div>
        <h2 className="font-heading text-xl font-bold text-white">Cuenta creada</h2>
        <p className="mt-2 text-sm text-white/70">
          Tus datos se usarán para reservar estacionamiento, recibir tickets virtuales y gestionar tus pagos.
        </p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-gray-soft">
      <ScreenHeader title="Registrarme como conductor" />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="mb-4 text-sm text-gray-text">
          Completá tus datos para crear tu cuenta de conductor.
        </p>

        <div className="space-y-3">
          {fields.map((f) => (
            <div key={f.id}>
              <label className="mb-1 block text-sm font-medium text-navy">{f.label}</label>
              {f.type === "select" ? (
                <select
                  value={formData[f.id] || f.options?.[0]}
                  onChange={(e) => handleChange(f.id, e.target.value)}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-navy focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20"
                >
                  {f.options?.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={formData[f.id] || ""}
                  onChange={(e) => handleChange(f.id, e.target.value)}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-navy placeholder:text-gray-text/50 focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <BigButton icon={UserPlus} label="Crear cuenta" onClick={handleSave} className="w-full" />
        </div>

        <p className="mt-4 text-center text-xs text-gray-text">
          Tus datos se usarán para reservar estacionamiento, recibir tickets virtuales y gestionar tus pagos.
        </p>
      </div>
    </div>
  )
}
