"use client"

import { ShieldCheck, BadgeCheck, QrCode, MapPin, Clock, XCircle } from "lucide-react"
import { permisionario } from "@/lib/prototype-data"
import { ScreenHeader } from "../shared"
import type { PermisionarioScreen } from "../permisionario-app"

export function PerfilPublicoScreen({ onNavigate }: { onNavigate: (s: PermisionarioScreen) => void }) {
  const isHabilitado = permisionario.status === "Habilitado"

  return (
    <div className="flex h-full flex-col bg-gray-soft">
      <ScreenHeader title="Perfil público verificable" onBack={() => onNavigate("profile-validated")} />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className={`rounded-3xl border-2 p-6 shadow-lg ${
          isHabilitado
            ? "border-approved-green/30 bg-gradient-to-br from-white to-approved-green/5"
            : "border-alert-red/30 bg-gradient-to-br from-white to-alert-red/5"
        }`}>
          <div className="text-center">
            <div className="mx-auto mb-3 flex size-20 items-center justify-center rounded-full bg-navy text-2xl font-bold text-white shadow-md">
              {permisionario.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>

            <h2 className="font-heading text-xl font-bold text-navy">{permisionario.name}</h2>
            <p className="text-sm text-gray-text">ID: {permisionario.municipalCode}</p>

            <div className={`mx-auto mt-3 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold ${
              isHabilitado
                ? "bg-approved-green/15 text-approved-green"
                : "bg-alert-red/15 text-alert-red"
            }`}>
              {isHabilitado ? (
                <><BadgeCheck className="size-4" /> Habilitado</>
              ) : (
                <><XCircle className="size-4" /> No habilitado</>
              )}
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-3 rounded-xl bg-gray-soft px-4 py-3">
              <MapPin className="size-4 text-sky" />
              <div>
                <p className="text-[10px] text-gray-text uppercase">Zona autorizada</p>
                <p className="text-sm font-semibold text-navy">{permisionario.zoneStreet}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-gray-soft px-4 py-3">
              <Clock className="size-4 text-sky" />
              <div>
                <p className="text-[10px] text-gray-text uppercase">Horario autorizado</p>
                <p className="text-sm font-semibold text-navy">{permisionario.schedule}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-gray-soft px-4 py-3">
              <ShieldCheck className="size-4 text-turquoise" />
              <div>
                <p className="text-[10px] text-gray-text uppercase">Vencimiento habilitación</p>
                <p className="text-sm font-semibold text-navy">{permisionario.expirationDate}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col items-center rounded-2xl border-2 border-dashed border-sky/30 bg-white p-4">
            <div className="flex size-32 items-center justify-center rounded-xl bg-gray-soft p-2">
              <div className="grid grid-cols-5 gap-0.5">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className={`size-5 rounded-sm ${
                      [0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24].includes(i)
                        ? "bg-navy"
                        : [7, 11, 13, 17].includes(i)
                        ? "bg-sky"
                        : "bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-text">Escaneá para verificar</p>
          </div>

          <p className="mt-4 text-center text-xs text-gray-text">
            Municipalidad de Salta
          </p>
        </div>

        <p className={`mt-4 text-center text-sm ${
          isHabilitado ? "text-approved-green" : "text-alert-red"
        }`}>
          {isHabilitado
            ? "Este permisionario está habilitado para trabajar en esta zona y horario."
            : "No habilitado en este momento."}
        </p>
      </div>
    </div>
  )
}
