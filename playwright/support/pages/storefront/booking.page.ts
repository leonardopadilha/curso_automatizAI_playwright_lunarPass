import { Page, Locator } from '@playwright/test'

export interface PassengerInput {
    seat: string
    fullName: string
    passport: string
}

export interface PaymentInput {
    email: string
    cardName: string
    cardNumber: string
    expiry: string
    cvv: string
}

export class BookingPage {
    readonly page: Page
    readonly continueButton: Locator
    readonly noSeatsMessage: Locator
    readonly totalPrice: Locator
    readonly passengersTitle: Locator
    readonly fullNameInput: Locator
    readonly passportInput: Locator
    readonly paymentTitle: Locator
    readonly emailInput: Locator
    readonly cardNameInput: Locator
    readonly cardNumberInput: Locator
    readonly expiryInput: Locator
    readonly cvvInput: Locator
    readonly reservationCode: Locator
    readonly reservationTickets: Locator
    readonly paymentApprovedMessage: Locator
    readonly alert: Locator

    constructor(page: Page) {
        this.page = page
        this.continueButton = page.getByRole('button', { name: 'Continuar' })
        this.noSeatsMessage = page.getByRole('paragraph').filter({ hasText: 'Nenhum assento escolhido' })
        this.totalPrice = page.getByTestId('summary-total-price')
        this.passengersTitle = page.getByRole('heading', { name: 'Cadastre os passageiros' })
        this.fullNameInput = page.getByRole('textbox', { name: 'Nome completo' })
        this.passportInput = page.getByRole('textbox', { name: 'Passaporte' })
        this.paymentTitle = page.getByRole('heading', { name: 'Pagamento' })
        this.emailInput = page.getByRole('textbox', { name: 'E-mail de contato' })
        this.cardNameInput = page.getByRole('textbox', { name: 'Nome no cartão' })
        this.cardNumberInput = page.getByRole('textbox', { name: 'Número do cartão' })
        this.expiryInput = page.getByRole('textbox', { name: 'Validade' })
        this.cvvInput = page.getByRole('textbox', { name: 'CVV' })
        this.reservationCode = page.getByTestId('reservation-code')
        this.reservationTickets = page.getByTestId('reservation-ticket')
        this.paymentApprovedMessage = page
            .getByTestId('reservation-confirmation')
            .getByRole('paragraph')
            .filter({ hasText: 'Pagamento aprovado' })
        this.alert = page.getByRole('alert')
    }

    async go(missionId: string) {
        await this.page.goto(`http://localhost:3000/booking/${missionId}`)
    }

    seatButton(seat: string): Locator {
        return this.page.getByRole('button', { name: new RegExp(`Assento ${seat}`) })
    }

    async selectSeat(seat: string) {
        await this.seatButton(seat).dispatchEvent('click')
    }

    async selectSeats(seats: string[]) {
        for (const seat of seats) {
            await this.seatButton(seat).click()
        }
    }

    async continue() {
        await this.continueButton.click()
    }

    async submitPassenger(fullName: string, passport: string) {
        await this.fullNameInput.fill(fullName)
        await this.passportInput.fill(passport)
        await this.page.getByRole('button', { name: 'Ir para pagamento' }).click()
    }

    async submitPassengers(passengers: PassengerInput[]) {
        for (const passenger of passengers) {
            const card = this.page
                .getByTestId('passenger-card')
                .filter({ hasText: `Assento ${passenger.seat}` })
            await card.getByRole('textbox', { name: 'Nome completo' }).fill(passenger.fullName)
            await card.getByRole('textbox', { name: 'Passaporte' }).fill(passenger.passport)
        }
        await this.page.getByRole('button', { name: 'Ir para pagamento' }).click()
    }

    async submitPayment(payment: PaymentInput) {
        await this.emailInput.fill(payment.email)
        await this.cardNameInput.fill(payment.cardName)
        await this.cardNumberInput.fill(payment.cardNumber)
        await this.expiryInput.fill(payment.expiry)
        await this.cvvInput.fill(payment.cvv)
        await this.page.getByRole('button', { name: 'Pagar e reservar' }).click()
    }
}
