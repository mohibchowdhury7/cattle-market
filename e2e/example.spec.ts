import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Cattle Market/);
});

test('can login with valid credentials', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Username').fill('admin');
  await page.getByLabel('Password').fill('1234');
  await page.getByRole('button', { name: /login/i }).click();
});

