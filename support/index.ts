import { test as base, expect } from "@playwright/test"

import { LoginPage } from "../pages/login.page"
import { Navbar } from "../pages/components/navbar"

type Fixtures = {
    loginPage: LoginPage,
    navbar: Navbar
}

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    navbar: async ({ page }, use) => {
        await use(new Navbar(page))
    }
})

export { expect }