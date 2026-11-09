export interface LunarBase {
  id: string,
  name: string,
  shortName: string,
  tagline: string,
  description: string,
  imageUrl: string,
  sortOrder: number,
  isActive: boolean,
  createdAt?: string
}

export interface Mission {
  id: string,
  rocket: string,
  baseId: string,
  departureDate: string,
  returnDate: string,
  price: number
}

export interface Reservation {
  id: string,
  userId?: string | null,
  missionId: string,
  reservationCode: string,
  contactEmail: string,
  totalPrice: number,
  status: string,
  createdAt?: string
}

export interface Ticket {
  id?: string,
  reservationId: string,
  missionId: string,
  seat: string,
  fullName: string,
  document: string
}

export type CardBrand = 'Visa' | 'Mastercard' | 'American Express'

export interface StripePaymentResponse {
  status: 'approved' | 'declined' | 'incorrect_card_data',
  message: string,
  brand: CardBrand,
  paymentId?: string
}
