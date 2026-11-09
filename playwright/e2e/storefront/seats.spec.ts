import { test, expect } from '../../support'

import { Mission, Reservation, Ticket } from '../../support/types'
import { cleanAndInsertMission, insertReservation, insertTickets } from '../../support/db'

test('Impedir o avanço sem seleção mínima de assentos', async ({ app }) => {
  // Arrange
  const mission: Mission = {
    id: 'LP-0829A',
    rocket: 'Starship',
    baseId: 'alpha',
    departureDate: '2029-08-10',
    returnDate: '2029-08-17',
    price: 1000.00
  }

  await cleanAndInsertMission(mission)
  await app.store.bookingPage.go(mission.id)

  // Act
  // O botão "Continuar" permanece desabilitado enquanto nenhum assento é selecionado, impedindo o clique na interface.

  // Assert
  await expect(app.store.bookingPage.continueButton).toBeDisabled()
  await expect(app.store.bookingPage.noSeatsMessage).toHaveText('Nenhum assento escolhido')
})

test('Avançar com seleção máxima de assentos permitida', async ({ app }) => {
  // Arrange
  const mission: Mission = {
    id: 'LP-0829B',
    rocket: 'Starship',
    baseId: 'orion',
    departureDate: '2029-08-12',
    returnDate: '2029-08-19',
    price: 1000.00
  }

  await cleanAndInsertMission(mission)
  await app.store.bookingPage.go(mission.id)

  // Act
  await app.store.bookingPage.selectSeats(['A1', 'A2', 'B1', 'B2'])
  await app.store.bookingPage.continue()

  // Assert
  await expect(app.store.bookingPage.totalPrice).toHaveText('USD 4,000.00')
  await expect(app.store.bookingPage.passengersTitle).toBeVisible()
})

test('Tentar selecionar assento já ocupado', async ({ app }) => {
  // Arrange
  const mission: Mission = {
    id: 'LP-0829C',
    rocket: 'Starship',
    baseId: 'aurora',
    departureDate: '2029-08-14',
    returnDate: '2029-08-21',
    price: 1000.00
  }

  const reservation: Reservation = {
    id: 'a47ac10b-58cc-4372-a567-0e02b2c3d829',
    userId: null,
    missionId: mission.id,
    reservationCode: 'AUR829',
    contactEmail: 'papito@teste.com',
    totalPrice: 1000.00,
    status: 'confirmed'
  }

  const tickets: Ticket[] = [
    {
      id: 'b9a646d3-9c61-4cb7-bfcd-ee2522c8f829',
      reservationId: reservation.id,
      missionId: mission.id,
      seat: 'A1',
      fullName: 'Fernando Papito',
      document: 'XP12345'
    }
  ]

  await cleanAndInsertMission(mission)
  await insertReservation(reservation)
  await insertTickets(tickets)
  await app.store.bookingPage.go(mission.id)

  // Act
  await app.store.bookingPage.selectSeat('A1')

  // Assert
  await expect(app.store.bookingPage.seatButton('A1')).toHaveAttribute('aria-pressed', 'false')
  await expect(app.store.bookingPage.alert).toHaveText('O assento A1 já está ocupado. Escolha outro.')
})
