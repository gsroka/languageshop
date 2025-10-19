import type { Locator, Page } from "@playwright/test";
import { testCustomer } from "~/mocks/data/customers";

export class CheckoutPage {
  readonly page: Page;
  readonly header: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByText("Checkout");
    this.nameInput = page.locator('input[name="name"]');
    this.emailInput = page.locator('input[name="email"]');
    this.submitButton = page.getByRole("button", { name: /Place Order/i });
  }

  async goto() {
    await this.page.goto("/checkout");
  }

  async fillForm(): Promise<void> {
    await this.nameInput.fill(testCustomer.name);
    await this.emailInput.fill(testCustomer.email);
    await this.page.fill('textarea[name="address"]', testCustomer.address);
    await this.page.fill('input[name="city"]', testCustomer.city);
    await this.page.fill('input[name="postalCode"]', testCustomer.postalCode);
    await this.page.fill('input[name="country"]', testCustomer.country);
  }

  async submitOrder() {
    await this.submitButton.click();
  }
}
