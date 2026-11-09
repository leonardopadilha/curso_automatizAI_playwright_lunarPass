import { test, expect } from '../../support'

test('deve validar o titulo na aba do navegador', async ({ app }) => {
  await app.store.homePage.go()

  await expect(app.store.homePage.page).toHaveTitle(/Lunar Pass/)
})

test('deve ter exibir o slogan na homepage', async ({ app }) => {
  await app.store.homePage.go()

  await expect(app.store.homePage.slogan).toBeVisible()
})