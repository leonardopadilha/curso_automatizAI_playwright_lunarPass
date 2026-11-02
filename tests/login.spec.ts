import { test, expect } from '../support/index.ts'


test.beforeEach(async ({ loginPage }) => {
    await loginPage.go()
})

test('Deve autenticar no controle de missões', async ({ loginPage, navbar }) => {
    await loginPage.login('buzz@lunarpass.dev', 'pwd123')
    await expect(navbar.logout).toBeVisible({ timeout: 10_000 })
})

test('Não deve autenticar com senha incorreta', async ({ loginPage }) => {
    await loginPage.login('buzz@lunarpass.dev', 'abc123')
    await expect(loginPage.alert).toHaveText('E-mail ou senha inválidos.')
})

test('Não deve autenticar com email não cadastrado', async ({ loginPage }) => {
    await loginPage.login('404@lunarpass.dev', 'pwd123')
    await expect(loginPage.alert).toHaveText('E-mail ou senha inválidos.')
})

test('Não deve autenticar quando a senha não é informada', async ({ loginPage }) => {
    await loginPage.login('404@lunarpass.dev', '')
    await expect(loginPage.alert).toHaveText('Informe a senha')
})

test('Não deve autenticar quando o email não é informada', async ({ loginPage }) => {
    await loginPage.login('', 'pwd123')
    await expect(loginPage.alert).toHaveText('Informe um e-mail válido')
})

test('Não deve autenticar quando não informo email nem senha', async ({ loginPage }) => {
    await loginPage.login('', '')
    await expect(loginPage.alert).toHaveText('Informe um e-mail válido')
})