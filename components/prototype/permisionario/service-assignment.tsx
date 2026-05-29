"use client"

import { useState } from "react"
import { MapPin, Clock, CheckCircle, XCircle, AlertTriangle, DollarSign } from "lucide-react"
import { serviceOptions } from "@/lib/prototype-data"
import { ScreenHeader, BigButton } from "../shared"
import type { PermisionarioScreen } from "../permisionario-app"

export function ServiceAssignmentScreen({ onNavigate }: { onNavigate: (s: PermisionarioScreen) => void }) {
  const [step, setStep] = useState<"option-1" | "option-2" | "accepted" | "rejected">("option-1")
  const [optionIndex, setOptionIndex] = useState(0)

  const currentOption = optionIndex === 0 ? serviceOptions[0] : serviceOptions[1]

  const handleAccept = () => {
    setStep("accepted")
    setTimeout(() => onNavigate("main-panel"), 2000)
  }

  const handleReject = () => {
    if (optionIndex === 0) {
      setOptionIndex(1)
      setStep("option-2")
    } else {
      setStep("rejected")
      setTimeout(() => onNavigate("main-panel"), 3000)
    }
  }

  if (step === "accepted") {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-navy px-6 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-approved-green/20">
          <CheckCircle className="size-8 text-approved-green" />
        </div>
        <h2 className="font-heading text-xl font-bold text-white">Servicio aceptado</h2>
        <p className="mt-2 text-sm text-white/70">
          {currentOption.zone} · {currentOption.schedule}
        </p>
        <p className="mt-1 text-xs text-white/50">Código de servicio: {currentOption.id.toUpperCase()}</p>
      </div>
    )
  }

  if (step === "rejected") {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-navy px-6 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-warning-yellow/20">
          <XCircle className="size-8 text-warning-yellow" />
        </div>
        <h2 className="font-heading text-xl font-bold text-white">
          No aceptaste las opciones de servicio de hoy
        </h2>
        <p className="mt-2 text-sm text-white/70">
          Tu perfil quedará no habilitado hasta mañana.
        </p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-gray-soft">
      <ScreenHeader
        title="Servicio del día"
        subtitle={optionIndex === 0 ? "Primera opción" : "Segunda opción"}
      />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="rounded-2xl border-2 border-sky/30 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex size-10 items-center justify-center rounded-xl bg-sky">
              <MapPin className="size-5 text-white" />
            </span>
            <div>
              <p className="font-heading text-base font-semibold text-navy">{currentOption.zone}</p>
              <p className="text-xs text-gray-text">Zona asignada</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-xl bg-gray-soft px-4 py-3">
              <MapPin className="size-4 text-sky" />
              <div>
                <p className="text-[10px] text-gray-text uppercase">Calle</p>
                <p className="text-sm font-medium text-navy">{currentOption.street}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-gray-soft px-4 py-3">
              <MapPin className="size-4 text-sky" />
              <div>
                <p className="text-[10px] text-gray-text uppercase">Tramo</p>
                <p className="text-sm font-medium text-navy">{currentOption.tramo}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-gray-soft px-4 py-3">
              <Clock className="size-4 text-sky" />
              <div>
                <p className="text-[10px] text-gray-text uppercase">Horario</p>
                <p className="text-sm font-medium text-navy">{currentOption.schedule}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-gray-soft px-4 py-3">
              <DollarSign className="size-4 text-sky" />
              <div>
                <p className="text-[10px] text-gray-text uppercase">Tarifa</p>
                <p className="text-sm font-medium text-navy">{currentOption.tariff}</p>
              </div>
            </div>
          </div>
        </div>

        {optionIndex === 1 && (
          <div className="mt-3 flex items-start gap-2 rounded-xl bg-warning-yellow/10 p-3">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning-yellow" />
            <p className="text-xs text-gray-text">
              Esta es tu segunda y última opción. Si la rechazás, no podrás trabajar hoy.
            </p>
          </div>
        )}

        <div className="mt-6 space-y-3">
          <BigButton
            icon={CheckCircle}
            label="Aceptar servicio"
            onClick={handleAccept}
            variant="success"
            className="w-full"
          />
          <BigButton
            icon={XCircle}
            label="Rechazar servicio"
            onClick={handleReject}
            variant={optionIndex === 0 ? "outline" : "danger"}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}
