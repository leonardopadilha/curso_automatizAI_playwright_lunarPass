import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { Navbar } from '../pages/components/navbar'

import { faker } from '@faker-js/faker'

let loginPage: LoginPage
let navbar: Navbar

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    navbar = new Navbar(page)

    await loginPage.go()
    await loginPage.login('buzz@lunarpass.dev', 'pwd123')
    await expect(navbar.logout).toBeVisible({ timeout: 10_0000 })
})

test('deve cadastrar uma nova missão', async ({ page }) => {

  const mission = {
    id: `LP-${faker.string.alphanumeric({ length: { min: 5, max: 5 }, casing: 'upper' })}`,
    rocket: 'Starship',
    lunarBase: 'aurora',
    departureDate: '2028-01-20',
    returnDate: '27 de jan. de 2028',
    price: '1000'
  }

  await page.getByRole('link', { name: 'Nova missão' }).click()
  await expect(page.getByRole('heading', { name: 'Programar missão' })).toBeVisible()

  await page.getByRole('textbox', { name: 'ID da missão' }).fill(mission.id)
  await page.getByRole('textbox', { name: 'Foguete' }).fill(mission.rocket)
  await page.getByLabel('Base lunar').selectOption(mission.lunarBase)
  await page.getByRole('textbox', { name: 'Data de partida' }).fill(mission.departureDate)
  await expect(page.getByTestId('mission-form-return-date')).toContainText(mission.returnDate)
  await page.getByRole('spinbutton', { name: 'Preço por passagem (USD)' }).fill(mission.price)
  
  await page.getByRole('button', { name: 'Salvar missão' }).click()
  await expect(page.getByRole('listitem')).toContainText('Missão programadaA nova missão foi adicionada ao catálogo e já está disponível para reservas.')
})