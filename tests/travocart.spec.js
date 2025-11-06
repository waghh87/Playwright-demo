import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://staging.theflightsbookers.com/en');
  await page.getByRole('button', { name: 'Sign Up Sign Up' }).click();
  await page.getByText('Sign In').click();
  await page.getByRole('textbox', { name: 'Enter Email' }).click();
  await page.getByRole('textbox', { name: 'Enter Email' }).fill('harshad.w+30@crestinfosystems.com');
  await page.getByRole('textbox', { name: 'Enter Password*' }).click();
  await page.getByRole('textbox', { name: 'Enter Password*' }).fill('Harshad@9996');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'Leaving from' }).click();
  await page.getByRole('textbox', { name: 'Leaving from' }).fill('del');
  await page.getByRole('button', { name: 'DEL - Indira Gandhi' }).click();
  await page.getByRole('textbox', { name: 'Going to' }).click();
  await page.getByRole('textbox', { name: 'Going to' }).fill('surat');
  await page.getByRole('button', { name: 'STV - Surat Gujarat Airport,' }).click();
  await page.getByRole('textbox', { name: 'Passengers' }).click();
  await page.locator('div').filter({ hasText: /^AdultAge 18\+0$/ }).getByRole('button').nth(1).click();
  await page.locator('.MuiBackdrop-root.MuiBackdrop-invisible').click();
  await page.getByRole('button', { name: 'Search' }).click();

  await page.pause();
});