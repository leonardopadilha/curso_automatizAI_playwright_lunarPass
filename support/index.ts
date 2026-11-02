import { test as base, expect, Page } from "@playwright/test"

import { LoginPage } from "../pages/login.page"
import { Navbar } from "../pages/components/navbar"

const createApp = (page: Page) => ({
    loginPage: new LoginPage(page),
    navbar: new Navbar(page)
})

type App = ReturnType<typeof createApp>

export const test = base.extend<{ app: App }>({
    app: async ({ page }, use) => {
        await use(createApp(page))
    }
})

export { expect }