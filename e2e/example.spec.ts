import { expect, test } from '@playwright/test';

test.describe('Cattle Market Application', () => {
  // Run before each test to ensure a clean state
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Starting test: ${testInfo.title}`);
    try {
      await page.goto('http://localhost:4200/', { timeout: 60000 });
      await expect(page.getByLabel('Username')).toBeVisible({ timeout: 10000 });
      console.log('Login page loaded successfully');
    } catch (error) {
      console.error('Failed to load login page:', error);
      throw error;
    }
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Cattle Market/);
  });

  test('can login with valid credentials', async ({ page }) => {
    // Ensure no Vite error overlay
    await expect(page.locator('vite-error-overlay')).not.toBeVisible({ timeout: 5000 });

    // Fill login form
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('1234');

    // Verify and click login button
    const loginButton = page.getByRole('button', { name: /login/i });
    await expect(loginButton).toBeVisible({ timeout: 10000 });
    await expect(loginButton).toBeEnabled({ timeout: 10000 });
    await loginButton.click({ timeout: 10000 });

    // Verify navigation and UI
    await expect(page).toHaveURL(/cattle/, { timeout: 10000 });
    await expect(page.getByText('Cattle Market Inventory')).toBeVisible({ timeout: 10000 });
  });

  test('shows error for invalid login credentials', async ({ page }) => {
    await expect(page.locator('vite-error-overlay')).not.toBeVisible({ timeout: 5000 });
    await page.getByLabel('Username').fill('wronguser');
    await page.getByLabel('Password').fill('wrongpass');
    const loginButton = page.getByRole('button', { name: /login/i });
    await expect(loginButton).toBeVisible({ timeout: 10000 });
    await loginButton.click({ timeout: 10000 });
    await expect(page.getByText('Invalid credentials')).toBeVisible({ timeout: 10000 });
    await expect(page).toHaveURL(/login/);
  });

  test('displays cattle list after login', async ({ page }) => {
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('1234');
    const loginButton = page.getByRole('button', { name: /login/i });
    await loginButton.click({ timeout: 10000 });

    await expect(page.getByRole('table')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('mat-row')).toHaveCount(4);

    await expect(page.getByText('Holstein')).toBeVisible();
    await expect(page.getByText('650')).toBeVisible();
    await expect(page.getByText('PKR 4,000')).toBeVisible();
    await expect(page.locator('mat-chip').filter({ hasText: 'Sold' }).first()).toBeVisible();

    await expect(page.getByText('Angus')).toBeVisible();
    await expect(page.getByText('720')).toBeVisible();
    await expect(page.getByText('PKR 95,000')).toBeVisible();
    await expect(page.locator('mat-chip').filter({ hasText: 'Sold' }).nth(1)).toBeVisible();

    await expect(page.getByText('Brahman')).toBeVisible();
    await expect(page.getByText('680')).toBeVisible();
    await expect(page.getByText('PKR 78,000')).toBeVisible();
    await expect(page.locator('mat-chip').filter({ hasText: 'Available' }).first()).toBeVisible();

    await expect(page.getByText('Hereford')).toBeVisible();
    await expect(page.getByText('700')).toBeVisible();
    await expect(page.getByText('PKR 88,000')).toBeVisible();
    await expect(page.locator('mat-chip').filter({ hasText: 'Available' }).nth(1)).toBeVisible();
  });

  test('handles empty cattle list', async ({ page }) => {
    await page.route('http://localhost:3000/cattle', route => route.fulfill({ json: [] }));
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('1234');
    await page.getByRole('button', { name: /login/i }).click({ timeout: 10000 });

    await expect(page.getByText('No cattle available in the market.')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: /Add New Cattle/i })).toBeVisible();
  });

  test('handles error state when fetching cattle fails', async ({ page }) => {
    await page.route('http://localhost:3000/cattle', route => route.abort());
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('1234');
    await page.getByRole('button', { name: /login/i }).click({ timeout: 10000 });

    await expect(page.getByText('Failed to load cattle')).toBeVisible({ timeout: 10000 });
    const tryAgainButton = page.getByRole('button', { name: /Try Again/i });
    await expect(tryAgainButton).toBeVisible();
    await tryAgainButton.click();
    await expect(page.getByText('Failed to load cattle')).toBeVisible();
  });

  test('can mark cattle as sold and back to available', async ({ page }) => {
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('1234');
    await page.getByRole('button', { name: /login/i }).click({ timeout: 10000 });

    await expect(page.getByRole('table')).toBeVisible({ timeout: 10000 });
    const brahmanRow = page.locator('mat-row').filter({ hasText: 'Brahman' });
    const markSoldButton = brahmanRow.getByLabel('Mark as sold');
    await expect(markSoldButton).toBeVisible({ timeout: 10000 });
    await markSoldButton.click();

    await expect(page.getByText('Cattle marked as sold')).toBeVisible();
    await expect(brahmanRow.locator('mat-chip').filter({ hasText: 'Sold' })).toBeVisible();

    const markAvailableButton = brahmanRow.getByLabel('Mark as available');
    await expect(markAvailableButton).toBeVisible();
    await markAvailableButton.click();
    await expect(page.getByText('Cattle marked as available')).toBeVisible();
    await expect(brahmanRow.locator('mat-chip').filter({ hasText: 'Available' })).toBeVisible();
  });

  test('can navigate to add new cattle page', async ({ page }) => {
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('1234');
    await page.getByRole('button', { name: /login/i }).click({ timeout: 10000 });

    await expect(page.getByRole('table')).toBeVisible({ timeout: 10000 });
    const addButton = page.getByRole('button', { name: /Add New Cattle/i });
    await expect(addButton).toBeVisible();
    await addButton.click();

    await expect(page).toHaveURL(/cattle\/add/);
    await expect(page.getByText('Add New Cattle')).toBeVisible();
  });

  test('can navigate to edit cattle page', async ({ page }) => {
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('1234');
    await page.getByRole('button', { name: /login/i }).click({ timeout: 10000 });

    await expect(page.getByRole('table')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('mat-row')).toHaveCount(4);

    const herefordRow = page.locator('mat-row').filter({ hasText: 'Hereford' });
    await expect(herefordRow).toBeVisible({ timeout: 10000 });
    const editButton = herefordRow.getByLabel('Edit Cattle');
    await expect(editButton).toBeVisible({ timeout: 10000 });
    await editButton.click();

    await expect(page).toHaveURL(/cattle\/edit\/4/);
    await expect(page.getByText('Edit Cattle')).toBeVisible();
  });

  test('can delete cattle', async ({ page }) => {
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('1234');
    await page.getByRole('button', { name: /login/i }).click({ timeout: 10000 });

    await expect(page.getByRole('table')).toBeVisible({ timeout: 10000 });
    const initialRows = await page.locator('mat-row').count();
    await expect(initialRows).toBe(4);

    const herefordRow = page.locator('mat-row').filter({ hasText: 'Hereford' });
    const deleteButton = herefordRow.getByLabel('Delete Cattle');
    await expect(deleteButton).toBeVisible({ timeout: 10000 });
    await deleteButton.click();

    await expect(page.getByText('Cattle deleted successfully')).toBeVisible();
    const updatedRows = await page.locator('mat-row').count();
    await expect(updatedRows).toBe(3);
    await expect(page.getByText('Hereford')).not.toBeVisible();
  });

  test('can logout', async ({ page }) => {
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('1234');
    await page.getByRole('button', { name: /login/i }).click({ timeout: 10000 });

    const logoutButton = page.getByRole('button', { name: /logout/i });
    await expect(logoutButton).toBeVisible();
    await logoutButton.click();

    await expect(page).toHaveURL(/login/);
    await expect(page.getByText('Cattle Market Login')).toBeVisible();
    await expect(logoutButton).not.toBeVisible();
  });
});
