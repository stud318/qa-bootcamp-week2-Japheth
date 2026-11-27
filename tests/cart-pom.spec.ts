import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";

test("Add item to cart via Page Object", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.goto();
  await inventoryPage.searchForProduct("pliers");
  await inventoryPage.addFirstProductToCart();

  // The assertion is now visible right here in the test file
  await expect(inventoryPage.cartBadge).toHaveText("1");
});
