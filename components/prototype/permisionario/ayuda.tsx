"use client"

import { useState } from "react"
import {
  HelpCircle,
  CreditCard,
  User,
  Upload,
  QrCode,
  Calendar,
  Building2,
  Send,
  CheckCircle,
} from "lucide-react"
import { ScreenHeader, BigButton } from "../shared"
import type { PermisionarioScreen } from "../permisionario-app"

const helpOptions = [
  { id: "cobro", label: "Problema con un cobro", icon: CreditCard },
  { id: "perfil", label: "Problema con mi perfil", icon: User },
  { id: "documentos", label: "No puedo subir documentos", icon: Upload },
  { id: "qr", label: "No puedo generar QR", icon: QrCode },
  { id: "vencimiento", label: "Mi habilitación venció", icon: Calendar },
  { id: "municipal", label: "Necesito asistencia municipal", icon: Building2 },
]

export function AyudaScreen({ onNavigate }: { onNavigate: (s: PermisionarioScreen) => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setSelected(null)
    }, 3000)
  }

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-navy px-6 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-approved-green/20">
          <CheckCircle className="size-8 text-approved-green" />
        </div>
        <h2 className="font-heading text-xl font-bold text-white">Solicitud enviada</h2>
        <p className="mt-2 text-sm text-white/70">
          Te responderemos a la brevedad. También podés acercarte a la Mesa de Atención Municipal.
        </p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-gray-soft">
      <ScreenHeader title="Ayuda" onBack={() => onNavigate("main-panel")} />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="mb-4 text-sm text-gray-text">
          Seleccioná el tipo de problema que tenés:
        </p>

        <div className="space-y-3">
          {helpOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${
                selected === opt.id
                  ? "border-sky bg-sky/5"
                  : "border-border bg-white hover:border-sky/50"
              }`}
            >
              <span className={`flex size-12 items-center justify-center rounded-xl ${
                selected === opt.id ? "bg-sky text-white" : "bg-gray-soft text-sky"
              }`}>
                <opt.icon className="size-6" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-navy">{opt.label}</p>
              </div>
            </button>
          ))}
        </div>

        {selected && (
          <div className="mt-6">
            <div className="mb-4 rounded-xl bg-gray-soft p-4">
              <label className="mb-1.5 block text-sm font-medium text-navy">Describí tu problema</label>
              <textarea
                rows={3}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-navy placeholder:text-gray-text/50 focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20"
                placeholder="Contanos qué te está pasando..."
              />
            </div>
            <BigButton
              icon={Send}
              label="Enviar solicitud"
              onClick={handleSend}
              className="w-full"
            />
          </div>
        )}

        <div className="mt-6 rounded-2xl border border-sky/20 bg-sky/5 p-4">
          <h3 className="text-sm font-semibold text-navy mb-2">Atención presencial</h3>
          <p className="text-xs text-gray-text">
            También podés acercarte a la Mesa de Atención Municipal en Av. San Martín 1500, de 8:00 a 18:00 hs.
          </p>
        </div>
      </div>
    </div>
  )
}
