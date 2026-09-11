import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page'

let loginPage: LoginPage

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.go()
})

test('Deve autenticar no controle de missões', async ({ page }) => {
    await loginPage.login('buzz@lunarpass.dev', 'pwd123')
    await loginPage.isLoggedUser()
})

test('Não deve autenticar com senha incorreta', async ({ page }) => {
    await loginPage.login('buzz@lunarpass.dev', 'abc123')
    await expect(loginPage.alert).toHaveText('E-mail ou senha inválidos.')
})

test('Não deve autenticar com email não cadastrado', async ({ page }) => {
    await loginPage.login('404@lunarpass.dev', 'pwd123')
    await expect(loginPage.alert).toHaveText('E-mail ou senha inválidos.')
})

test('Não deve autenticar quando a senha não é informada', async ({ page }) => {
    await loginPage.login('404@lunarpass.dev', '')
    await expect(loginPage.alert).toHaveText('Informe a senha')
})

test('Não deve autenticar quando o email não é informada', async ({ page }) => {
    await loginPage.login('', 'pwd123')
    await expect(loginPage.alert).toHaveText('Informe um e-mail válido')
})

test('Não deve autenticar quando não informo email nem senha', async ({ page }) => {
    await loginPage.login('', '')
    await expect(loginPage.alert).toHaveText('Informe um e-mail válido')
})