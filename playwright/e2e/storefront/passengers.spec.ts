import { test, expect } from '../../support'

import { Mission } from '../../support/types'
import { cleanAndInsertMission } from '../../support/db'

test('Aceitar nome com 3 caracteres e passaporte com 5 caracteres (mínimos válidos)', async ({ app }) => {
  // Arrange
  const mission: Mission = {
    id: 'LP-0929A',
    rocket: 'Starship',
    baseId: 'alpha',
    departureDate: '2029-09-10',
    returnDate: '2029-09-17',
    price: 1000.00
  }

  await cleanAndInsertMission(mission)
  await app.store.bookingPage.go(mission.id)
  await app.store.bookingPage.selectSeats(['A1'])
  await app.store.bookingPage.continue()

  // Act
  await app.store.bookingPage.submitPassenger('Ana', 'XP123')

  // Assert
  await expect(app.store.bookingPage.paymentTitle).toBeVisible()
})

test('Aceitar nome com 120 caracteres e passaporte com 30 caracteres (máximos válidos)', async ({ app }) => {
  // Arrange
  const mission: Mission = {
    id: 'LP-0929B',
    rocket: 'Starship',
    baseId: 'orion',
    departureDate: '2029-09-12',
    returnDate: '2029-09-19',
    price: 1000.00
  }

  await cleanAndInsertMission(mission)
  await app.store.bookingPage.go(mission.id)
  await app.store.bookingPage.selectSeats(['A1'])
  await app.store.bookingPage.continue()

  // Act
  await app.store.bookingPage.submitPassenger('A'.repeat(120), 'X'.repeat(30))

  // Assert
  await expect(app.store.bookingPage.paymentTitle).toBeVisible()
})

test('Recusar nome com 2 caracteres (abaixo do limite mínimo)', async ({ app }) => {
  // Arrange
  const mission: Mission = {
    id: 'LP-0929C',
    rocket: 'Starship',
    baseId: 'aurora',
    departureDate: '2029-09-14',
    returnDate: '2029-09-21',
    price: 1000.00
  }

  await cleanAndInsertMission(mission)
  await app.store.bookingPage.go(mission.id)
  await app.store.bookingPage.selectSeats(['A1'])
  await app.store.bookingPage.continue()

  // Act
  await app.store.bookingPage.submitPassenger('Ab', 'X'.repeat(15))

  // Assert
  await expect(app.store.bookingPage.alert).toHaveText('O nome deve ter pelo menos 3 caracteres')
  await expect(app.store.bookingPage.fullNameInput).toBeFocused()
})

test('Recusar nome com 121 caracteres (acima do limite máximo)', async ({ app }) => {
  // Arrange
  const mission: Mission = {
    id: 'LP-0929D',
    rocket: 'Starship',
    baseId: 'selene',
    departureDate: '2029-09-16',
    returnDate: '2029-09-23',
    price: 1000.00
  }

  await cleanAndInsertMission(mission)
  await app.store.bookingPage.go(mission.id)
  await app.store.bookingPage.selectSeats(['A1'])
  await app.store.bookingPage.continue()

  // Act
  await app.store.bookingPage.submitPassenger('A'.repeat(121), 'X'.repeat(15))

  // Assert
  await expect(app.store.bookingPage.alert).toHaveText('O nome deve ter no máximo 120 caracteres')
  await expect(app.store.bookingPage.fullNameInput).toBeFocused()
})

test('Recusar passaporte com 4 caracteres (abaixo do limite mínimo)', async ({ app }) => {
  // Arrange
  const mission: Mission = {
    id: 'LP-0929E',
    rocket: 'Starship',
    baseId: 'alpha',
    departureDate: '2029-09-18',
    returnDate: '2029-09-25',
    price: 1000.00
  }

  await cleanAndInsertMission(mission)
  await app.store.bookingPage.go(mission.id)
  await app.store.bookingPage.selectSeats(['A1'])
  await app.store.bookingPage.continue()

  // Act
  await app.store.bookingPage.submitPassenger('A'.repeat(30), 'XP12')

  // Assert
  await expect(app.store.bookingPage.alert).toHaveText('O passaporte deve ter pelo menos 5 caracteres')
  await expect(app.store.bookingPage.passportInput).toBeFocused()
})

test('Recusar passaporte com 31 caracteres (acima do limite máximo)', async ({ app }) => {
  // Arrange
  const mission: Mission = {
    id: 'LP-0929F',
    rocket: 'Starship',
    baseId: 'orion',
    departureDate: '2029-09-20',
    returnDate: '2029-09-27',
    price: 1000.00
  }

  await cleanAndInsertMission(mission)
  await app.store.bookingPage.go(mission.id)
  await app.store.bookingPage.selectSeats(['A1'])
  await app.store.bookingPage.continue()

  // Act
  await app.store.bookingPage.submitPassenger('A'.repeat(30), 'X'.repeat(31))

  // Assert
  await expect(app.store.bookingPage.alert).toHaveText('O passaporte deve ter no máximo 30 caracteres')
  await expect(app.store.bookingPage.passportInput).toBeFocused()
})
