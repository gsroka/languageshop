import type { Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly emptyMessage: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emptyMessage = page.getByText("Your cart is empty");
    this.cartItems = page.locator('[data-testid="cart-item"]');
    this.checkoutButton = page.getByRole("button", {
      name: /checkout|proceed/i,
    });
  }

  async goto() {
    await this.page.goto("/cart");
  }

  async countItems(): Promise<number> {
    return this.cartItems.count();
  }

  async isEmptyVisible(): Promise<boolean> {
    return this.emptyMessage.isVisible();
  }

  async removeFirstItem() {
    const removeButton = this.page.locator("button:has(svg)").first();
    if (await removeButton.count()) {
      await removeButton.click();
    }
  }
}
