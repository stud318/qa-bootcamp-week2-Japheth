import { test, expect } from "@playwright/test";

const API_URL = "https://api.practicesoftwaretesting.com";
let cartId: string;

test.describe("Toolshop API Carts", () => {
  test.afterEach(async ({ request }) => {
    if (cartId) {
      await request.delete(`${API_URL}/carts/${cartId}`);
      cartId = "";
    }
  });

  test("Test 1: Create a cart, add a product, and check fields", async ({
    request,
  }) => {
    // 1. Get a fresh, valid product ID dynamically
    const productsRes = await request.get(`${API_URL}/products`);
    const productsData = await productsRes.json();
    const validProductId = productsData.data[0].id; // Grab the first product in the list

    // 2. Create Cart
    const createCartRes = await request.post(`${API_URL}/carts`, { data: {} });
    expect(createCartRes.status()).toBe(201);
    const cartData = await createCartRes.json();
    cartId = cartData.id;

    // 3. Add the dynamic Product to Cart
    const addRes = await request.post(`${API_URL}/carts/${cartId}`, {
      data: { product_id: validProductId, quantity: 2 },
    });

    // Check if the request was successful (should be 200)
    expect(addRes.status()).toBe(200);

    // 4. Read cart back and check fields
    const getRes = await request.get(`${API_URL}/carts/${cartId}`);
    const readData = await getRes.json();

    expect(readData.cart_items).toHaveLength(1);
    expect(readData.cart_items[0].quantity).toBe(2);
    expect(readData.cart_items[0].product_id).toBe(validProductId);
  });

  test("Test 2: Request a non-existent cart returns 404", async ({
    request,
  }) => {
    const fakeCartId = "9999999999999999999999999";
    const response = await request.get(`${API_URL}/carts/${fakeCartId}`);
    expect(response.status()).toBe(404);
  });
});
