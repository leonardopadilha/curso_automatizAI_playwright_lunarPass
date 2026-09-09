import { test, expect } from '@playwright/test'

test('Deve autenticar no controle de missões', async ({ page }) => {
    await page.goto('http://localhost:3000/mission-control/login')

    // Checkpoint
    const title = page.getByRole('heading', { name: 'Mission Control' })
    await expect(title).toBeVisible()

    //await page.locator('input[type=email]').fill('buzz@lunarpass.dev')
    //await page.locator('input[type=password]').fill('pwd123')

    await page.getByLabel('E-mail').fill('buzz@lunarpass.dev')
    await page.getByLabel('Senha').fill('pwd123')
    await page.getByRole('button', { name: 'Entrar'} ).click()

    const logoutButton = await page.getByRole('button', { name: 'Sair' })
    await expect(logoutButton).toBeVisible()
})

test('Não deve autenticar com senha incorreta', async ({ page }) => {
    await page.goto('http://localhost:3000/mission-control/login')

    // Checkpoint
    const title = page.getByRole('heading', { name: 'Mission Control' })
    await expect(title).toBeVisible()

    //await page.locator('input[type=email]').fill('buzz@lunarpass.dev')
    //await page.locator('input[type=password]').fill('pwd123')

    await page.getByLabel('E-mail').fill('buzz@lunarpass.dev')
    await page.getByLabel('Senha').fill('abc123')
    await page.getByRole('button', { name: 'Entrar'} ).click()

    const text = page.getByText('E-mail ou senha inválidos.')
    await expect(text).toBeVisible()

})

test('Não deve autenticar com email não cadastrado', async ({ page }) => {
    await page.goto('http://localhost:3000/mission-control/login')

    // Checkpoint
    const title = page.getByRole('heading', { name: 'Mission Control' })
    await expect(title).toBeVisible()

    //await page.locator('input[type=email]').fill('buzz@lunarpass.dev')
    //await page.locator('input[type=password]').fill('pwd123')

    await page.getByLabel('E-mail').fill('404@lunarpass.dev')
    await page.getByLabel('Senha').fill('pwd123')
    await page.getByRole('button', { name: 'Entrar'} ).click()

    const text = page.getByText('E-mail ou senha inválidos.')
    await expect(text).toBeVisible()

})