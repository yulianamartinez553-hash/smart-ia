"use client"

import { BadgeCheck, Clock, XCircle, QrCode } from "lucide-react"
import { permisionario } from "@/lib/prototype-data"
import { ScreenHeader, InfoRow, BigButton } from "../shared"
import type { PermisionarioScreen } from "../permisionario-app"

export function ProfileValidatedScreen({ onNavigate }: { onNavigate: (s: PermisionarioScreen) => void }) {
  const isHabilitado = permisionario.status === "Habilitado"

  return (
    <div className="flex h-full flex-col bg-gray-soft">
      <ScreenHeader title="Mi perfil" onBack={() => onNavigate("main-panel")} />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {isHabilitado ? (
          <div className="mb-4 rounded-2xl border-2 border-approved-green/30 bg-approved-green/10 p-5 text-center">
            <div className="mx-auto mb-2 flex size-14 items-center justify-center rounded-full bg-approved-green">
              <BadgeCheck className="size-8 text-white" />
            </div>
            <h2 className="font-heading text-lg font-bold text-approved-green">Perfil habilitado</h2>
            <p className="mt-1 text-xs text-gray-text">
              Tu perfil está validado y vigente. Podés trabajar dentro de tu zona y horario autorizado.
            </p>
          </div>
        ) : (
          <div className="mb-4 rounded-2xl border-2 border-alert-red/30 bg-alert-red/10 p-5 text-center">
            <div className="mx-auto mb-2 flex size-14 items-center justify-center rounded-full bg-alert-red">
              <XCircle className="size-8 text-white" />
            </div>
            <h2 className="font-heading text-lg font-bold text-alert-red">No habilitado</h2>
            <p className="mt-1 text-xs text-gray-text">
              Completá tu registro y documentación para obtener la habilitación.
            </p>
          </div>
        )}

        <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
              {permisionario.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <p className="font-heading text-base font-semibold text-navy">{permisionario.name}</p>
              <p className="text-xs text-gray-text">ID: {permisionario.municipalCode}</p>
            </div>
          </div>

          <div className="divide-y divide-border">
            <InfoRow label="Estado" value={permisionario.status} />
            <InfoRow label="Zona asignada" value={permisionario.zone} />
            <InfoRow label="Horario asignado" value={permisionario.schedule} />
            <InfoRow label="Fecha de aprobación" value={permisionario.approvalDate} />
            <InfoRow label="Vencimiento anual" value={permisionario.expirationDate} />
            <InfoRow label="Reputación" value={permisionario.reputation} />
            <InfoRow label="Documentación" value="Vigente" />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <BigButton
            icon={QrCode}
            label="Ver perfil público verificable"
            onClick={() => onNavigate("perfil-publico")}
            variant="secondary"
            className="w-full"
          />
          <BigButton
            icon={Clock}
            label="Ver vencimiento y renovación"
            onClick={() => onNavigate("renewal")}
            variant="outline"
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}
