import { faker } from '@faker-js/faker'

import { test, expect } from '../support/index.ts'
import { Mission } from '../support/types'
import { cleanMission, cleanAndInsertMission } from '../support/db'

test.beforeEach(async ({ app }) => {
    await app.loginPage.go()
    await app.loginPage.login('buzz@lunarpass.dev', 'pwd123')
    await expect(app.navbar.logout).toBeVisible({ timeout: 10_000 })
})

test('deve cadastrar uma nova missão', async ({ app }) => {

    const mission: Mission = {
        id: `LP-0128A`,
        rocket: 'Starship',
        baseId: 'aurora',
        departureDate: '2028-01-20',
        returnDate: '2028-01-27',
        price: 1000.00
    }

    await cleanMission(mission)

    await app.dashPage.addButton.click()
    await expect(app.registerPage.title).toBeVisible()
    await app.registerPage.submit(mission)
    await expect(app.toast.message).toContainText("A nova missão foi adicionada ao catálogo e já está disponível para reservas.")
})

test('não deve cadastrar com código de missão incorreto', async ({ app }) => {

    const mission: Mission = {
        id: faker.string.alphanumeric({ length: { min: 5, max: 5 }, casing: 'upper' }),
        rocket: 'Starship',
        baseId: 'aurora',
        departureDate: '2028-01-20',
        returnDate: '2028-01-27',
        price: 1000.00
    }

    await app.dashPage.addButton.click()
    await expect(app.registerPage.title).toBeVisible()
    await app.registerPage.submit(mission)
    await expect(app.registerPage.alert).toHaveText('Use o formato LP-0000')
})

test('não deve cadastrar com código duplicado', async ({ app }) => {

    const mission: Mission = {
        id: 'LP-DUP01',
        rocket: 'Starship',
        baseId: 'aurora',
        departureDate: '2028-01-20',
        returnDate: '2028-01-27',
        price: 1000.00
    }

    await cleanAndInsertMission(mission)

    await app.dashPage.addButton.click()
    await expect(app.registerPage.title).toBeVisible()
    await app.registerPage.submit(mission)
    await expect(app.registerPage.alert).toHaveText('Já existe uma missão com este ID.')
})
