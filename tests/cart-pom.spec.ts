import { test } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";

test("Add item to cart via Page Object", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  // 1. Go to the page
  await inventoryPage.goto();

  // 2. Search for a product
  await inventoryPage.searchForProduct("pliers");

  // 3. Add it to the cart
  await inventoryPage.addFirstProductToCart();

  // 4. Verify the cart badge updated
  await inventoryPage.verifyCartCount("1");
});
