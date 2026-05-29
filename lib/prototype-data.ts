export const permisionario = {
  id: "PD-0142",
  name: "Juan Pérez",
  dni: "28.456.789",
  cuil: "20-28456789-8",
  birthDate: "15/03/1985",
  phone: "387 512-3456",
  email: "juan.perez@email.com",
  address: "Av. San Martín 1234",
  barrio: "Centro",
  city: "Salta",
  province: "Salta",
  emergencyContact: "María Pérez",
  emergencyPhone: "387 598-7654",
  zone: "Leguizamón",
  zoneStreet: "Calle Leguizamón",
  zoneTramo: "entre Mitre y Balcarce",
  schedule: "12:00 a 20:00",
  status: "Habilitado",
  reputation: "Excelente",
  municipalCode: "MUN-SAL-0142",
  approvalDate: "15/05/2025",
  expirationDate: "15/05/2027",
  profilePicture: null,
  zoneActive: true,
  isSuspended: false,
  serviceAccepted: true,
  serviceCode: "SVC-2026-0892",
}

export const conductor = {
  name: "Laura Gómez",
  dni: "30.123.456",
  phone: "387 511-2233",
  email: "laura.gomez@email.com",
  patente: "AB 123 CD",
  paymentMethod: "Mercado Pago",
}

export interface Reservation {
  id: string
  address: string
  tramo: string
  startTime: string
  endTime: string
  toleranceMinutes: number
  status: "pending" | "confirmed" | "waiting" | "active" | "cancelled" | "finished"
  code: string
  permisionarioId: string
  permisionarioName: string
  zone: string
}

export const activeReservation: Reservation = {
  id: "res-001",
  address: "Av. San Martín 1815",
  tramo: "entre Ituzaingó y Pellegrini",
  startTime: "14:30",
  endTime: "15:30",
  toleranceMinutes: 10,
  status: "confirmed",
  code: "RES-2026-00421",
  permisionarioId: "PD-0142",
  permisionarioName: "Juan Pérez",
  zone: "San Martín",
}

export const reservationHistory: Reservation[] = [
  { id: "res-002", address: "Calle Mitre 320", tramo: "entre España y Pueyrredón", startTime: "10:00", endTime: "11:00", toleranceMinutes: 10, status: "finished", code: "RES-2026-00398", permisionarioId: "PD-0143", permisionarioName: "María García", zone: "Mitre" },
  { id: "res-003", address: "Av. Belgrano 550", tramo: "entre Balcarce y Caseros", startTime: "09:00", endTime: "10:00", toleranceMinutes: 10, status: "finished", code: "RES-2026-00372", permisionarioId: "PD-0142", permisionarioName: "Juan Pérez", zone: "Belgrano" },
  { id: "res-004", address: "Calle España 280", tramo: "entre Mitre y San Martín", startTime: "16:00", endTime: "17:00", toleranceMinutes: 10, status: "cancelled", code: "RES-2026-00345", permisionarioId: "PD-0144", permisionarioName: "Carlos Mendoza", zone: "España" },
]

export interface AvailableZone {
  address: string
  tramo: string
  zone: string
  available: boolean
  distance?: string
  permisionario: string
}

export const availableZones: AvailableZone[] = [
  { address: "Av. San Martín 1815", tramo: "entre Ituzaingó y Pellegrini", zone: "San Martín", available: true, distance: "0 m", permisionario: "Juan Pérez" },
  { address: "Calle Mitre 320", tramo: "entre España y Pueyrredón", zone: "Mitre", available: false, distance: "200 m", permisionario: "María García" },
  { address: "Av. Belgrano 550", tramo: "entre Balcarce y Caseros", zone: "Belgrano", available: true, distance: "350 m", permisionario: "Pedro Gómez" },
  { address: "Calle Leguizamón 150", tramo: "entre Mitre y Balcarce", zone: "Leguizamón", available: true, distance: "500 m", permisionario: "Juan Pérez" },
  { address: "Calle España 280", tramo: "entre Mitre y San Martín", zone: "España", available: false, distance: "120 m", permisionario: "Carlos Mendoza" },
  { address: "Gorriti 450", tramo: "entre San Martín y Alsina", zone: "Gorriti", available: true, distance: "300 m", permisionario: "María García" },
]

export type DocumentStatus =
  | "falta-cargar"
  | "cargado"
  | "en-revision"
  | "aprobado"
  | "rechazado"
  | "vence-pronto"
  | "vencido"

export interface Document {
  id: string
  name: string
  description: string
  status: DocumentStatus
  required: boolean
}

export const documents: Document[] = [
  { id: "dni-frente", name: "DNI frente", description: "Foto del DNI lado frontal", status: "aprobado", required: true },
  { id: "dni-dorso", name: "DNI dorso", description: "Foto del DNI lado posterior", status: "aprobado", required: true },
  { id: "cuil", name: "Constancia de CUIL", description: "Constancia de CUIL actualizada", status: "aprobado", required: true },
  { id: "antecedentes-nac", name: "Antecedentes nacionales", description: "Certificado de antecedentes penales nacionales", status: "aprobado", required: true },
  { id: "antecedentes-prov", name: "Antecedentes provinciales", description: "Certificado de antecedentes provinciales", status: "aprobado", required: true },
  { id: "residencia", name: "Certificado de residencia", description: "Certificado de residencia actual", status: "vence-pronto", required: true },
  { id: "foto-perfil", name: "Foto personal", description: "Foto tipo perfil", status: "aprobado", required: true },
  { id: "declaracion-jurada", name: "Declaración jurada", description: "Declaración jurada de convivencia urbana", status: "aprobado", required: true },
  { id: "normas-municipales", name: "Normas municipales", description: "Aceptación de normas municipales", status: "aprobado", required: true },
  { id: "capacitacion", name: "Capacitación obligatoria", description: "Comprobante de capacitación obligatoria", status: "en-revision", required: false },
]

