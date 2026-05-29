"use client"

import { useState } from "react"
import { Mic, MapPin, Navigation, CheckCircle, XCircle, Search } from "lucide-react"
import { availableZones } from "@/lib/prototype-data"
import { ScreenHeader, BigButton } from "../shared"
import type { ConductorScreen } from "../conductor-app"

export function VoiceReserveScreen({ onNavigate }: { onNavigate: (s: ConductorScreen) => void }) {
  const [step, setStep] = useState<"input" | "listening" | "analyzing" | "result" | "no-exact" | "confirmed">("input")
  const [spokenText, setSpokenText] = useState("")
  const [selectedZone, setSelectedZone] = useState<(typeof availableZones)[0] | null>(null)
  const [alternateZones, setAlternateZones] = useState<typeof availableZones>([])

  const simulateVoiceSearch = () => {
    setStep("listening")
    setTimeout(() => {
      setSpokenText("Quiero reservar en Avenida San Martín 1815")
      setStep("analyzing")
      setTimeout(() => {
        const exact = availableZones.find((z) => z.address.includes("San Martín 1815"))
        if (exact && exact.available) {
          setSelectedZone(exact)
          setStep("result")
        } else {
          const alts = availableZones.filter((z) => z.available).slice(0, 3)
          setAlternateZones(alts)
          if (exact && !exact.available) {
            setSelectedZone(null)
          }
          setStep("no-exact")
        }
      }, 1500)
    }, 2000)
  }

  const handleSelectZone = (zone: (typeof availableZones)[0]) => {
    setSelectedZone(zone)
    setStep("result")
  }

  const handleConfirm = () => {
    setStep("confirmed")
    setTimeout(() => onNavigate("reservation"), 2000)
  }

  const handleManualSearch = () => {
    setStep("input")
  }

  if (step === "confirmed") {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-navy px-6 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-approved-green/20">
          <CheckCircle className="size-8 text-approved-green" />
        </div>
        <h2 className="font-heading text-xl font-bold text-white">Reserva confirmada</h2>
        <p className="mt-2 text-sm text-white/70">
          {selectedZone?.address} · {selectedZone?.tramo}
        </p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-gray-soft">
      <ScreenHeader title="Reservar estacionamiento" onBack={() => onNavigate("main-panel")} />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {step === "input" && (
          <div className="space-y-4">
            <div className="flex flex-col items-center py-6">
              <button
                onClick={simulateVoiceSearch}
                className="mb-3 flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-sky to-turquoise shadow-lg transition-transform active:scale-95"
              >
                <Mic className="size-12 text-white" />
              </button>
              <p className="font-heading text-base font-semibold text-navy">Presioná y hablá</p>
              <p className="text-xs text-gray-text">Decí una dirección del centro de Salta</p>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-text" />
              <input
                type="text"
                placeholder="O escribí una dirección..."
                className="w-full rounded-2xl border border-border bg-white py-4 pl-12 pr-4 text-sm text-navy placeholder:text-gray-text/50 focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/20"
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-text uppercase tracking-wide">Sugerencias</p>
              {availableZones.slice(0, 3).map((z) => (
                <button
                  key={z.address}
                  onClick={() => handleSelectZone(z)}
                  className="flex w-full items-center gap-3 rounded-xl border border-border bg-white p-3 text-left"
                >
                  <MapPin className="size-5 shrink-0 text-sky" />
                  <div>
                    <p className="text-sm font-medium text-navy">{z.address}</p>
                    <p className="text-xs text-gray-text">{z.tramo}</p>
                  </div>
                  {!z.available && <span className="ml-auto text-xs text-alert-red">Ocupado</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "listening" && (
          <div className="flex flex-col items-center py-12">
            <div className="mb-3 flex size-20 items-center justify-center rounded-full bg-sky shadow-lg animate-pulse">
              <Mic className="size-10 text-white" />
            </div>
            <p className="font-heading text-base font-semibold text-navy">Escuchando...</p>
          </div>
        )}

        {step === "analyzing" && (
          <div className="flex flex-col items-center py-12">
            <div className="mb-3 flex size-16 items-center justify-center rounded-full bg-warning-yellow/20">
              <Search className="size-8 text-warning-yellow animate-pulse" />
            </div>
            <p className="font-heading text-base font-semibold text-navy">Buscando disponibilidad...</p>
            <p className="mt-2 text-sm text-gray-text">"{spokenText}"</p>
          </div>
        )}

        {step === "result" && selectedZone && (
          <div className="space-y-4">
            <div className="rounded-2xl border-2 border-approved-green/30 bg-approved-green/5 p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-approved-green">
                  <CheckCircle className="size-6 text-white" />
                </span>
                <div>
                  <p className="font-heading text-base font-semibold text-approved-green">
                    Lugar disponible
                  </p>
                  <p className="text-sm text-gray-text">Cerca de {spokenText.replace("Quiero reservar en ", "")}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="size-5 text-sky" />
                <div>
                  <p className="text-sm font-semibold text-navy">{selectedZone.address}</p>
                  <p className="text-xs text-gray-text">{selectedZone.tramo}</p>
                </div>
                <span className="ml-auto text-xs text-approved-green font-semibold">{selectedZone.distance}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-text">
                <Navigation className="size-3.5" />
                <span>Horario disponible: ahora</span>
              </div>
              <div className="mt-2 rounded-xl bg-warning-yellow/10 px-3 py-2 text-xs text-gray-text">
                Tolerancia de llegada: 10 minutos
              </div>
            </div>

            <div className="space-y-2">
              <BigButton
                icon={CheckCircle}
                label="Confirmar reserva"
                onClick={handleConfirm}
                variant="success"
                className="w-full"
              />
              <BigButton
                label="Buscar otro lugar"
                onClick={handleManualSearch}
                variant="outline"
                className="w-full"
              />
            </div>
          </div>
        )}

        {step === "no-exact" && (
          <div className="space-y-4">
            <div className="rounded-2xl border-2 border-warning-yellow/30 bg-warning-yellow/5 p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-warning-yellow">
                  <XCircle className="size-6 text-navy" />
                </span>
                <div>
                  <p className="font-heading text-base font-semibold text-navy">
                    No hay lugar disponible exactamente ahí
                  </p>
                  <p className="text-sm text-gray-text">Encontramos opciones cercanas disponibles</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {alternateZones.map((z) => (
                <button
                  key={z.address}
                  onClick={() => handleSelectZone(z)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-border bg-white p-4 text-left shadow-sm"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-sky/10">
                    <MapPin className="size-5 text-sky" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-navy">{z.address}</p>
                    <p className="text-xs text-gray-text">{z.tramo} · {z.distance}</p>
                  </div>
                  <span className="text-xs font-semibold text-approved-green">Disponible</span>
                </button>
              ))}
            </div>

            <BigButton
              label="Buscar otra dirección"
              onClick={handleManualSearch}
              variant="outline"
              className="w-full"
            />
          </div>
        )}
      </div>
    </div>
  )
}
