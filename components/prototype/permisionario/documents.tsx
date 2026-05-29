"use client"

import { useState } from "react"
import { Upload, RefreshCw, Eye, Send, ChevronLeft } from "lucide-react"
import { documents, type DocumentStatus } from "@/lib/prototype-data"
import { ScreenHeader, StatusBadge, BigButton } from "../shared"
import type { PermisionarioScreen } from "../permisionario-app"

export function DocumentsScreen({ onNavigate }: { onNavigate: (s: PermisionarioScreen) => void }) {
  const [docList] = useState(documents)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  const statusCounts = {
    total: docList.length,
    approved: docList.filter((d) => d.status === "aprobado").length,
    pending: docList.filter((d) => d.status === "falta-cargar" || d.status === "cargado" || d.status === "en-revision").length,
    rejected: docList.filter((d) => d.status === "rechazado" || d.status === "vencido").length,
  }

  const allRequiredApproved = docList.filter((d) => d.required).every((d) => d.status === "aprobado")

  return (
    <div className="flex h-full flex-col bg-gray-soft">
      <ScreenHeader title="Documentación" onBack={() => onNavigate("create-profile")} subtitle="Documentos obligatorios" />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-4 grid grid-cols-4 gap-2">
          <div className="rounded-xl bg-white p-3 text-center shadow-sm">
            <p className="text-lg font-bold text-navy">{statusCounts.total}</p>
            <p className="text-[10px] text-gray-text">Total</p>
          </div>
          <div className="rounded-xl bg-white p-3 text-center shadow-sm">
            <p className="text-lg font-bold text-approved-green">{statusCounts.approved}</p>
            <p className="text-[10px] text-gray-text">Aprobados</p>
          </div>
          <div className="rounded-xl bg-white p-3 text-center shadow-sm">
            <p className="text-lg font-bold text-warning-yellow">{statusCounts.pending}</p>
            <p className="text-[10px] text-gray-text">Pendientes</p>
          </div>
          <div className="rounded-xl bg-white p-3 text-center shadow-sm">
            <p className="text-lg font-bold text-alert-red">{statusCounts.rejected}</p>
            <p className="text-[10px] text-gray-text">Rechazados</p>
          </div>
        </div>

        <div className="space-y-3">
          {docList.map((doc) => (
            <div key={doc.id} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy">{doc.name}</p>
                  <p className="mt-0.5 text-xs text-gray-text">{doc.description}</p>
                </div>
                <StatusBadge status={doc.status} />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(doc.status === "falta-cargar" || doc.status === "rechazado" || doc.status === "vencido") && (
                  <button className="flex items-center gap-1.5 rounded-xl bg-sky px-4 py-2 text-xs font-semibold text-white hover:bg-sky/90">
                    <Upload className="size-3.5" />
                    Subir documento
                  </button>
                )}
                {(doc.status === "cargado" || doc.status === "en-revision") && (
                  <button className="flex items-center gap-1.5 rounded-xl border border-sky px-4 py-2 text-xs font-semibold text-sky">
                    <RefreshCw className="size-3.5" />
                    Cambiar archivo
                  </button>
                )}
                <button className="flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-xs font-semibold text-gray-text hover:bg-gray-soft">
                  <Eye className="size-3.5" />
                  Ver ejemplo
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <BigButton
            icon={Send}
            label="Enviar a revisión"
            onClick={() => onNavigate("profile-validated")}
            disabled={!allRequiredApproved}
            variant={allRequiredApproved ? "success" : "primary"}
            className="w-full"
          />
          {!allRequiredApproved && (
            <p className="text-center text-xs text-warning-yellow">
              Todos los documentos obligatorios deben estar aprobados para enviar a revisión.
            </p>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-gray-text">
          Para trabajar habilitado, tu documentación debe estar completa, aprobada y vigente.
        </p>
      </div>
    </div>
  )
}
