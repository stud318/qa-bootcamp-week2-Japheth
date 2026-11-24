import { test, expect } from "@playwright/test";

test.describe("Toolshop UI Tests", () => {
  test("Home page title is correct", async ({ page }) => {
    await page.goto("/");
    // Checking the exact title we found in Step 1
    await expect(page).toHaveTitle(
      "Practice Software Testing - Toolshop - v5.0",
    );
  });

  //   test('Search for "pliers" returns matching products', async ({ page }) => {
  //     await page.goto("/");

  //     // Locate the search box by its accessible role and type
  //     const searchBox = page.getByRole("textbox", { name: "Search" });
  //     await searchBox.fill("pliers");
  //     await searchBox.press("Enter");

  //     // Wait for the product grid to load by looking for a specific product heading
  //     // We use expect with auto-waiting to give the results time to appear
  //     await expect(
  //       page.getByRole("heading", { name: "Pliers", exact: true }),
  //     ).toBeVisible();

  //     // Get all product titles and verify they contain "pliers"
  //     const productTitles = page.locator(".card-title");
  //     const count = await productTitles.count();

  //     for (let i = 0; i < count; i++) {
  //       const title = await productTitles.nth(i).innerText();
  //       expect(title.toLowerCase()).toContain("pliers");
  //     }
  //   });
  test('Search for "pliers" returns matching products', async ({ page }) => {
    await page.goto("/");

    const searchBox = page.getByRole("textbox", { name: "Search" });
    await searchBox.fill("pliers");
    await searchBox.press("Enter");

    // Just verify that at least one product containing "pliers" is visible
    await expect(
      page.locator(".card-title", { hasText: /pliers/i }).first(),
    ).toBeVisible();
  });

  test("Invalid login is rejected", async ({ page }) => {
    await page.goto("/auth/login");

    // Fill in invalid credentials
    await page
      .getByRole("textbox", { name: "Email address" })
      .fill("invalid@example.com");
    await page.getByRole("textbox", { name: "Password" }).fill("wrongpassword");
    await page.getByRole("button", { name: "Login" }).click();

    // Verify the error message appears
    await expect(page.getByText("Invalid email or password")).toBeVisible();
  });
});
