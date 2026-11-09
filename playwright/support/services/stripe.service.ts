import { Page } from '@playwright/test'
import { CardBrand, StripePaymentResponse } from '../types'

export class StripeService {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async mockPayment(response: StripePaymentResponse) {
    await this.page.route('**/functions/v1/stripe-payment', async (route) => {
      if (route.request().method() !== 'POST') {
        return route.fallback()
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(response),
      })
    })
  }

  async approvePayment(brand: CardBrand, paymentId = 'pi_3UX6sz14NoBxd29D08GIaxi1') {
    await this.mockPayment({
      status: 'approved',
      message: 'Pagamento aprovado.',
      brand,
      paymentId,
    })
  }

  async declinePayment(brand: CardBrand = 'Visa') {
    await this.mockPayment({
      status: 'declined',
      message: 'Pagamento negado pela operadora do cartão.',
      brand,
    })
  }

  async rejectCardData(brand: CardBrand = 'Visa') {
    await this.mockPayment({
      status: 'incorrect_card_data',
      message: 'Dados do cartão incorretos.',
      brand,
    })
  }
}
