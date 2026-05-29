"use client"

import { useState, useCallback } from "react"
import { WelcomeScreen } from "./permisionario/welcome"
import { CreateProfileScreen } from "./permisionario/create-profile"
import { DocumentsScreen } from "./permisionario/documents"
import { ProfileValidatedScreen } from "./permisionario/profile"
import { RenewalScreen } from "./permisionario/renewal"
import { MainPanelScreen } from "./permisionario/main-panel"
import { ServiceAssignmentScreen } from "./permisionario/service-assignment"
import { CobrarQRScreen } from "./permisionario/cobrar-qr"
import { CobrarEfectivoScreen } from "./permisionario/cobrar-efectivo"
import { MiZonaScreen } from "./permisionario/mi-zona"
import { MisCobrosScreen } from "./permisionario/mis-cobros"
import { PerfilPublicoScreen } from "./permisionario/perfil-publico"
import { AyudaScreen } from "./permisionario/ayuda"

export type PermisionarioScreen =
  | "welcome"
  | "create-profile"
  | "documents"
  | "profile-validated"
  | "renewal"
  | "main-panel"
  | "service-assignment"
  | "cobrar-qr"
  | "cobrar-efectivo"
  | "mi-zona"
  | "mis-cobros"
  | "perfil-publico"
  | "ayuda"

export function PermisionarioApp() {
  const [screen, setScreen] = useState<PermisionarioScreen>("service-assignment")

  const navigate = useCallback((s: PermisionarioScreen) => {
    setScreen(s)
  }, [])

  switch (screen) {
    case "welcome":
      return <WelcomeScreen onNavigate={navigate} />
    case "create-profile":
      return <CreateProfileScreen onNavigate={navigate} />
    case "documents":
      return <DocumentsScreen onNavigate={navigate} />
    case "profile-validated":
      return <ProfileValidatedScreen onNavigate={navigate} />
    case "renewal":
      return <RenewalScreen onNavigate={navigate} />
    case "service-assignment":
      return <ServiceAssignmentScreen onNavigate={navigate} />
    case "cobrar-qr":
      return <CobrarQRScreen onNavigate={navigate} />
    case "cobrar-efectivo":
      return <CobrarEfectivoScreen onNavigate={navigate} />
    case "mi-zona":
      return <MiZonaScreen onNavigate={navigate} />
    case "mis-cobros":
      return <MisCobrosScreen onNavigate={navigate} />
    case "perfil-publico":
      return <PerfilPublicoScreen onNavigate={navigate} />
    case "ayuda":
      return <AyudaScreen onNavigate={navigate} />
    case "main-panel":
    default:
      return <MainPanelScreen onNavigate={navigate} />
  }
}
