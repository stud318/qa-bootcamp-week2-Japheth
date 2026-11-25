import { test, expect } from "@playwright/test";

test("GET products endpoint returns 200 and valid data", async ({
  request,
}) => {
  // Using the full API address
  const response = await request.get(
    "https://api.practicesoftwaretesting.com/products",
  );

  // Check the status code
  expect(response.status()).toBe(200);

  // Parse the JSON body
  const body = await response.json();

  // Check that the 'data' array exists and has products in it
  expect(body).toHaveProperty("data");
  expect(body.data.length).toBeGreaterThan(0);

  // Check one specific field on the first product (e.g., that it has a name)
  expect(body.data[0]).toHaveProperty("name");
});
