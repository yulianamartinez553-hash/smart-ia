"use client"

import { Calendar, MapPin, Clock, QrCode } from "lucide-react"
import { activeReservation, reservationHistory } from "@/lib/prototype-data"
import { ScreenHeader, StatusBadge } from "../shared"
import type { ConductorScreen } from "../conductor-app"

export function MyReservationsScreen({ onNavigate }: { onNavigate: (s: ConductorScreen) => void }) {
  return (
    <div className="flex h-full flex-col bg-gray-soft">
      <ScreenHeader title="Mis reservas" onBack={() => onNavigate("main-panel")} />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="text-sm font-semibold text-navy mb-3">Reserva activa</p>
        <button
          onClick={() => onNavigate("reservation")}
          className="w-full rounded-2xl border-2 border-sky/30 bg-sky/5 p-4 text-left shadow-sm"
        >
          <div className="flex items-start gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-sky">
              <Calendar className="size-5 text-white" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-navy">{activeReservation.address}</p>
              <p className="text-xs text-gray-text">{activeReservation.tramo}</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-gray-text">
                <Clock className="size-3" />
                <span>{activeReservation.startTime} - {activeReservation.endTime}</span>
              </div>
            </div>
            <StatusBadge status={activeReservation.status} />
          </div>
        </button>

        <p className="text-sm font-semibold text-navy mt-6 mb-3">Historial</p>
        <div className="space-y-2">
          {reservationHistory.map((r) => (
            <div key={r.id} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-gray-soft">
                    <MapPin className="size-4 text-sky" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-navy">{r.address}</p>
                    <p className="text-xs text-gray-text">{r.code}</p>
                    <p className="text-xs text-gray-text">{r.startTime} - {r.endTime}</p>
                  </div>
                </div>
                <StatusBadge status={r.status} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={() => onNavigate("main-panel")}
            className="w-full rounded-2xl border-2 border-navy py-3.5 text-center font-heading text-sm font-semibold text-navy"
          >
            Volver al panel
          </button>
        </div>
      </div>
    </div>
  )
}
