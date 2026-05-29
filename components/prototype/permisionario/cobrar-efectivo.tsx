"use client"

import { useState } from "react"
import { Banknote, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { permisionario, tariff } from "@/lib/prototype-data"
import { ScreenHeader, BigButton } from "../shared"
import type { PermisionarioScreen } from "../permisionario-app"

export function CobrarEfectivoScreen({ onNavigate }: { onNavigate: (s: PermisionarioScreen) => void }) {
  const [selectedDuration, setSelectedDuration] = useState(tariff.durationOptions[1])
  const [patente, setPatente] = useState("")
  const [step, setStep] = useState<"form" | "confirm" | "success">("form")

  const canCobrar =
    permisionario.status === "Habilitado" &&
    permisionario.zoneActive &&
    !permisionario.isSuspended

  const operationCode = `OP-2026-${String(Math.floor(Math.random() * 90000) + 10000)}`

  const handleConfirm = () => {
    setStep("confirm")
  }

  const handleSubmit = () => {
    setStep("success")
  }

  if (!canCobrar) {
    return (
      <div className="flex h-full flex-col bg-gray-soft">
        <ScreenHeader title="Cobrar en efectivo" onBack={() => onNavigate("main-panel")} />
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-alert-red/10">
            <AlertCircle className="size-8 text-alert-red" />
          </div>
          <h2 className="font-heading text-lg font-bold text-alert-red">No podés cobrar</h2>
          <p className="mt-2 text-sm text-gray-text">
            Tu perfil no está habilitado. Completá tu registro y documentación.
          </p>
          <button
            onClick={() => onNavigate("main-panel")}
            className="mt-6 rounded-2xl bg-navy px-8 py-3 font-heading text-sm font-semibold text-white"
          >
            Volver al panel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-gray-soft">
      <ScreenHeader title="Cobrar en efectivo" onBack={() => onNavigate("main-panel")} subtitle="Registrar cobro manual" />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {step === "form" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold text-gray-text uppercase tracking-wide">Tarifa oficial</p>
              <p className="font-heading text-3xl font-bold text-navy">
                ${selectedDuration.value.toLocaleString("es-AR")}
              </p>
              <p className="text-sm text-gray-text">{selectedDuration.label} de estacionamiento</p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy">Duración</label>
              <div className="grid grid-cols-3 gap-2">
                {tariff.durationOptions.slice(0, 6).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedDuration(opt)}
                    className={`rounded-xl border-2 px-3 py-2.5 text-center text-sm font-medium transition-colors ${
                      selectedDuration.value === opt.value
                        ? "border-sky bg-sky/10 text-sky"
                        : "border-border bg-white text-navy hover:border-sky/50"
                    }`}
                  >
                    <p className="font-semibold">${opt.value.toLocaleString("es-AR")}</p>
                    <p className="text-[10px] text-gray-text">{opt.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy">
                Patente del vehículo <span className="text-gray-text">(opcional)</span>
              </label>
              <input
                type="text"
                placeholder="Ej: AB 123 CD"
                value={patente}
                onChange={(e) => setPatente(e.target.value.toUpperCase())}
                maxLength={10}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-navy placeholder:text-gray-text/50 focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20"
              />
            </div>

            <div className="rounded-xl bg-warning-yellow/10 p-3">
              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 size-4 shrink-0 text-warning-yellow" />
                <p className="text-xs text-gray-text">
                  El cobro en efectivo solo puede hacerse respetando la tarifa oficial. Todos los cobros quedan registrados para control municipal.
                </p>
              </div>
            </div>

            <BigButton
              icon={Banknote}
              label="Registrar cobro en efectivo"
              onClick={handleConfirm}
              className="w-full"
            />
          </div>
        )}

        {step === "confirm" && (
          <div className="flex flex-col items-center pt-8">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-warning-yellow/20">
              <AlertCircle className="size-8 text-warning-yellow" />
            </div>
            <h2 className="font-heading text-lg font-bold text-navy">¿Confirmás este cobro en efectivo?</h2>

            <div className="mt-4 w-full rounded-2xl border border-border bg-white p-4 shadow-sm">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-text">Monto</span>
                  <span className="font-semibold text-navy">${selectedDuration.value.toLocaleString("es-AR")}</span>
                </div>
                {patente && (
                  <div className="flex justify-between">
                    <span className="text-gray-text">Patente</span>
                    <span className="font-semibold text-navy">{patente}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-text">Duración</span>
                  <span className="font-semibold text-navy">{selectedDuration.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-text">Zona</span>
                  <span className="font-semibold text-navy">{permisionario.zone}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex w-full gap-3">
              <button
                onClick={handleSubmit}
                className="flex-1 rounded-2xl bg-approved-green py-4 font-heading text-base font-semibold text-white shadow-md"
              >
                Confirmar
              </button>
              <button
                onClick={() => setStep("form")}
                className="flex-1 rounded-2xl border-2 border-navy py-4 font-heading text-base font-semibold text-navy"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="space-y-4">
            <div className="flex flex-col items-center rounded-2xl border-2 border-approved-green/30 bg-approved-green/5 p-6 shadow-sm">
              <div className="mb-3 flex size-14 items-center justify-center rounded-full bg-approved-green">
                <CheckCircle className="size-8 text-white" />
              </div>
              <h2 className="font-heading text-lg font-bold text-approved-green">
                Cobro en efectivo registrado
              </h2>
              <div className="mt-4 w-full space-y-2 text-sm">
                <div className="flex justify-between border-b border-border pb-1.5">
                  <span className="text-gray-text">Monto</span>
                  <span className="font-semibold text-navy">${selectedDuration.value.toLocaleString("es-AR")}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-1.5">
                  <span className="text-gray-text">Zona</span>
                  <span className="font-semibold text-navy">{permisionario.zone}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-1.5">
                  <span className="text-gray-text">Horario</span>
                  <span className="font-semibold text-navy">{permisionario.schedule}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-1.5">
                  <span className="text-gray-text">Fecha</span>
                  <span className="font-semibold text-navy">{new Date().toLocaleString("es-AR")}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-1.5">
                  <span className="text-gray-text">Permisionario</span>
                  <span className="font-semibold text-navy">{permisionario.municipalCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-text">Código de operación</span>
                  <span className="font-semibold text-navy">{operationCode}</span>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-gray-text">
              Registrar el efectivo ayuda a mantener transparencia y control municipal.
            </p>

            <BigButton
              label="Nuevo cobro en efectivo"
              onClick={() => { setStep("form"); setPatente("") }}
              className="w-full"
            />
            <BigButton
              label="Volver al panel"
              onClick={() => onNavigate("main-panel")}
              variant="outline"
              className="w-full"
            />
          </div>
        )}
      </div>
    </div>
  )
}
