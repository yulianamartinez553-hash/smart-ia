"use client"

import { useState } from "react"
import { AlertTriangle, Upload, MapPin, Send, CheckCircle } from "lucide-react"
import { activeReservation } from "@/lib/prototype-data"
import { ScreenHeader, BigButton } from "../shared"
import type { ConductorScreen } from "../conductor-app"

const claimTypes = [
  "Mal cobro",
  "Mala atención",
  "Problema con la reserva",
  "Permisionario no presente",
  "QR no funciona",
  "Cobro distinto al monto oficial",
  "Otro problema",
]

export function ClaimsScreen({ onNavigate }: { onNavigate: (s: ConductorScreen) => void }) {
  const [claimType, setClaimType] = useState("")
  const [description, setDescription] = useState("")
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    setSent(true)
    setTimeout(() => onNavigate("main-panel"), 2000)
  }

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-navy px-6 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-approved-green/20">
          <CheckCircle className="size-8 text-approved-green" />
        </div>
        <h2 className="font-heading text-xl font-bold text-white">Reclamo enviado</h2>
        <p className="mt-2 text-sm text-white/70">Tu reclamo será revisado por la Municipalidad.</p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-gray-soft">
      <ScreenHeader title="Reclamos" onBack={() => onNavigate("main-panel")} />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="mb-4 text-sm text-gray-text">Seleccioná el tipo de reclamo y completá los detalles.</p>

        <p className="text-sm font-semibold text-navy mb-2">Tipo de reclamo</p>
        <div className="space-y-2 mb-4">
          {claimTypes.map((t) => (
            <button
              key={t}
              onClick={() => setClaimType(t)}
              className={`flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition-colors ${
                claimType === t ? "border-sky bg-sky/5" : "border-border bg-white"
              }`}
            >
              <span className={`flex size-9 items-center justify-center rounded-lg ${
                claimType === t ? "bg-sky text-white" : "bg-gray-soft text-sky"
              }`}>
                <AlertTriangle className="size-4" />
              </span>
              <span className="text-sm font-medium text-navy">{t}</span>
            </button>
          ))}
        </div>

        <label className="mb-1.5 block text-sm font-medium text-navy">Descripción</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describí el problema..."
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-navy placeholder:text-gray-text/50 focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20"
        />

        <div className="mt-4 space-y-3">
          <button className="flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-border bg-white px-5 py-4 text-sm font-medium text-gray-text">
            <Upload className="size-5 text-sky" />
            Adjuntar foto o comprobante
          </button>

          <div className="flex items-center gap-2 rounded-xl bg-gray-soft px-4 py-3 text-sm">
            <MapPin className="size-4 text-sky" />
            <span className="text-gray-text">Ubicación automática: {activeReservation.address}</span>
          </div>

          <div className="rounded-xl bg-gray-soft px-4 py-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-text">Código de reserva</span>
              <span className="font-medium text-navy">{activeReservation.code}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-gray-text">Código de permisionario</span>
              <span className="font-medium text-navy">{activeReservation.permisionarioId}</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <BigButton
            icon={Send}
            label="Enviar reclamo"
            onClick={handleSend}
            disabled={!claimType}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}