export interface Payment {
  id: string
  amount: number
  method: "QR" | "efectivo"
  date: string
  time: string
  zone: string
  operationCode: string
  patent?: string
  duration?: string
}

export const payments: Payment[] = [
  { id: "p1", amount: 800, method: "QR", date: "29/05/2026", time: "14:32", zone: "Leguizamón", operationCode: "OP-2026-00142" },
  { id: "p2", amount: 800, method: "QR", date: "29/05/2026", time: "13:58", zone: "Leguizamón", operationCode: "OP-2026-00141" },
  { id: "p3", amount: 800, method: "efectivo", date: "29/05/2026", time: "13:20", zone: "Leguizamón", operationCode: "OP-2026-00140" },
  { id: "p4", amount: 1600, method: "QR", date: "29/05/2026", time: "12:45", zone: "Leguizamón", operationCode: "OP-2026-00139" },
  { id: "p5", amount: 800, method: "efectivo", date: "28/05/2026", time: "18:10", zone: "Leguizamón", operationCode: "OP-2026-00130" },
  { id: "p6", amount: 800, method: "QR", date: "28/05/2026", time: "17:45", zone: "Leguizamón", operationCode: "OP-2026-00129" },
  { id: "p7", amount: 800, method: "efectivo", date: "28/05/2026", time: "16:30", zone: "Leguizamón", operationCode: "OP-2026-00128" },
  { id: "p8", amount: 1600, method: "QR", date: "28/05/2026", time: "14:00", zone: "Leguizamón", operationCode: "OP-2026-00125" },
]

export const todayStats = {
  totalQRCobros: 3,
  totalEfectivoCobros: 1,
  totalAmount: 4000,
  commissionEstimate: 800,
  totalQRAmount: 3200,
  totalEfectivoAmount: 800,
}

export const weeklyHistory = [
  { day: "Lun", amount: 12400, qr: 9600, efectivo: 2800 },
  { day: "Mar", amount: 10800, qr: 8000, efectivo: 2800 },
  { day: "Mié", amount: 15200, qr: 12800, efectivo: 2400 },
  { day: "Jue", amount: 13600, qr: 10400, efectivo: 3200 },
  { day: "Vie", amount: 16800, qr: 13600, efectivo: 3200 },
  { day: "Sáb", amount: 9600, qr: 6400, efectivo: 3200 },
  { day: "Dom", amount: 0, qr: 0, efectivo: 0 },
]

export const monthlyHistory = [
  { week: "Sem 1", amount: 68400 },
  { week: "Sem 2", amount: 71200 },
  { week: "Sem 3", amount: 59600 },
  { week: "Sem 4", amount: 64800 },
]

export const tariff = {
  amount: 800,
  currency: "ARS",
  concept: "Estacionamiento medido",
  durationOptions: [
    { label: "30 min", value: 400 },
    { label: "1 hora", value: 800 },
    { label: "2 horas", value: 1600 },
    { label: "3 horas", value: 2400 },
    { label: "Media jornada", value: 3200 },
    { label: "Jornada completa", value: 5600 },
  ],
}

export const municipalMockData = {
  pendingRequests: 8,
  pendingDocs: 15,
  activePermisionarios: 47,
  aboutToExpire: 6,
  expired: 3,
  suspended: 2,
  totalPermisionarios: 62,
  todayQRCobros: 184,
  todayEfectivoCobros: 67,
  todayTotalRecaudado: 256800,
  weeklyRecaudacion: [184000, 212000, 198000, 245000, 267000, 156000, 89000],
  monthlyRecaudacion: 7840000,
  registeredConductores: 1250,
  activeReservas: 38,
  cancelledReservas: 12,
  reclamosPendientes: 5,
}

export const pendingProfiles = [
  { id: "PD-0150", name: "Carlos Mendoza", dni: "30.123.456", date: "28/05/2026", status: "pendiente" },
  { id: "PD-0151", name: "Ana López", dni: "27.987.654", date: "27/05/2026", status: "pendiente" },
  { id: "PD-0152", name: "Roberto Sánchez", dni: "32.456.789", date: "26/05/2026", status: "pendiente" },
]

export const serviceOptions = [
  {
    id: "svc-1",
    zone: "Leguizamón",
    street: "Calle Leguizamón",
    tramo: "entre Mitre y Balcarce",
    schedule: "12:00 a 20:00",
    tariff: "$800/hora",
  },
  {
    id: "svc-2",
    zone: "Gorriti",
    street: "Calle Gorriti",
    tramo: "entre San Martín y Alsina",
    schedule: "08:00 a 16:00",
    tariff: "$800/hora",
  },
]
