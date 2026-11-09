import { test, expect } from '../../support'


test.beforeEach(async ({ app }) => {
    // Arrange - preparação do cenário
    await app.mission.loginPage.go()
})

test('deve autenticar no controle de missões', async ({ app }) => {
    // Act - Execução da ação
    await app.mission.loginPage.login('buzz@lunarpass.dev', 'pwd123')

    // Assert - verificar o resultado
    await expect(app.mission.navbar.logout).toBeVisible({ timeout: 10_000 })
})

test('não deve autenticar com senha incorreta', async ({ app }) => {
    // Act - Execução da ação
    await app.mission.loginPage.login('buzz@lunarpass.dev', 'abc123')

    // Assert - verificar o resultado
    await expect(app.mission.loginPage.alert).toHaveText('E-mail ou senha inválidos.')
})

test('não deve autenticar com email não cadastrado', async ({ app }) => {
    // Act - Execução da ação
    await app.mission.loginPage.login('404@lunarpass.dev', 'pwd123')

    // Assert - verificar o resultado
    await expect(app.mission.loginPage.alert).toHaveText('E-mail ou senha inválidos.')
})

test('não deve autenticar quando a senha não é informada', async ({ app }) => {
    // Act - Execução da ação
    await app.mission.loginPage.login('404@lunarpass.dev', '')

    // Assert - verificar o resultado
    await expect(app.mission.loginPage.alert).toHaveText('Informe a senha')
})

test('não deve autenticar quando o email não é informado', async ({ app }) => {
    // Act - Execução da ação
    await app.mission.loginPage.login('', 'pwd123')

    // Assert - verificar o resultado
    await expect(app.mission.loginPage.alert).toHaveText('Informe um e-mail válido')
})

test('não deve autenticar quando não informo email e nem senha', async ({ app }) => {
    // Act - Execução da ação
    await app.mission.loginPage.login('', '')

    // Assert - verificar o resultado
    await expect(app.mission.loginPage.alert).toHaveText('Informe um e-mail válido')
})