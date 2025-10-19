import { test as base, expect, type Page } from "@playwright/test";
import { mockProducts, mockCartItems } from "~/mocks/data/products";

export const test = base.extend<{ pageWithMock: Page }>({
  pageWithMock: async ({ page, browserName }, use) => {
    // Only mock API for non-webkit browsers, webkit has issues with route mocking in headless mode
    if (browserName !== "webkit") {
      await page.route("**/api/products", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(mockProducts),
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
      });
    }

    // Inject localStorage with cart data before page loads
    await page.addInitScript(
      (value) => {
        localStorage.setItem("cart-storage", JSON.stringify(value));
      },
      { state: { items: mockCartItems }, version: 0 },
    );

    await use(page);
  },
});

export { expect };
