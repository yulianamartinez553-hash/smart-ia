"use client"

import { MapPin, Clock, CheckCircle, Timer } from "lucide-react"
import { permisionario } from "@/lib/prototype-data"
import { ScreenHeader, InfoRow } from "../shared"
import type { PermisionarioScreen } from "../permisionario-app"

export function MiZonaScreen({ onNavigate }: { onNavigate: (s: PermisionarioScreen) => void }) {
  const estimatedEnd = () => {
    const match = permisionario.schedule.match(/(\d+):(\d+)/)
    if (match) {
      return `${match[1]}:${match[2]}`
    }
    return "20:00"
  }

  return (
    <div className="flex h-full flex-col bg-gray-soft">
      <ScreenHeader title="Mi zona y horario" onBack={() => onNavigate("main-panel")} />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-4 rounded-2xl border-2 border-approved-green/30 bg-approved-green/5 p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="flex size-10 items-center justify-center rounded-xl bg-approved-green">
              <CheckCircle className="size-6 text-white" />
            </span>
            <div>
              <p className="font-heading text-base font-semibold text-approved-green">Turno activo</p>
              <p className="text-xs text-gray-text">Estás dentro de tu horario autorizado</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
          <h3 className="font-heading text-sm font-semibold text-navy mb-3">Zona asignada</h3>
          <div className="space-y-1">
            <p className="text-base font-bold text-navy">{permisionario.zoneStreet}</p>
            <p className="text-sm text-gray-text">{permisionario.zoneTramo}</p>
          </div>
        </div>

        <div className="mt-3 rounded-2xl border border-border bg-white p-4 shadow-sm">
          <div className="divide-y divide-border">
            <InfoRow label="Zona" value={permisionario.zone} />
            <InfoRow label="Calle" value={permisionario.zoneStreet} />
            <InfoRow label="Tramo" value={permisionario.zoneTramo} />
            <InfoRow label="Horario autorizado" value={permisionario.schedule} />
            <InfoRow label="Estado" value="Activo" />
          </div>
        </div>

        <div className="mt-3 rounded-2xl border border-border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Timer className="size-4 text-sky" />
            <span className="text-sm font-semibold text-navy">Tiempo restante del turno</span>
          </div>
          <p className="font-heading text-2xl font-bold text-navy">4 h 25 min</p>
          <p className="text-xs text-gray-text">Tu horario finaliza a las {estimatedEnd()}</p>
        </div>

        <div className="mt-3 rounded-2xl border border-border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="size-4 text-sky" />
            <span className="text-sm font-semibold text-navy">Ubicación</span>
          </div>
          <div className="flex h-40 items-center justify-center rounded-xl bg-gray-soft">
            <div className="text-center">
              <MapPin className="mx-auto size-8 text-sky/50" />
              <p className="mt-1 text-xs text-gray-text">Mapa de la zona</p>
              <p className="text-xs font-medium text-navy">{permisionario.zoneStreet}</p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-gray-text">
          Solo podés realizar cobros dentro de esta zona y horario.
        </p>
      </div>
    </div>
  )
}
