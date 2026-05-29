"use client"

import { useState, useEffect } from "react"
import { MapPin, Clock, QrCode, XCircle, CheckCircle, Timer, AlertTriangle } from "lucide-react"
import { activeReservation } from "@/lib/prototype-data"
import { ScreenHeader, BigButton, StatusBadge, InfoRow } from "../shared"
import type { ConductorScreen } from "../conductor-app"

export function ReservationScreen({ onNavigate }: { onNavigate: (s: ConductorScreen) => void }) {
  const res = activeReservation
  const [timeLeft, setTimeLeft] = useState(600)
  const [cancelled, setCancelled] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0 || cancelled) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft, cancelled])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const isExpired = timeLeft <= 0

  if (cancelled) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-navy px-6 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-alert-red/20">
          <XCircle className="size-8 text-alert-red" />
        </div>
        <h2 className="font-heading text-xl font-bold text-white">Reserva cancelada</h2>
        <p className="mt-2 text-sm text-white/70">Podés generar una nueva reserva cuando quieras.</p>
        <BigButton label="Volver al panel" onClick={() => onNavigate("main-panel")} variant="outline" className="mt-6 w-full !border-white/30 !text-white hover:!bg-white/10" />
      </div>
    )
  }

  if (isExpired) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-navy px-6 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-alert-red/20">
          <Timer className="size-8 text-alert-red" />
        </div>
        <h2 className="font-heading text-xl font-bold text-alert-red">Tiempo de tolerancia agotado</h2>
        <p className="mt-2 text-sm text-white/70">La reserva se liberó. Podés generar una nueva.</p>
        <BigButton label="Volver al panel" onClick={() => onNavigate("main-panel")} variant="outline" className="mt-6 w-full !border-white/30 !text-white hover:!bg-white/10" />
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-gray-soft">
      <ScreenHeader title="Mi reserva" onBack={() => onNavigate("main-panel")} />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-4 rounded-2xl border-2 border-sky/30 bg-sky/5 p-5 text-center shadow-sm">
          <div className="mx-auto mb-2 flex size-14 items-center justify-center rounded-full bg-sky">
            <CheckCircle className="size-7 text-white" />
          </div>
          <h2 className="font-heading text-lg font-bold text-navy">Reserva confirmada</h2>
          <div className="mt-3">
            <p className="text-sm text-gray-text">Tiempo para llegar</p>
            <p className={`font-heading text-3xl font-bold ${minutes < 3 ? "text-alert-red" : "text-navy"}`}>
              {minutes}:{seconds.toString().padStart(2, "0")}
            </p>
            <p className="text-xs text-gray-text">Tolerancia: 10 minutos</p>
          </div>
          {minutes < 3 && (
            <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-alert-red">
              <AlertTriangle className="size-3.5" />
              <span>Llegá pronto, se está agotando el tiempo</span>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
          <div className="flex items-start gap-3 mb-3">
            <MapPin className="mt-0.5 size-5 text-sky shrink-0" />
            <div>
              <p className="font-heading text-base font-semibold text-navy">{res.address}</p>
              <p className="text-sm text-gray-text">{res.tramo}</p>
            </div>
          </div>
          <div className="divide-y divide-border">
            <InfoRow label="Horario reservado" value={`${res.startTime} - ${res.endTime}`} />
            <InfoRow label="Código de reserva" value={res.code} />
            <InfoRow label="Permisionario" value={res.permisionarioName} />
            <InfoRow label="Estado" value={res.status === "confirmed" ? "Confirmada" : res.status} />
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-warning-yellow/10 p-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning-yellow" />
            <p className="text-xs text-gray-text">
              Tenés 10 minutos de tolerancia para llegar. Si no llegás, la reserva se libera para otro usuario.
              Mostrá esta reserva al permisionario cuando llegues.
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <BigButton
            icon={QrCode}
            label="Pagar con QR"
            onClick={() => onNavigate("pay-qr")}
            variant="secondary"
            className="w-full"
          />
          <BigButton
            icon={XCircle}
            label="Cancelar reserva"
            onClick={() => setCancelled(true)}
            variant="danger"
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}
