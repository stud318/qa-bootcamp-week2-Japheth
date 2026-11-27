import { Page, Locator } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly firstProduct: Locator;
  readonly addToCartBtn: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.getByRole("textbox", { name: "Search" });
    this.firstProduct = page.locator(".card-title").first();
    // Use the data-test attribute you just found!
    this.addToCartBtn = page.locator('[data-test="add-to-cart"]');
    // Use role-based locator for the cart link/badge
    this.cartBadge = page
      .getByRole("link", { name: /cart/i })
      .locator(".badge");
  }

  async goto() {
    await this.page.goto("/");
  }

  async searchForProduct(productName: string) {
    await this.searchBox.fill(productName);
    await this.searchBox.press("Enter");
    await this.firstProduct.waitFor();
  }

  async addFirstProductToCart() {
    await this.firstProduct.click();
    await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes("/carts") && response.status() === 200,
      ),
      this.addToCartBtn.click(),
    ]);
  }
}
