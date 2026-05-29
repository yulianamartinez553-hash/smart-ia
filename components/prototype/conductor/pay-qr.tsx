"use client"

import { useState } from "react"
import { QrCode, Scan, CheckCircle, Loader2, CreditCard, Wallet } from "lucide-react"
import { tariff } from "@/lib/prototype-data"
import { ScreenHeader, BigButton } from "../shared"
import type { ConductorScreen } from "../conductor-app"

export function PayQRScreen({ onNavigate }: { onNavigate: (s: ConductorScreen) => void }) {
  const [step, setStep] = useState<"scan" | "scanning" | "payment" | "processing" | "success">("scan")
  const [selectedMethod, setSelectedMethod] = useState("Mercado Pago")

  const handleScan = () => {
    setStep("scanning")
    setTimeout(() => setStep("payment"), 2000)
  }

  const handlePay = () => {
    setStep("processing")
    setTimeout(() => setStep("success"), 2000)
  }

  if (step === "success") {
    const opCode = `OP-2026-${String(Math.floor(Math.random() * 90000) + 10000)}`
    return (
      <div className="flex h-full flex-col bg-gray-soft">
        <ScreenHeader title="Pago exitoso" onBack={() => onNavigate("main-panel")} />
        <div className="flex-1 px-4 py-4">
          <div className="flex flex-col items-center rounded-2xl border-2 border-approved-green/30 bg-approved-green/5 p-6 shadow-sm">
            <div className="mb-3 flex size-14 items-center justify-center rounded-full bg-approved-green">
              <CheckCircle className="size-8 text-white" />
            </div>
            <h2 className="font-heading text-lg font-bold text-approved-green">Pago confirmado</h2>
            <div className="mt-4 w-full space-y-2 text-sm">
              <div className="flex justify-between border-b border-border pb-1.5">
                <span className="text-gray-text">Monto</span>
                <span className="font-semibold text-navy">${tariff.amount.toLocaleString("es-AR")}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-1.5">
                <span className="text-gray-text">Método</span>
                <span className="font-semibold text-navy">{selectedMethod}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-1.5">
                <span className="text-gray-text">ID de operación</span>
                <span className="font-semibold text-navy">{opCode}</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-text">
              Tu ticket fue enviado al correo vinculado a tu cuenta.
            </p>
          </div>
          <div className="mt-4 space-y-3">
            <BigButton label="Ver ticket" onClick={() => onNavigate("ticket")} variant="primary" className="w-full" />
            <BigButton label="Volver al panel" onClick={() => onNavigate("main-panel")} variant="outline" className="w-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-gray-soft">
      <ScreenHeader title="Pagar con QR" onBack={() => onNavigate("main-panel")} subtitle="Escaneá el QR del permisionario" />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {step === "scan" && (
          <div className="space-y-4">
            <div className="flex flex-col items-center py-6">
              <button
                onClick={handleScan}
                className="mb-4 flex size-40 items-center justify-center rounded-2xl border-2 border-dashed border-sky bg-sky/5"
              >
                <div className="text-center">
                  <Scan className="mx-auto size-12 text-sky" />
                  <p className="mt-2 text-xs text-gray-text">Escaneá el QR</p>
                </div>
              </button>
              <p className="text-sm text-gray-text">
                Escaneá el código QR que te muestra el permisionario
              </p>
            </div>
            <BigButton
              icon={QrCode}
              label="Simular escaneo de QR"
              onClick={handleScan}
              className="w-full"
            />
          </div>
        )}

        {step === "scanning" && (
          <div className="flex flex-col items-center py-12">
            <div className="mb-3 flex size-20 items-center justify-center rounded-full bg-sky shadow-lg animate-pulse">
              <Scan className="size-10 text-white" />
            </div>
            <p className="font-heading text-base font-semibold text-navy">Escaneando...</p>
            <div className="mt-4 h-2 w-48 overflow-hidden rounded-full bg-gray-soft">
              <div className="h-full w-full animate-pulse rounded-full bg-sky" />
            </div>
          </div>
        )}

        {step === "payment" && (
          <div className="space-y-4">
            <div className="rounded-2xl border-2 border-sky/30 bg-white p-5 text-center shadow-sm">
              <p className="text-sm text-gray-text">Monto a pagar</p>
              <p className="font-heading text-4xl font-bold text-navy">
                ${tariff.amount.toLocaleString("es-AR")}
              </p>
              <p className="text-sm text-gray-text">Estacionamiento medido · 1 hora</p>
            </div>

            <p className="text-sm font-semibold text-navy">Método de pago</p>
            <div className="space-y-2">
              {[
                { id: "mp", label: "Mercado Pago", icon: Wallet },
                { id: "modo", label: "MODO", icon: Wallet },
                { id: "wallet", label: "Otras billeteras", icon: Wallet },
                { id: "card", label: "Tarjeta", icon: CreditCard },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMethod(m.label)}
                  className={`flex w-full items-center gap-3 rounded-xl border-2 p-3.5 text-left transition-colors ${
                    selectedMethod === m.label
                      ? "border-sky bg-sky/5"
                      : "border-border bg-white"
                  }`}
                >
                  <span className={`flex size-10 items-center justify-center rounded-lg ${
                    selectedMethod === m.label ? "bg-sky text-white" : "bg-gray-soft text-sky"
                  }`}>
                    <m.icon className="size-5" />
                  </span>
                  <span className="text-sm font-medium text-navy">{m.label}</span>
                  {selectedMethod === m.label && (
                    <span className="ml-auto text-xs text-sky font-semibold">Seleccionado</span>
                  )}
                </button>
              ))}
            </div>

            <BigButton
              label={`Pagar con ${selectedMethod}`}
              onClick={handlePay}
              variant="success"
              className="w-full"
            />
          </div>
        )}

        {step === "processing" && (
          <div className="flex flex-col items-center py-12">
            <Loader2 className="size-12 animate-spin text-sky" />
            <p className="mt-4 font-heading text-base font-semibold text-navy">Procesando pago...</p>
          </div>
        )}
      </div>
    </div>
  )
}
