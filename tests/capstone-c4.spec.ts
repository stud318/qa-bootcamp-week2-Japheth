import { test, expect } from "@playwright/test";

const API_URL = "https://api.practicesoftwaretesting.com";
let cartId: string;

test.describe("Capstone C4 - Add to cart", () => {
  test.afterEach(async ({ request }) => {
    if (cartId) {
      await request.delete(`${API_URL}/carts/${cartId}`);
      cartId = "";
    }
  });

  test("C4 Add to a cart", async ({ request }) => {
    const productsRes = await request.get(`${API_URL}/products`);
    const productsData = await productsRes.json();
    const validProductId = productsData.data[0].id;

    const createCartRes = await request.post(`${API_URL}/carts`, { data: {} });
    expect(createCartRes.status()).toBe(201);
    const cartData = await createCartRes.json();
    cartId = cartData.id;

    const addRes = await request.post(`${API_URL}/carts/${cartId}`, {
      data: { product_id: validProductId, quantity: 1 },
    });
    expect(addRes.status()).toBe(200);

    const getRes = await request.get(`${API_URL}/carts/${cartId}`);
    expect(getRes.status()).toBe(200);
    const readData = await getRes.json();

    expect(readData.cart_items).toHaveLength(1);
    expect(readData.cart_items[0].product_id).toBe(validProductId);
  });
});
