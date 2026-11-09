import { test, expect } from '../../support'

import { Mission, Reservation, Ticket } from '../../support/types'
import { cleanAndInsertMission, insertReservation, insertTickets } from '../../support/db'

test('Emissão de tickets com sucesso após pagamento aprovado com Visa', async ({ app }) => {
  // Arrange
  const mission: Mission = {
    id: 'LP-1029A',
    rocket: 'Starship',
    baseId: 'alpha',
    departureDate: '2029-10-10',
    returnDate: '2029-10-17',
    price: 1000.00
  }

  await cleanAndInsertMission(mission)
  await app.services.stripe.approvePayment('Visa', 'pi_3UX6sz14NoBxd29D08GIaxi1')
  await app.store.bookingPage.go(mission.id)
  await app.store.bookingPage.selectSeats(['A1', 'A2'])
  await app.store.bookingPage.continue()
  await app.store.bookingPage.submitPassengers([
    { seat: 'A1', fullName: 'Buzz Aldrin', passport: 'XP12345' },
    { seat: 'A2', fullName: 'Neil Armstrong', passport: 'XP67890' }
  ])

  // Act
  await app.store.bookingPage.submitPayment({
    email: 'buzz@lunarpass.dev',
    cardName: 'Buzz Aldrin',
    cardNumber: '4242 4242 4242 4242',
    expiry: '12/30',
    cvv: '123'
  })

  // Assert
  await expect(app.store.bookingPage.reservationCode).toHaveText(/^[A-Z0-9]{6}$/)
  await expect(app.store.bookingPage.reservationTickets).toHaveText([
    'Buzz AldrinXP12345 · Passagem A1',
    'Neil ArmstrongXP67890 · Passagem A2'
  ])
  await expect(app.store.bookingPage.paymentApprovedMessage).toHaveText(
    'Pagamento aprovado! Pode arrumar as malas: a Lua já está esperando por você.'
  )
})

test('Emissão de tickets com sucesso após pagamento aprovado com Mastercard', async ({ app }) => {
  // Arrange
  const mission: Mission = {
    id: 'LP-1029B',
    rocket: 'Starship',
    baseId: 'orion',
    departureDate: '2029-10-12',
    returnDate: '2029-10-19',
    price: 1000.00
  }

  await cleanAndInsertMission(mission)
  await app.services.stripe.approvePayment('Mastercard', 'pi_3UX6sz14NoBxd29D08GIaxi2')
  await app.store.bookingPage.go(mission.id)
  await app.store.bookingPage.selectSeats(['A1', 'A2'])
  await app.store.bookingPage.continue()
  await app.store.bookingPage.submitPassengers([
    { seat: 'A1', fullName: 'Buzz Aldrin', passport: 'XP12345' },
    { seat: 'A2', fullName: 'Neil Armstrong', passport: 'XP67890' }
  ])

  // Act
  await app.store.bookingPage.submitPayment({
    email: 'buzz@lunarpass.dev',
    cardName: 'Buzz Aldrin',
    cardNumber: '5555 5555 5555 4444',
    expiry: '12/30',
    cvv: '123'
  })

  // Assert
  await expect(app.store.bookingPage.reservationCode).toHaveText(/^[A-Z0-9]{6}$/)
  await expect(app.store.bookingPage.reservationTickets).toHaveText([
    'Buzz AldrinXP12345 · Passagem A1',
    'Neil ArmstrongXP67890 · Passagem A2'
  ])
  await expect(app.store.bookingPage.paymentApprovedMessage).toHaveText(
    'Pagamento aprovado! Pode arrumar as malas: a Lua já está esperando por você.'
  )
})

test('Emissão de tickets com sucesso após pagamento aprovado com American Express', async ({ app }) => {
  // Arrange
  const mission: Mission = {
    id: 'LP-1029C',
    rocket: 'Starship',
    baseId: 'aurora',
    departureDate: '2029-10-14',
    returnDate: '2029-10-21',
    price: 1000.00
  }

  await cleanAndInsertMission(mission)
  await app.services.stripe.approvePayment('American Express', 'pi_3UX6sz14NoBxd29D08GIaxi3')
  await app.store.bookingPage.go(mission.id)
  await app.store.bookingPage.selectSeats(['A1', 'A2'])
  await app.store.bookingPage.continue()
  await app.store.bookingPage.submitPassengers([
    { seat: 'A1', fullName: 'Buzz Aldrin', passport: 'XP12345' },
    { seat: 'A2', fullName: 'Neil Armstrong', passport: 'XP67890' }
  ])

  // Act
  await app.store.bookingPage.submitPayment({
    email: 'buzz@lunarpass.dev',
    cardName: 'Buzz Aldrin',
    cardNumber: '3782 822463 10005',
    expiry: '12/30',
    cvv: '1234'
  })

  // Assert
  await expect(app.store.bookingPage.reservationCode).toHaveText(/^[A-Z0-9]{6}$/)
  await expect(app.store.bookingPage.reservationTickets).toHaveText([
    'Buzz AldrinXP12345 · Passagem A1',
    'Neil ArmstrongXP67890 · Passagem A2'
  ])
  await expect(app.store.bookingPage.paymentApprovedMessage).toHaveText(
    'Pagamento aprovado! Pode arrumar as malas: a Lua já está esperando por você.'
  )
})

