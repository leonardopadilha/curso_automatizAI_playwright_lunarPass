import { Page, Locator } from '@playwright/test'

export class HomePage {
    readonly page: Page
    readonly slogan: Locator

    constructor(page: Page) {
        this.page = page
        this.slogan = page.getByRole('heading', { name: 'Sua viagem para a Lua começa aqui.' })
    }

    async go() {
        await this.page.goto('http://localhost:3000/')
    }

    async selectBase(baseName: string) {
        await this.page.getByRole('checkbox', { name: baseName }).check()
    }

    async searchMissions() {
        await this.page.getByRole('button', { name: 'Buscar missões' }).click()
    }
}
