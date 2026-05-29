"use client"

import { useState } from "react"
import { Save, ChevronLeft } from "lucide-react"
import { BigButton, ScreenHeader } from "../shared"
import type { PermisionarioScreen } from "../permisionario-app"

const fields = [
  { id: "name", label: "Nombre completo", type: "text", placeholder: "Ej: Juan Pérez" },
  { id: "dni", label: "DNI", type: "text", placeholder: "Ej: 28.456.789" },
  { id: "cuil", label: "CUIL", type: "text", placeholder: "Ej: 20-28456789-8" },
  { id: "birthDate", label: "Fecha de nacimiento", type: "date", placeholder: "" },
  { id: "phone", label: "Teléfono", type: "tel", placeholder: "Ej: 387 512-3456" },
  { id: "email", label: "Correo electrónico", type: "email", placeholder: "Ej: juan@email.com" },
  { id: "address", label: "Domicilio actual", type: "text", placeholder: "Ej: Av. San Martín 1234" },
  { id: "barrio", label: "Barrio", type: "text", placeholder: "Ej: Centro" },
  { id: "city", label: "Ciudad", type: "text", placeholder: "Ej: Salta" },
  { id: "province", label: "Provincia", type: "text", placeholder: "Ej: Salta" },
  { id: "emergencyContact", label: "Contacto de emergencia", type: "text", placeholder: "Nombre completo" },
  { id: "emergencyPhone", label: "Teléfono del contacto", type: "tel", placeholder: "Ej: 387 598-7654" },
]

export function CreateProfileScreen({ onNavigate }: { onNavigate: (s: PermisionarioScreen) => void }) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [saved, setSaved] = useState(false)

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => onNavigate("documents"), 1500)
  }

  if (saved) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-navy px-6 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-approved-green/20">
          <Save className="size-8 text-approved-green" />
        </div>
        <h2 className="font-heading text-xl font-bold text-white">Datos guardados</h2>
        <p className="mt-2 text-sm text-white/70">
          Tus datos serán revisados para crear tu perfil como Permisionario Digital.
        </p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-gray-soft">
      <ScreenHeader title="Crear mi perfil" onBack={() => onNavigate("welcome")} />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="mb-4 text-sm text-gray-text">
          Completá tus datos personales para registrarte como Permisionario Digital.
        </p>

        <div className="space-y-3">
          {fields.map((f) => (
            <div key={f.id}>
              <label className="mb-1 block text-sm font-medium text-navy">{f.label}</label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={formData[f.id] || ""}
                onChange={(e) => handleChange(f.id, e.target.value)}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-navy placeholder:text-gray-text/50 focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20"
              />
            </div>
          ))}
        </div>

        <div className="mt-6">
          <BigButton
            icon={Save}
            label="Guardar mis datos"
            onClick={handleSave}
            className="w-full"
          />
        </div>

        <p className="mt-4 text-center text-xs text-gray-text">
          Tus datos serán revisados para crear tu perfil como Permisionario Digital.
        </p>
      </div>
    </div>
  )
}
