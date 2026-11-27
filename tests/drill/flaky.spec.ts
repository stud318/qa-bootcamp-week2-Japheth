import { test, expect } from "@playwright/test";
import { pathToFileURL } from "url";
import path from "path";

test("Flaky save test", async ({ page }) => {
  const filePath = path.join(__dirname, "index.html");
  await page.goto(pathToFileURL(filePath).href);

  await page.getByRole("button", { name: "Save" }).click();

  // FIXED: Dynamic wait using toHaveText (Playwright retries automatically)
  await expect(page.locator("#message")).toHaveText("Data saved successfully!");
});