test('Manter dados na tela quando o pagamento é recusado por dados incorretos', async ({ app }) => {
  // Arrange
  const mission: Mission = {
    id: 'LP-1029D',
    rocket: 'Starship',
    baseId: 'selene',
    departureDate: '2029-10-16',
    returnDate: '2029-10-23',
    price: 1000.00
  }

  await cleanAndInsertMission(mission)
  await app.services.stripe.rejectCardData('Visa')
  await app.store.bookingPage.go(mission.id)
  await app.store.bookingPage.selectSeats(['A1'])
  await app.store.bookingPage.continue()
  await app.store.bookingPage.submitPassenger('Buzz Aldrin', 'XP12345')

  // Act
  await app.store.bookingPage.submitPayment({
    email: 'buzz@lunarpass.dev',
    cardName: 'Buzz Aldrin',
    cardNumber: '4000 0000 0000 0127',
    expiry: '12/30',
    cvv: '123'
  })

  // Assert
  await expect(app.store.bookingPage.alert).toContainText('Dados do cartão incorretos.')
  await expect(app.store.bookingPage.cardNumberInput).toHaveValue('4000 0000 0000 0127')
})

test('Manter dados na tela quando o pagamento é negado pela operadora', async ({ app }) => {
  // Arrange
  const mission: Mission = {
    id: 'LP-1029E',
    rocket: 'Starship',
    baseId: 'orion',
    departureDate: '2029-10-18',
    returnDate: '2029-10-25',
    price: 1000.00
  }

  await cleanAndInsertMission(mission)
  await app.services.stripe.declinePayment('Visa')
  await app.store.bookingPage.go(mission.id)
  await app.store.bookingPage.selectSeats(['A1'])
  await app.store.bookingPage.continue()
  await app.store.bookingPage.submitPassenger('Buzz Aldrin', 'XP12345')

  // Act
  await app.store.bookingPage.submitPayment({
    email: 'buzz@lunarpass.dev',
    cardName: 'Buzz Aldrin',
    cardNumber: '4000 0000 0000 0002',
    expiry: '12/30',
    cvv: '123'
  })

  // Assert
  await expect(app.store.bookingPage.alert).toContainText('Pagamento negado pela operadora do cartão.')
  await expect(app.store.bookingPage.cardNumberInput).toHaveValue('4000 0000 0000 0002')
})

test('Bloqueio da reserva por concorrência de assentos no momento do processamento', async ({ app }) => {
  // Arrange
  const mission: Mission = {
    id: 'LP-1029F',
    rocket: 'Starship',
    baseId: 'alpha',
    departureDate: '2029-10-20',
    returnDate: '2029-10-27',
    price: 1000.00
  }

  const concurrentReservation: Reservation = {
    id: 'd47ac10b-58cc-4372-a567-0e02b2c31029',
    userId: null,
    missionId: mission.id,
    reservationCode: 'CON102',
    contactEmail: 'outro@lunarpass.dev',
    totalPrice: 1000.00,
    status: 'confirmed'
  }

  const concurrentTickets: Ticket[] = [
    {
      id: 'e9a646d3-9c61-4cb7-bfcd-ee2522c81029',
      reservationId: concurrentReservation.id,
      missionId: mission.id,
      seat: 'A1',
      fullName: 'Michael Collins',
      document: 'XP99999'
    }
  ]

  await cleanAndInsertMission(mission)
  await app.services.stripe.approvePayment('Visa', 'pi_3UX6sz14NoBxd29D08GIaxi4')
  await app.store.bookingPage.go(mission.id)
  await app.store.bookingPage.selectSeats(['A1'])
  await app.store.bookingPage.continue()
  await app.store.bookingPage.submitPassenger('Buzz Aldrin', 'XP12345')

  await insertReservation(concurrentReservation)
  await insertTickets(concurrentTickets)

  // Act
  await app.store.bookingPage.submitPayment({
    email: 'buzz@lunarpass.dev',
    cardName: 'Buzz Aldrin',
    cardNumber: '4242 4242 4242 4242',
    expiry: '12/30',
    cvv: '123'
  })

  // Assert
  await expect(app.store.bookingPage.alert).toContainText('Não foi possível processar')
  await expect(app.store.bookingPage.alert).toContainText(
    'Um dos assentos acabou de ser reservado. Escolha outro.'
  )
})
