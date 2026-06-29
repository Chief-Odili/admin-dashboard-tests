import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('admin', 'password123');
  await expect(page).toHaveURL('/dashboard');
});

// test('should show dashboard overview', async ({ page }) => {
//   await expect(page.getByText('Overview')).toBeVisible();
//   await expect(page.getByText('Total Users')).toBeVisible();
//   await expect(page.getByText('Active Sessions')).toBeVisible();
//   await expect(page.getByText('Reports Generated')).toBeVisible();
// });

test('should show dashboard overview', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible();
  await expect(page.getByText('Total Revenue')).toBeVisible();
  await expect(page.getByText('Active Sessions')).toBeVisible();
  await expect(page.getByText('Reports Generated')).toBeVisible();
});

test('should navigate to Users page', async ({ page }) => {
  await page.getByRole('link', { name: 'Users' }).click();
  await expect(page).toHaveURL('/dashboard/users');
  await expect(page.getByText('John Doe')).toBeVisible();
});

test('should navigate to Reports page', async ({ page }) => {
  await page.getByRole('link', { name: 'Reports' }).click();
  await expect(page).toHaveURL('/dashboard/reports');
  await expect(page.getByText('Monthly Revenue')).toBeVisible();
});

test('should navigate to Settings page', async ({ page }) => {
  await page.getByRole('link', { name: 'Settings' }).click();
  await expect(page).toHaveURL('/dashboard/settings');
  await expect(page.getByText('Site Name')).toBeVisible();
});

// test('should logout successfully', async ({ page }) => {
//   await page.getByRole('link', { name: 'Logout' }).click();
//   await expect(page).toHaveURL('/login');
// });

test('should logout successfully', async ({ page }) => {
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page).toHaveURL('/login');
});
