"use client"

import { useState } from "react"
import {
  Mic,
  Search,
  Calendar,
  QrCode,
  AlertTriangle,
  User,
  MapPin,
  Clock,
  ShieldCheck,
  Car,
} from "lucide-react"
import { conductor } from "@/lib/prototype-data"
import { BigButton } from "../shared"
import type { ConductorScreen } from "../conductor-app"

export function MainPanelScreen({ onNavigate }: { onNavigate: (s: ConductorScreen) => void }) {
  const [listening, setListening] = useState(false)

  const handleMicClick = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      onNavigate("voice-reserve")
      return
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = "es-AR"
    recognition.continuous = false
    recognition.interimResults = false

    setListening(true)

    recognition.onresult = (event: any) => {
      setListening(false)
      onNavigate("voice-reserve")
    }

    recognition.onerror = () => {
      setListening(false)
      onNavigate("voice-reserve")
    }

    recognition.onend = () => {
      setListening(false)
    }

    recognition.start()

    setTimeout(() => {
      setListening(false)
      onNavigate("voice-reserve")
    }, 3000)
  }

  return (
    <div className="flex h-full flex-col bg-gray-soft">
      <div className="bg-navy px-4 pb-6 pt-12">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/60">Conductor</p>
            <h1 className="font-heading text-xl font-bold text-white">
              Hola, {conductor.name.split(" ")[0]}
            </h1>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-approved-green/20 px-3 py-1.5 text-xs font-semibold text-approved-green">
            <ShieldCheck className="size-3.5" /> Cuenta activa
          </span>
        </div>
        <div className="mt-3 flex gap-4 text-sm">
          <span className="flex items-center gap-1.5 text-white/80">
            <Car className="size-4 text-sky" /> {conductor.patente}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {listening ? (
          <div className="my-8 flex flex-col items-center justify-center">
            <div className="mb-3 flex size-24 items-center justify-center rounded-full bg-sky shadow-lg animate-pulse">
              <Mic className="size-12 text-white" />
            </div>
            <p className="font-heading text-lg font-semibold text-navy">Escuchando...</p>
            <p className="text-sm text-gray-text">Decí dónde querés estacionar</p>
          </div>
        ) : (
          <div className="my-6 flex flex-col items-center">
            <button
              onClick={handleMicClick}
              className="mb-3 flex size-28 items-center justify-center rounded-full bg-gradient-to-br from-sky to-turquoise shadow-lg transition-transform active:scale-95 hover:shadow-xl"
            >
              <Mic className="size-14 text-white" />
            </button>
            <p className="font-heading text-lg font-semibold text-navy">Reservar con voz</p>
            <p className="text-xs text-gray-text">Presioná el micrófono y decí dónde querés estacionar</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <BigButton
            icon={Search}
            label="Buscar lugar"
            onClick={() => onNavigate("voice-reserve")}
            variant="primary"
            className="h-16"
          />
          <BigButton
            icon={Calendar}
            label="Mis reservas"
            onClick={() => onNavigate("my-reservations")}
            variant="primary"
            className="h-16"
          />
          <BigButton
            icon={QrCode}
            label="Pagar con QR"
            onClick={() => onNavigate("pay-qr")}
            variant="secondary"
            className="h-16"
          />
          <BigButton
            icon={AlertTriangle}
            label="Reclamos"
            onClick={() => onNavigate("claims")}
            variant="secondary"
            className="h-16"
          />
        </div>

        <div className="mt-4">
          <button
            onClick={() => onNavigate("profile")}
            className="flex w-full items-center gap-3 rounded-2xl border border-border bg-white px-5 py-3.5 text-sm font-semibold text-navy shadow-sm"
          >
            <User className="size-5 text-sky" />
            Mi perfil
          </button>
        </div>
      </div>
    </div>
  )
}
