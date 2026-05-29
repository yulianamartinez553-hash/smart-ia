"use client"

import { useState } from "react"
import { Clock, AlertTriangle, RefreshCw, CheckCircle, FileText } from "lucide-react"
import { permisionario, documents } from "@/lib/prototype-data"
import { ScreenHeader, BigButton, StatusBadge } from "../shared"
import type { PermisionarioScreen } from "../permisionario-app"

function daysUntil(dateStr: string): number {
  const [day, month, year] = dateStr.split("/").map(Number)
  const target = new Date(year, month - 1, day)
  const today = new Date()
  const diff = target.getTime() - today.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export function RenewalScreen({ onNavigate }: { onNavigate: (s: PermisionarioScreen) => void }) {
  const daysLeft = daysUntil(permisionario.expirationDate)
  const isExpired = daysLeft === 0
  const isAboutToExpire = daysLeft > 0 && daysLeft <= 30
  const [showRenewForm, setShowRenewForm] = useState(false)

  const renewDocuments = documents.filter((d) =>
    ["antecedentes-nac", "antecedentes-prov", "residencia", "declaracion-jurada", "capacitacion"].includes(d.id)
  )

  if (showRenewForm) {
    return (
      <RenewForm
        onBack={() => setShowRenewForm(false)}
        onNavigate={onNavigate}
        renewDocuments={renewDocuments}
      />
    )
  }

  return (
    <div className="flex h-full flex-col bg-gray-soft">
      <ScreenHeader title="Vigencia de mi habilitación" onBack={() => onNavigate("main-panel")} />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <div className="text-center">
            <div className={`mx-auto flex size-16 items-center justify-center rounded-full ${
              isExpired ? "bg-alert-red/10" : isAboutToExpire ? "bg-warning-yellow/10" : "bg-approved-green/10"
            }`}>
              {isExpired ? (
                <AlertTriangle className="size-8 text-alert-red" />
              ) : isAboutToExpire ? (
                <Clock className="size-8 text-warning-yellow" />
              ) : (
                <CheckCircle className="size-8 text-approved-green" />
              )}
            </div>

            <h2 className={`mt-3 font-heading text-lg font-bold ${
              isExpired ? "text-alert-red" : isAboutToExpire ? "text-warning-yellow" : "text-approved-green"
            }`}>
              {isExpired ? "Habilitación vencida" : isAboutToExpire ? "Vence pronto" : "Habilitación vigente"}
            </h2>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-gray-soft px-4 py-3">
              <span className="text-sm text-gray-text">Fecha de inicio</span>
              <span className="text-sm font-semibold text-navy">{permisionario.approvalDate}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-gray-soft px-4 py-3">
              <span className="text-sm text-gray-text">Fecha de vencimiento</span>
              <span className="text-sm font-semibold text-navy">{permisionario.expirationDate}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-gray-soft px-4 py-3">
              <span className="text-sm text-gray-text">Días restantes</span>
              <span className={`text-sm font-bold ${
                isExpired ? "text-alert-red" : isAboutToExpire ? "text-warning-yellow" : "text-approved-green"
              }`}>
                {isExpired ? "Vencida" : `${daysLeft} días`}
              </span>
            </div>
          </div>

          {isAboutToExpire && (
            <div className="mt-3 flex items-start gap-2 rounded-xl bg-warning-yellow/10 p-3">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning-yellow" />
              <p className="text-xs text-gray-text">
                Tu habilitación vence pronto. Renová tu documentación para seguir trabajando sin interrupciones.
              </p>
            </div>
          )}

          {isExpired && (
            <div className="mt-3 flex items-start gap-2 rounded-xl bg-alert-red/10 p-3">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-alert-red" />
              <p className="text-xs text-gray-text">
                No podés realizar cobros hasta renovar y aprobar tu documentación.
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-3">
          {!isExpired && (
            <BigButton
              icon={RefreshCw}
              label="Renovar habilitación"
              onClick={() => setShowRenewForm(true)}
              variant={isAboutToExpire ? "warning" : "primary"}
              className="w-full"
            />
          )}
          {isExpired && (
            <BigButton
              icon={RefreshCw}
              label="Renovar ahora"
              onClick={() => setShowRenewForm(true)}
              variant="danger"
              className="w-full"
            />
          )}
        </div>
      </div>
    </div>
  )
}

function RenewForm({
  onBack,
  onNavigate,
  renewDocuments,
}: {
  onBack: () => void
  onNavigate: (s: PermisionarioScreen) => void
  renewDocuments: typeof documents
}) {
  const [renewed, setRenewed] = useState(false)

  const handleRenew = () => {
    setRenewed(true)
    setTimeout(() => onNavigate("profile-validated"), 2000)
  }

  if (renewed) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-navy px-6 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-approved-green/20">
          <CheckCircle className="size-8 text-approved-green" />
        </div>
        <h2 className="font-heading text-xl font-bold text-white">Renovación enviada</h2>
        <p className="mt-2 text-sm text-white/70">
          Tu solicitud de renovación fue enviada. Esperá la revisión municipal.
        </p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-gray-soft">
      <ScreenHeader title="Renovar habilitación" onBack={onBack} />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="mb-4 text-sm text-gray-text">
          Para renovar tu habilitación, actualizá los siguientes documentos:
        </p>

        <div className="space-y-3">
          {renewDocuments.map((doc) => (
            <div key={doc.id} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy">{doc.name}</p>
                  <p className="mt-0.5 text-xs text-gray-text">{doc.description}</p>
                </div>
                <StatusBadge status={doc.status} />
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex items-center gap-1.5 rounded-xl bg-sky px-4 py-2 text-xs font-semibold text-white hover:bg-sky/90">
                  <FileText className="size-3.5" />
                  Subir actualización
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <BigButton
            icon={RefreshCw}
            label="Enviar renovación"
            onClick={handleRenew}
            variant="primary"
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}
