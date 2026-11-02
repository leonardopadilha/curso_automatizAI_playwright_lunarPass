import { test, expect } from '../support/index.ts'


test.beforeEach(async ({ app }) => {
    await app.loginPage.go()
})

test('Deve autenticar no controle de missões', async ({ app }) => {
    await app.loginPage.login('buzz@lunarpass.dev', 'pwd123')
    await expect(app.navbar.logout).toBeVisible({ timeout: 10_000 })
})

test('Não deve autenticar com senha incorreta', async ({ app }) => {
    await app.loginPage.login('buzz@lunarpass.dev', 'abc123')
    await expect(app.loginPage.alert).toHaveText('E-mail ou senha inválidos.')
})

test('Não deve autenticar com email não cadastrado', async ({ app }) => {
    await app.loginPage.login('404@lunarpass.dev', 'pwd123')
    await expect(app.loginPage.alert).toHaveText('E-mail ou senha inválidos.')
})

test('Não deve autenticar quando a senha não é informada', async ({ app }) => {
    await app.loginPage.login('404@lunarpass.dev', '')
    await expect(app.loginPage.alert).toHaveText('Informe a senha')
})

test('Não deve autenticar quando o email não é informada', async ({ app }) => {
    await app.loginPage.login('', 'pwd123')
    await expect(app.loginPage.alert).toHaveText('Informe um e-mail válido')
})

test('Não deve autenticar quando não informo email nem senha', async ({ app }) => {
    await app.loginPage.login('', '')
    await expect(app.loginPage.alert).toHaveText('Informe um e-mail válido')
})