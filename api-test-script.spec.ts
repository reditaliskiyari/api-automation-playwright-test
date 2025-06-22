import { test, expect } from '@playwright/test';

test.describe('API Tests for DummyJSON', () => {
  let productId: string;

  test.describe.configure({ mode: 'serial' }) // Run tests in serial mode

  // Test sample for GET
  test('GET products', async ({ request }) => {
    const response = await request.get('/products');
    expect(response.status()).toBe(200);
    const output = await response.json();
    expect(output.products.length).toBeGreaterThan(0);
    productId = output.products[0].id; // Store the first product ID for later tests
    expect(productId).toBeDefined();
  });

  // Test sample for POST
  test('POST new product', async ({ request }) => {
    // Define the product data to be sent in the request body
    const productData = {
      title: 'product test A',
      description: 'This is a test product',
      price: 25000,
    };

    const response = await request.post('/products/add', {
      headers: {
        'Content-Type': 'application/json',
      },
      // json body data
      data: productData,
    });

    expect(response.status()).toBe(201);
    const output = await response.json();
    expect(output.id).not.toBeNull();
    expect(output.title).toEqual(productData.title);
    console.log(`Created product with ID: ${output.id}`);
  });

  // Test sample for PUT
  test('PUT a product', async ({ request }) => {
    // Define the product data to be sent in the request body
    const productData = {
      title: 'product test AB',
    };

    const response = await request.put(`/products/${productId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      // json body data
      data: productData,
    });

    expect(response.status()).toBe(200);
    const output = await response.json();
    expect(output.title).toEqual(productData.title);
  });

  // Test sample for DELETE
  test('DELETE a product', async ({ request }) => {
    const response = await request.delete(`/products/${productId}`);
    expect(response.status()).toBe(200);
    const output = await response.json();
    expect(output.isDeleted).toBe(true);
  });
});  

