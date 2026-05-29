"use client"

import { useState } from "react"
import { Ticket, Download, Mail, CheckCircle, QrCode } from "lucide-react"
import { conductor, tariff, activeReservation } from "@/lib/prototype-data"
import { ScreenHeader, BigButton } from "../shared"
import type { ConductorScreen } from "../conductor-app"

export function TicketScreen({ onNavigate }: { onNavigate: (s: ConductorScreen) => void }) {
  const [sent, setSent] = useState(false)

  const ticketData = {
    conductor: conductor.name,
    patente: conductor.patente,
    zone: activeReservation.address,
    tramo: activeReservation.tramo,
    horario: `${activeReservation.startTime} - ${activeReservation.endTime}`,
    monto: tariff.amount,
    metodo: "Mercado Pago",
    codigoReserva: activeReservation.code,
    codigoPermisionario: activeReservation.permisionarioId,
    fecha: new Date().toLocaleDateString("es-AR"),
    hora: new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
    operacion: `OP-2026-${String(Math.floor(Math.random() * 90000) + 10000)}`,
  }

  const handleSendEmail = () => {
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div className="flex h-full flex-col bg-gray-soft">
      <ScreenHeader title="Ticket virtual" onBack={() => onNavigate("main-panel")} />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="rounded-2xl border-2 border-sky/20 bg-white p-5 shadow-sm">
          <div className="text-center border-b border-border pb-3 mb-3">
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-sky">
              <Ticket className="size-6 text-white" />
            </div>
            <h2 className="font-heading text-base font-semibold text-navy">Ticket de estacionamiento</h2>
            <p className="text-xs text-gray-text">Salta Estaciona Transparente</p>
          </div>

          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-text">Conductor</span>
              <span className="font-semibold text-navy">{ticketData.conductor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-text">Patente</span>
              <span className="font-semibold text-navy">{ticketData.patente}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-text">Dirección</span>
              <span className="font-semibold text-navy text-right max-w-[200px]">{ticketData.zone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-text">Tramo</span>
              <span className="font-semibold text-navy text-right max-w-[200px]">{ticketData.tramo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-text">Horario</span>
              <span className="font-semibold text-navy">{ticketData.horario}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-text">Monto pagado</span>
              <span className="font-semibold text-navy">${ticketData.monto.toLocaleString("es-AR")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-text">Método de pago</span>
              <span className="font-semibold text-navy">{ticketData.metodo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-text">Código de reserva</span>
              <span className="font-semibold text-navy">{ticketData.codigoReserva}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-text">Permisionario</span>
              <span className="font-semibold text-navy">{ticketData.codigoPermisionario}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-text">Fecha y hora</span>
              <span className="font-semibold text-navy">{ticketData.fecha} {ticketData.hora}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-text">ID de operación</span>
              <span className="font-semibold text-navy">{ticketData.operacion}</span>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <div className="flex size-24 items-center justify-center rounded-xl bg-gray-soft">
              <QrCode className="size-12 text-navy/30" />
            </div>
          </div>
        </div>

        {sent && (
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-approved-green/10 px-4 py-3">
            <CheckCircle className="size-4 text-approved-green" />
            <p className="text-xs text-approved-green font-semibold">Ticket enviado al correo vinculado</p>
          </div>
        )}

        <div className="mt-4 space-y-3">
          <BigButton icon={Download} label="Descargar ticket" variant="primary" className="w-full" />
          <BigButton icon={Mail} label="Enviar por correo" onClick={handleSendEmail} variant="secondary" className="w-full" />
          <BigButton label="Volver al panel" onClick={() => onNavigate("main-panel")} variant="outline" className="w-full" />
        </div>
      </div>
    </div>
  )
}
