import { Page, Locator } from '@playwright/test'

export class MissionsPage {
    readonly page: Page
    readonly resultsSummary: Locator
    readonly emptyState: Locator
    readonly clearFilterLink: Locator

    constructor(page: Page) {
        this.page = page
        this.resultsSummary = page
            .getByRole('heading', { level: 1 })
            .or(page.getByRole('paragraph').filter({ hasText: 'Base ' }))
        this.emptyState = page.getByRole('status')
        this.clearFilterLink = this.emptyState.getByRole('link', { name: 'Ver todas as janelas' })
    }

    cardsByMissions(missionIds: string[]): Locator {
        return this.page.getByRole('listitem').filter({
            hasText: new RegExp(missionIds.join('|'))
        })
    }

    basesByMissions(missionIds: string[]): Locator {
        return this.cardsByMissions(missionIds).getByRole('heading', { level: 3 })
    }

    departureDatesByMissions(missionIds: string[]): Locator {
        return this.cardsByMissions(missionIds).getByTestId('departure-date')
    }

    soldOutBadgeByMission(missionId: string): Locator {
        return this.cardsByMissions([missionId]).getByTestId('mission-sold-out')
    }

    bookLinkByMission(missionId: string): Locator {
        return this.cardsByMissions([missionId]).getByRole('link', { name: 'Reservar' })
    }
}
