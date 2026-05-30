import { test, expect } from '@playwright/test';

test('check landing page', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.waitForSelector('h1');
  await page.screenshot({ path: 'verification_final.png', fullPage: true });
});
