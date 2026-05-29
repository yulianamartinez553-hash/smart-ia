"use client"

import { useState } from "react"
import { QrCode, Banknote, TrendingUp, Download, ChevronDown, ChevronUp } from "lucide-react"
import { payments, todayStats, weeklyHistory, monthlyHistory } from "@/lib/prototype-data"
import { ScreenHeader, BigButton } from "../shared"
import type { PermisionarioScreen } from "../permisionario-app"

function money(n: number) {
  return "$" + n.toLocaleString("es-AR")
}

export function MisCobrosScreen({ onNavigate }: { onNavigate: (s: PermisionarioScreen) => void }) {
  const [showWeek, setShowWeek] = useState(false)
  const [showMonth, setShowMonth] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const todayPayments = payments.filter((p) => p.date === "29/05/2026")

  return (
    <div className="flex h-full flex-col bg-gray-soft">
      <ScreenHeader title="Mis cobros" onBack={() => onNavigate("main-panel")} subtitle="Historial de cobros registrados" />

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-8">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <QrCode className="size-4 text-sky" />
              <span className="text-[10px] text-gray-text uppercase tracking-wide">QR hoy</span>
            </div>
            <p className="font-heading text-xl font-bold text-navy">{todayStats.totalQRCobros}</p>
            <p className="text-xs text-gray-text">{money(todayStats.totalQRAmount)}</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Banknote className="size-4 text-warning-yellow" />
              <span className="text-[10px] text-gray-text uppercase tracking-wide">Efectivo hoy</span>
            </div>
            <p className="font-heading text-xl font-bold text-navy">{todayStats.totalEfectivoCobros}</p>
            <p className="text-xs text-gray-text">{money(todayStats.totalEfectivoAmount)}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-4 shadow-sm mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-5 text-turquoise" />
              <div>
                <p className="text-sm font-semibold text-navy">Total recaudado hoy</p>
                <p className="font-heading text-2xl font-bold text-turquoise">{money(todayStats.totalAmount)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-text">Comisión estimada</p>
              <p className="text-sm font-semibold text-sky">{money(todayStats.commissionEstimate)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <button
            onClick={() => setShowWeek(!showWeek)}
            className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-navy shadow-sm"
          >
            Historial semanal
            {showWeek ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
          {showWeek && (
            <div className="rounded-2xl border border-border bg-white p-3 shadow-sm">
              {weeklyHistory.map((w) => (
                <div key={w.day} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm font-medium text-navy">{w.day}</span>
                  <div className="flex gap-4 text-xs">
                    <span className="text-sky">QR: {money(w.qr)}</span>
                    <span className="text-warning-yellow">Efe: {money(w.efectivo)}</span>
                  </div>
                  <span className="text-sm font-semibold text-navy">{money(w.amount)}</span>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setShowMonth(!showMonth)}
            className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-navy shadow-sm"
          >
            Historial mensual
            {showMonth ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
          {showMonth && (
            <div className="rounded-2xl border border-border bg-white p-3 shadow-sm">
              {monthlyHistory.map((m) => (
                <div key={m.week} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm font-medium text-navy">{m.week}</span>
                  <span className="text-sm font-semibold text-navy">{money(m.amount)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-sm font-semibold text-navy mb-2">Últimos cobros</p>
        <div className="space-y-2">
          {todayPayments.map((p) => (
            <div key={p.id}>
              <button
                onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                className="w-full rounded-2xl border border-border bg-white p-4 shadow-sm text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`flex size-10 items-center justify-center rounded-xl ${
                      p.method === "QR" ? "bg-sky/10 text-sky" : "bg-warning-yellow/10 text-warning-yellow"
                    }`}>
                      {p.method === "QR" ? <QrCode className="size-5" /> : <Banknote className="size-5" />}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-navy">{money(p.amount)}</p>
                      <p className="text-xs text-gray-text">{p.time} · {p.zone}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold ${
                    p.method === "QR" ? "text-sky" : "text-warning-yellow"
                  }`}>
                    {p.method}
                  </span>
                </div>
                {expandedId === p.id && (
                  <div className="mt-3 pt-3 border-t border-border text-xs text-gray-text space-y-1">
                    <p>Código: {p.operationCode}</p>
                    <p>Fecha: {p.date}</p>
                    <p>Zona: {p.zone}</p>
                    <p>Método: {p.method}</p>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          <BigButton
            icon={Download}
            label="Descargar resumen"
            variant="outline"
            className="w-full"
          />
          <BigButton
            label="Volver al panel"
            onClick={() => onNavigate("main-panel")}
            variant="primary"
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}
