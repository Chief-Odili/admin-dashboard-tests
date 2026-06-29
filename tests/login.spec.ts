import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
});

test('should show login page', async ({ page }) => {
  await expect(page).toHaveURL('/login');
  await expect(
    page.getByRole('heading', { name: 'Admin Login' })
  ).toBeVisible();
});

test('should login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('admin', 'password123');
  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByText('Admin Dashboard')).toBeVisible();
});

test('should show error with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('wronguser', 'wrongpassword');
  await expect(page.getByText('Invalid username or password')).toBeVisible();
});
