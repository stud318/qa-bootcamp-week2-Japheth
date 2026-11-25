import { Page, Locator, expect } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly firstProduct: Locator;
  readonly addToCartBtn: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    // Locators
    this.searchBox = page.getByRole("textbox", { name: "Search" });
    this.firstProduct = page.locator(".card-title").first();
    this.addToCartBtn = page.getByRole("button", { name: "Add to cart" });
    this.cartBadge = page.locator(".badge.rounded-pill.bg-danger");
  }

  // Actions
  async goto() {
    await this.page.goto("/");
  }

  async searchForProduct(productName: string) {
    await this.searchBox.fill(productName);
    await this.searchBox.press("Enter");
    // Wait for results to appear conditionally
    await expect(this.firstProduct).toBeVisible();
  }

  async addFirstProductToCart() {
    await this.firstProduct.click();

    // Wait for the cart API call to succeed before checking UI
    await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes("/carts") && response.status() === 200,
      ),
      this.addToCartBtn.click(),
    ]);
  }

  async verifyCartCount(expectedCount: string) {
    await expect(this.cartBadge).toHaveText(expectedCount);
  }
}
