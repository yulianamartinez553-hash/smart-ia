"use client"

import { useState } from "react"
import { Car, HardHat, Building2, ArrowRight } from "lucide-react"
import { Logo } from "@/components/prototype/logo"
import { PhoneFrame } from "@/components/prototype/phone-frame"
import { ConductorApp } from "@/components/prototype/conductor-app"
import { PermisionarioApp } from "@/components/prototype/permisionario-app"
import { MunicipalDashboard } from "@/components/prototype/municipal-dashboard"

type AppView = "landing" | "conductor" | "permisionario" | "municipal"

export default function Page() {
  const [view, setView] = useState<AppView>("landing")

  if (view === "municipal") {
    return (
      <div className="puna-theme min-h-screen bg-gray-soft">
        <header className="sticky top-0 z-50 border-b border-border bg-card/95 px-4 py-3 backdrop-blur md:px-6">
          <div className="flex items-center justify-between">
            <Logo />
            <button onClick={() => setView("landing")} className="text-xs text-gray-text hover:text-navy underline">
              Volver
            </button>
          </div>
        </header>
        <MunicipalDashboard />
      </div>
    )
  }

  if (view === "conductor" || view === "permisionario") {
    return (
      <div className="puna-theme flex min-h-screen flex-col bg-gray-soft">
        <header className="sticky top-0 z-50 border-b border-border bg-card/95 px-4 py-2 backdrop-blur md:px-6">
          <div className="flex items-center justify-between">
            <Logo />
            <button onClick={() => setView("landing")} className="text-xs text-gray-text hover:text-navy underline">
              Salir
            </button>
          </div>
        </header>
        <div className="flex flex-1 items-center justify-center px-0 py-0 md:px-6 md:py-4">
          <PhoneFrame>
            {view === "conductor" ? <ConductorApp /> : <PermisionarioApp />}
          </PhoneFrame>
        </div>
      </div>
    )
  }

  return <LandingPage onSelect={setView} />
}

function LandingPage({ onSelect }: { onSelect: (v: AppView) => void }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(45,156,219,0.22),transparent_38%),radial-gradient(circle_at_85%_70%,rgba(0,191,166,0.18),transparent_34%)]" />

      <header className="relative z-10 border-b border-white/10 bg-navy/70 px-5 py-4 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <Logo variant="light" />
          <button
            onClick={() => onSelect("municipal")}
            className="inline-flex items-center gap-2 border border-white/20 px-3 py-1.5 text-xs uppercase tracking-wider text-white/80 transition hover:border-sky hover:text-white"
          >
            <Building2 className="size-3.5" /> Panel municipal
          </button>
        </div>
      </header>

      <div className="relative z-10 overflow-hidden border-y border-sky/50 bg-sky py-2">
        <div className="puna-marquee flex w-[200%] whitespace-nowrap text-xs font-semibold uppercase tracking-[0.16em] text-white">
          <span className="px-6">Salta Estaciona Transparente</span>
          <span className="px-6">Orden urbano · Inclusion laboral · Estacionamiento seguro</span>
          <span className="px-6">Reserva con voz · Cobro autorizado · Control municipal</span>
          <span className="px-6">Salta Estaciona Transparente</span>
          <span className="px-6">Orden urbano · Inclusion laboral · Estacionamiento seguro</span>
          <span className="px-6">Reserva con voz · Cobro autorizado · Control municipal</span>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-10">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-sky">Plataforma municipal</p>
          <h1 className="mt-2 font-heading text-5xl font-black uppercase leading-[0.9] md:text-7xl">Salta</h1>
          <h1 className="font-heading text-5xl font-black uppercase leading-[0.9] text-sky md:text-7xl">Estaciona</h1>
          <h1 className="font-heading text-5xl font-black uppercase leading-[0.9] text-turquoise md:text-7xl">Transparente</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 md:text-base">
            Orden urbano, inclusion laboral y estacionamiento seguro.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
        <button
          onClick={() => onSelect("conductor")}
            className="group flex w-full items-center gap-4 border border-white/15 bg-white/[0.04] p-5 text-left transition hover:border-sky"
        >
            <span className="flex size-14 shrink-0 items-center justify-center bg-sky">
            <Car className="size-7 text-white" />
          </span>
          <div>
              <p className="font-heading text-xl font-bold uppercase text-white">Quiero estacionar</p>
              <p className="text-sm text-white/70">Reserva un espacio publico habilitado</p>
              <p className="mt-2 text-xs text-sky underline">Registrarme como conductor</p>
          </div>
            <ArrowRight className="ml-auto size-5 text-white/60 transition group-hover:text-sky" />
        </button>

        <button
          onClick={() => onSelect("permisionario")}
            className="group flex w-full items-center gap-4 border border-white/15 bg-white/[0.04] p-5 text-left transition hover:border-sky"
        >
            <span className="flex size-14 shrink-0 items-center justify-center bg-turquoise">
            <HardHat className="size-7 text-white" />
          </span>
          <div>
              <p className="font-heading text-xl font-bold uppercase text-white">Soy permisionario</p>
              <p className="text-sm text-white/70">Trabaja habilitado y cobra de forma transparente</p>
              <p className="mt-2 text-xs text-sky underline">Registrarme como permisionario</p>
          </div>
            <ArrowRight className="ml-auto size-5 text-white/60 transition group-hover:text-sky" />
        </button>
        </div>

        <div className="mt-8 text-center text-xs text-white/45">
          <p>Presentacion ideathon · Municipalidad de Salta Capital</p>
        </div>
      </div>
    </div>
  )
}
