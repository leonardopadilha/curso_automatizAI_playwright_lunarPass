import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

import { LoginPage } from '../pages/login.page'
import { DashPage } from '../pages/dash.page'
import { RegisterPage } from '../pages/register.page'

import { Navbar } from '../pages/components/navbar'
import { Toast } from '../pages/components/toast'

import { Mission } from '../support/mission'

let loginPage: LoginPage
let dashPage: DashPage
let registerPage: RegisterPage

let navbar: Navbar
let toast: Toast

const MESSAGE = 'Use o formato LP-0000'

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    dashPage = new DashPage(page)
    registerPage = new RegisterPage(page)

    navbar = new Navbar(page)
    toast = new Toast(page)

    await loginPage.go()
    await loginPage.login('buzz@lunarpass.dev', 'pwd123')
    await expect(navbar.logout).toBeVisible({ timeout: 10_000 })
})

test('deve cadastrar uma nova missão', async ({ page }) => {

  const mission: Mission = {
    id: `LP-${faker.string.alphanumeric({ length: { min: 5, max: 5 }, casing: 'upper' })}`,
    rocket: 'Starship',
    lunarBase: 'aurora',
    departureDate: '2028-01-20',
    returnDate: '27 de jan. de 2028',
    price: '1000'
  }

  await dashPage.addButton.click()
  await expect(registerPage.title).toBeVisible()
  await registerPage.submit(mission)
  await expect(toast.message).toContainText(MESSAGE)
})

test('não deve cadastrar com código de missão incorreto', async ({ page }) => {

  const mission: Mission = {
    id: faker.string.alphanumeric({ length: { min: 5, max: 5 }, casing: 'upper' }),
    rocket: 'Starship',
    lunarBase: 'aurora',
    departureDate: '2028-01-20',
    returnDate: '27 de jan. de 2028',
    price: '1000'
  }

  await dashPage.addButton.click()
  await expect(registerPage.title).toBeVisible()
  await registerPage.submit(mission)
  await expect(registerPage.alert).toHaveText(MESSAGE)
})