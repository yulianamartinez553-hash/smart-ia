"use client"

import { useState, useCallback } from "react"
import { RegisterScreen } from "./conductor/register"
import { MainPanelScreen } from "./conductor/main-panel"
import { VoiceReserveScreen } from "./conductor/voice-reserve"
import { ReservationScreen } from "./conductor/reservation"
import { PayQRScreen } from "./conductor/pay-qr"
import { TicketScreen } from "./conductor/ticket"
import { ClaimsScreen } from "./conductor/claims"
import { MyReservationsScreen } from "./conductor/my-reservations"
import { ProfileScreen } from "./conductor/profile"

export type ConductorScreen =
  | "register"
  | "main-panel"
  | "voice-reserve"
  | "reservation"
  | "pay-qr"
  | "ticket"
  | "claims"
  | "my-reservations"
  | "profile"

export function ConductorApp() {
  const [screen, setScreen] = useState<ConductorScreen>("register")

  const navigate = useCallback((s: ConductorScreen) => {
    setScreen(s)
  }, [])

  switch (screen) {
    case "register":
      return <RegisterScreen onNavigate={navigate} />
    case "voice-reserve":
      return <VoiceReserveScreen onNavigate={navigate} />
    case "reservation":
      return <ReservationScreen onNavigate={navigate} />
    case "pay-qr":
      return <PayQRScreen onNavigate={navigate} />
    case "ticket":
      return <TicketScreen onNavigate={navigate} />
    case "claims":
      return <ClaimsScreen onNavigate={navigate} />
    case "my-reservations":
      return <MyReservationsScreen onNavigate={navigate} />
    case "profile":
      return <ProfileScreen onNavigate={navigate} />
    case "main-panel":
    default:
      return <MainPanelScreen onNavigate={navigate} />
  }
}
