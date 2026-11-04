import { test, expect } from '../support/index.ts'

test.beforeEach(async ({ app }) => {
    await app.homePage.go()
})

test('Deve verificar o título na aba do navegador', async ({ app }) => {
    await expect(app.homePage.page).toHaveTitle(/Lunar Pass/)
})

test('Deve exibir o slogan na homepage', async ({ app }) => {
    await expect(app.homePage.slogan).toBeVisible()
})
