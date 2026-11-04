import { test as base, expect, Page } from "@playwright/test"

import { LoginPage } from "../pages/login.page"
import { HomePage } from "../pages/home.page"
import { DashPage } from "../pages/dash.page"
import { RegisterPage } from "../pages/register.page"
import { Navbar } from "../pages/components/navbar"
import { Toast } from "../pages/components/toast"

const createApp = (page: Page) => ({
    homePage: new HomePage(page),
    loginPage: new LoginPage(page),
    dashPage: new DashPage(page),
    registerPage: new RegisterPage(page),
    navbar: new Navbar(page),
    toast: new Toast(page)
})

type App = ReturnType<typeof createApp>

export const test = base.extend<{ app: App }>({
    app: async ({ page }, use) => {
        await use(createApp(page))
    }
})

export { expect }