"use client"

import { UserPlus, LogIn, Ear, ShieldCheck } from "lucide-react"
import { BigButton } from "../shared"
import type { PermisionarioScreen } from "../permisionario-app"

export function WelcomeScreen({ onNavigate }: { onNavigate: (s: PermisionarioScreen) => void }) {
  const handleListenHelp = () => {
    if ("speechSynthesis" in window) {
      const text = "Bienvenido a Salta Estaciona Transparente. Trabajá habilitado, cobrá de forma clara y brindá confianza en la ciudad. Para crear tu perfil, presioná el botón Crear mi perfil. Si ya tenés cuenta, presioná Ya tengo cuenta."
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "es-AR"
      utterance.rate = 0.9
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="flex h-full flex-col bg-navy">
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-sky shadow-lg">
          <ShieldCheck className="size-10 text-white" />
        </div>

        <h1 className="font-heading text-2xl font-bold text-white">
          Salta Estaciona
        </h1>
        <p className="font-heading text-lg font-semibold text-sky -mt-1">
          Transparente
        </p>

        <div className="mt-6 space-y-2">
          <p className="text-base leading-relaxed text-white/90">
            "Trabajá habilitado, cobrá de forma clara y brindá confianza en la ciudad."
          </p>
          <p className="text-sm text-white/60">
            Una aplicación para permisionarios registrados de Salta Capital.
          </p>
        </div>
      </div>

      <div className="space-y-3 px-6 pb-10">
        <BigButton
          icon={UserPlus}
          label="Crear mi perfil"
          onClick={() => onNavigate("create-profile")}
          variant="secondary"
          className="w-full"
        />
        <BigButton
          icon={LogIn}
          label="Ya tengo cuenta"
          onClick={() => onNavigate("main-panel")}
          variant="outline"
          className="w-full !border-white/30 !text-white hover:!bg-white/10"
        />
        <BigButton
          icon={Ear}
          label="Escuchar ayuda"
          onClick={handleListenHelp}
          variant="primary"
          className="w-full !bg-white/10 !text-white hover:!bg-white/20"
        />
      </div>
    </div>
  )
}
