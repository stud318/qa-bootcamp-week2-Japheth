import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";

test.describe("Capstone C1 - Search by name", () => {
  test("C1 Search by name", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();

    const searchBox = page.getByRole("textbox", { name: "Search" });
    await searchBox.fill("pliers");
    await searchBox.press("Enter");

    const firstProduct = page.locator(".card-title").first();

    // This dynamically waits for the text to appear and uses a regex to ignore case
    await expect(firstProduct).toHaveText(/pliers/i);
  });
});
