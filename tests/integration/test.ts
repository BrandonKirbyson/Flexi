import { expect, test } from '@playwright/test';

test('', async ({ page }) => {
	await page.goto('/login');
	await expect(page.locator('button')).toContainText("Google")
});
