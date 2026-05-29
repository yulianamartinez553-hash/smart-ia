"use client"

import {
  DollarSign,
  MapPin,
  Receipt,
  User,
  HelpCircle,
  BadgeCheck,
  XCircle,
  Clock,
  CheckCircle,
} from "lucide-react"
import { permisionario } from "@/lib/prototype-data"
import { BigButton } from "../shared"
import type { PermisionarioScreen } from "../permisionario-app"

export function MainPanelScreen({ onNavigate }: { onNavigate: (s: PermisionarioScreen) => void }) {
  const isHabilitado = permisionario.status === "Habilitado" && permisionario.serviceAccepted

  const canCobrar =
    isHabilitado &&
    permisionario.zoneActive &&
    !permisionario.isSuspended

  return (
    <div className="flex h-full flex-col bg-gray-soft">
      <div className="bg-navy px-4 pb-6 pt-12">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/60">Permisionario Digital</p>
            <h1 className="font-heading text-xl font-bold text-white">
              {permisionario.name.split(" ")[0]}
            </h1>
          </div>
          <span className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
            isHabilitado ? "bg-approved-green/20 text-approved-green" : "bg-alert-red/20 text-alert-red"
          }`}>
            {isHabilitado ? (
              <><BadgeCheck className="size-3.5" /> Habilitado</>
            ) : (
              <><XCircle className="size-3.5" /> No habilitado</>
            )}
          </span>
        </div>
        <div className="mt-3 flex gap-4 text-sm">
          <span className="flex items-center gap-1.5 text-white/80">
            <MapPin className="size-4 text-sky" /> {permisionario.zone}
          </span>
          <span className="flex items-center gap-1.5 text-white/80">
            <Clock className="size-4 text-sky" /> {permisionario.schedule}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <div className="my-6 flex flex-col items-center">
          <button
            onClick={() => canCobrar ? onNavigate("cobrar-qr") : undefined}
            className={`mb-3 flex size-28 items-center justify-center rounded-full shadow-lg transition-transform active:scale-95 hover:shadow-xl ${
              canCobrar
                ? "bg-gradient-to-br from-sky to-turquoise"
                : "bg-gray-text cursor-not-allowed"
            }`}
          >
            <DollarSign className="size-14 text-white" />
          </button>
          <p className="font-heading text-lg font-semibold text-navy">Cobrar</p>
          <p className="text-xs text-gray-text">
            {canCobrar
              ? "Generá un QR para que el conductor pague"
              : "No podés cobrar en este momento"}
          </p>
          {!canCobrar && (
            <div className="mt-2 space-y-1 text-center">
              {!permisionario.serviceAccepted && (
                <p className="text-xs text-warning-yellow">Servicio no aceptado hoy</p>
              )}
              {permisionario.isSuspended && (
                <p className="text-xs text-alert-red">Perfil suspendido</p>
              )}
              {permisionario.status !== "Habilitado" && (
                <p className="text-xs text-alert-red">Perfil no habilitado</p>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <BigButton
            icon={MapPin}
            label="Mi zona"
            onClick={() => onNavigate("mi-zona")}
            variant="primary"
            className="h-16"
          />
          <BigButton
            icon={Receipt}
            label="Mis cobros"
            onClick={() => onNavigate("mis-cobros")}
            variant="primary"
            className="h-16"
          />
        </div>

        <div className="mt-4 space-y-2">
          <button
            onClick={() => onNavigate("profile-validated")}
            className="flex w-full items-center gap-3 rounded-2xl border border-border bg-white px-5 py-3.5 text-sm font-semibold text-navy shadow-sm"
          >
            <User className="size-5 text-sky" />
            Mi perfil
          </button>
          <button
            onClick={() => onNavigate("ayuda")}
            className="flex w-full items-center gap-3 rounded-2xl border border-border bg-white px-5 py-3.5 text-sm font-semibold text-navy shadow-sm"
          >
            <HelpCircle className="size-5 text-sky" />
            Ayuda
          </button>
        </div>

        {permisionario.serviceAccepted && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-approved-green/10 px-4 py-3">
            <CheckCircle className="size-4 text-approved-green" />
            <div>
              <p className="text-xs font-semibold text-approved-green">Servicio aceptado</p>
              <p className="text-[10px] text-gray-text">{permisionario.serviceCode}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
