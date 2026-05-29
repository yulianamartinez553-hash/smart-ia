"use client"

import { useState } from "react"
import { QrCode, CheckCircle, Loader2, XCircle, DollarSign, Clock, MapPin, AlertTriangle } from "lucide-react"
import { permisionario, tariff } from "@/lib/prototype-data"
import { ScreenHeader, BigButton, InfoRow } from "../shared"
import type { PermisionarioScreen } from "../permisionario-app"

export function CobrarQRScreen({ onNavigate }: { onNavigate: (s: PermisionarioScreen) => void }) {
  const [hours, setHours] = useState(1)
  const [step, setStep] = useState<"form" | "confirm" | "generating" | "qr" | "waiting" | "received">("form")

  const canCobrar =
    permisionario.status === "Habilitado" &&
    permisionario.zoneActive &&
    !permisionario.isSuspended &&
    permisionario.serviceAccepted

  const totalAmount = tariff.amount * hours
  const operationCode = `OP-2026-${String(Math.floor(Math.random() * 90000) + 10000)}`

  const handleGenerateQR = () => {
    setStep("confirm")
  }

  const handleConfirm = () => {
    setStep("generating")
    setTimeout(() => setStep("qr"), 1000)
  }

  const handlePaymentReceived = () => {
    setStep("waiting")
    setTimeout(() => setStep("received"), 2000)
  }

  if (!canCobrar) {
    return (
      <div className="flex h-full flex-col bg-gray-soft">
        <ScreenHeader title="Cobrar" onBack={() => onNavigate("main-panel")} />
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-alert-red/10">
            <XCircle className="size-8 text-alert-red" />
          </div>
          <h2 className="font-heading text-lg font-bold text-alert-red">No podés cobrar</h2>
          <div className="mt-3 space-y-1 text-sm text-gray-text">
            {!permisionario.serviceAccepted && <p>Servicio no aceptado hoy.</p>}
            {permisionario.status !== "Habilitado" && <p>Perfil no habilitado.</p>}
            {permisionario.isSuspended && <p>Perfil suspendido.</p>}
          </div>
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
      <ScreenHeader title="Cobrar" onBack={() => onNavigate("main-panel")} />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {step === "form" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-navy mb-3">Tu ubicación de trabajo</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="size-4 text-sky" />
                  <span className="text-navy font-medium">{permisionario.zoneStreet}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="size-4 text-sky" />
                  <span className="text-gray-text">{permisionario.zoneTramo}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="size-4 text-sky" />
                  <span className="text-gray-text">{permisionario.schedule}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-navy mb-3">Tarifa oficial: ${tariff.amount.toLocaleString("es-AR")}/hora</p>
              <label className="mb-1.5 block text-sm font-medium text-navy">
                Cantidad de horas
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setHours(Math.max(1, hours - 1))}
                  className="flex size-12 items-center justify-center rounded-xl border-2 border-navy text-lg font-bold text-navy"
                >
                  -
                </button>
                <div className="flex-1 text-center">
                  <p className="font-heading text-4xl font-bold text-navy">{hours}</p>
                  <p className="text-xs text-gray-text">{hours === 1 ? "hora" : "horas"}</p>
                </div>
                <button
                  onClick={() => setHours(Math.min(8, hours + 1))}
                  className="flex size-12 items-center justify-center rounded-xl border-2 border-navy text-lg font-bold text-navy"
                >
                  +
                </button>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-sky/30 bg-sky/5 p-4 text-center shadow-sm">
              <p className="text-sm text-gray-text">Monto total</p>
              <p className="font-heading text-4xl font-bold text-navy">
                ${totalAmount.toLocaleString("es-AR")}
              </p>
            </div>

            <BigButton
              icon={QrCode}
              label="Generar QR de pago"
              onClick={handleGenerateQR}
              className="w-full"
            />
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-4">
            <div className="flex flex-col items-center pt-4">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-warning-yellow/20">
                <AlertTriangle className="size-8 text-warning-yellow" />
              </div>
              <h2 className="font-heading text-lg font-bold text-navy">Confirmar cobro</h2>
            </div>

            <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
              <div className="divide-y divide-border">
                <InfoRow label="Zona" value={permisionario.zone} />
                <InfoRow label="Dirección" value={permisionario.zoneStreet} />
                <InfoRow label="Horario" value={permisionario.schedule} />
                <InfoRow label="Cantidad de horas" value={String(hours)} />
                <InfoRow label="Monto total" value={`$${totalAmount.toLocaleString("es-AR")}`} />
                <InfoRow label="Código permisionario" value={permisionario.municipalCode} />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleConfirm}
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

        {step === "generating" && (
          <div className="flex flex-col items-center py-12">
            <Loader2 className="size-12 animate-spin text-sky" />
            <p className="mt-3 text-sm font-medium text-navy">Generando QR...</p>
          </div>
        )}

        {step === "qr" && (
          <div className="space-y-4">
            <div className="flex flex-col items-center rounded-2xl border-2 border-sky/30 bg-white p-6 shadow-sm">
              <div className="mb-3 flex size-48 items-center justify-center rounded-xl bg-white p-2 shadow-md">
                <div className="flex size-full flex-col items-center justify-center bg-white">
                  <div className="grid grid-cols-7 gap-0.5">
                    {Array.from({ length: 49 }).map((_, i) => (
                      <div
                        key={i}
                        className={`size-4 rounded-sm ${
                          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 14, 21, 28, 35, 42, 43, 44, 45, 46, 47, 48].includes(i)
                            ? "bg-navy"
                            : [10, 11, 16, 17, 22, 24, 30, 32, 38, 40].includes(i)
                            ? "bg-sky"
                            : "bg-white"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="font-heading text-2xl font-bold text-navy">
                ${totalAmount.toLocaleString("es-AR")}
              </p>
              <p className="text-xs text-gray-text">{permisionario.zoneStreet} · {hours}h</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <span className="rounded-full bg-sky/10 px-3 py-1 text-[10px] font-medium text-sky">Mercado Pago</span>
                <span className="rounded-full bg-sky/10 px-3 py-1 text-[10px] font-medium text-sky">MODO</span>
                <span className="rounded-full bg-sky/10 px-3 py-1 text-[10px] font-medium text-sky">Billeteras</span>
              </div>
              <div className="mt-3 w-full space-y-1 text-[10px] text-gray-text text-center">
                <p>Permisionario: {permisionario.municipalCode}</p>
                <p>Operación: {operationCode}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-sky/10 px-4 py-3">
              <Clock className="size-4 text-sky" />
              <p className="text-xs text-gray-text">Estado: esperando pago</p>
            </div>

            <BigButton
              icon={QrCode}
              label="Simular pago recibido"
              onClick={handlePaymentReceived}
              variant="success"
              className="w-full"
            />
          </div>
        )}

        {step === "waiting" && (
          <div className="flex flex-col items-center py-12">
            <Loader2 className="size-12 animate-spin text-warning-yellow" />
            <p className="mt-3 font-heading text-base font-semibold text-warning-yellow">Esperando pago...</p>
            <p className="text-xs text-gray-text">El conductor está realizando el pago</p>
          </div>
        )}

        {step === "received" && (
          <div className="space-y-4">
            <div className="flex flex-col items-center rounded-2xl border-2 border-approved-green/30 bg-approved-green/5 p-6 shadow-sm">
              <div className="mb-3 flex size-14 items-center justify-center rounded-full bg-approved-green">
                <CheckCircle className="size-8 text-white" />
              </div>
              <h2 className="font-heading text-lg font-bold text-approved-green">
                Pago recibido
              </h2>
              <p className="text-xs text-gray-text mt-1">
                Ticket virtual generado y enviado al correo del cliente.
              </p>
              <div className="mt-4 w-full space-y-2 text-sm">
                <div className="flex justify-between border-b border-border pb-1.5">
                  <span className="text-gray-text">Monto</span>
                  <span className="font-semibold text-navy">${totalAmount.toLocaleString("es-AR")}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-1.5">
                  <span className="text-gray-text">Zona</span>
                  <span className="font-semibold text-navy">{permisionario.zone}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-1.5">
                  <span className="text-gray-text">ID de operación</span>
                  <span className="font-semibold text-navy">{operationCode}</span>
                </div>
              </div>
            </div>

            <BigButton label="Nuevo cobro" onClick={() => { setStep("form"); setHours(1) }} className="w-full" />
            <BigButton label="Volver al panel" onClick={() => onNavigate("main-panel")} variant="outline" className="w-full" />
          </div>
        )}
      </div>
    </div>
  )
}
