import { expect, test } from '@playwright/test';

test('switching preserves page, query, and section in both directions', async ({
  page,
}) => {
  await page.goto('/?utm_source=review#contact');
  await page
    .locator('[data-language-switch] a[data-locale="sk"]')
    .last()
    .click();
  await expect(page).toHaveURL(/\/sk\/\?utm_source=review.*#contact$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'sk');
  await page
    .locator('[data-language-switch] a[data-locale="en"]')
    .last()
    .click();
  await expect(page).toHaveURL(/\/\?utm_source=review.*lang=en.*#contact$/);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('saved choice affects neutral entry but not explicit English or Slovak links', async ({
  page,
}) => {
  await page.goto('/sk/');
  await page.evaluate(() => localStorage.setItem('i18n-choice', 'sk'));
  await page.goto('/');
  await expect(page).toHaveURL(/\/sk\/$/);
  await page.goto('/?lang=en');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.goto('/privacy/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.goto('/sk/privacy/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'sk');
});

test('switching warns before discarding entered form data and cancellation preserves it', async ({
  page,
}) => {
  await page.goto('/?lang=en#contact');
  await page.locator('input[name="name"]').fill('Local review');
  const dialogEvent = page.waitForEvent('dialog');
  const click = page
    .locator('[data-language-switch] a[data-locale="sk"]')
    .last()
    .click();
  const dialog = await dialogEvent;
  expect(dialog.message()).toContain('form');
  await dialog.dismiss();
  await click;
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('input[name="name"]')).toHaveValue('Local review');
  expect(
    await page.evaluate(() => localStorage.getItem('i18n-choice')),
  ).not.toBe('sk');
  page.once('dialog', (next) => next.accept());
  await page
    .locator('[data-language-switch] a[data-locale="sk"]')
    .last()
    .click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'sk');
});

test('Slovak form sends the active locale and renders localized server errors', async ({
  page,
}) => {
  await page.route('**/api/audit-request', async (route) => {
    const payload = route.request().postDataJSON();
    await route.fulfill({
      status: 422,
      contentType: 'application/json',
      body: JSON.stringify({
        message:
          payload.locale === 'sk'
            ? 'Skontrolujte polia formulára.'
            : 'Check the form fields.',
      }),
    });
  });
  await page.goto('/sk/#contact');
  await page.locator('input[name="name"]').fill('Local review');
  await page.locator('input[name="email"]').fill('review@example.com');
  await page.locator('select[name="projectType"]').selectOption({ index: 1 });
  await page
    .locator('textarea[name="message"]')
    .fill('Testovacia požiadavka bez odoslania údajov.');
  const request = page.waitForRequest('**/api/audit-request');
  await page.locator('button[type="submit"]').click();
  expect((await request).postDataJSON().locale).toBe('sk');
  await expect(page.getByText('Skontrolujte polia formulára.')).toBeVisible();
});

test('language switching works when browser storage is blocked', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('Storage blocked');
      },
    });
  });
  await page.goto('/privacy/?source=review#section-0');
  await page
    .locator('[data-language-switch] a[data-locale="sk"]')
    .first()
    .click();
  await expect(page).toHaveURL(/\/sk\/privacy\/\?source=review.*#section-0$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'sk');
});

test('mobile menu exposes an accessible language switch without horizontal overflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/?lang=en');
  await page.locator('#menu-toggle').click();
  await page
    .locator('#mobile-menu [data-language-switch] a[data-locale="sk"]')
    .click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'sk');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test('Back and Forward retain the language visible before and after switching', async ({
  page,
}) => {
  await page.goto('/?source=history#services');
  await page
    .locator('[data-language-switch] a[data-locale="sk"]')
    .first()
    .click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'sk');
  await page.goBack();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveURL(/source=history.*lang=en.*#services$/);
  await page.goForward();
  await expect(page.locator('html')).toHaveAttribute('lang', 'sk');
  await expect(page).toHaveURL(/\/sk\/\?source=history.*#services$/);
});

test('language links work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();
  await page.goto('/privacy/');
  await page
    .locator('[data-language-switch] a[data-locale="sk"]')
    .first()
    .click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'sk');
  await expect(page).toHaveURL(/\/sk\/privacy\/\?lang=sk$/);
  await context.close();
});

test('early API errors use the requested Slovak locale without sending a submission', async ({
  request,
}) => {
  const headers = {
    'Accept-Language': 'sk',
    'x-forwarded-for': `2001:db8::${Math.floor(Math.random() * 65535).toString(16)}`,
    'Content-Type': 'application/json',
  };
  const malformed = await request.post('/api/audit-request', {
    headers,
    data: Buffer.from('{'),
  });
  expect(malformed.status()).toBe(400);
  expect((await malformed.json()).message).toBe('Neplatný obsah požiadavky.');
  for (let i = 0; i < 9; i++) {
    await request.post('/api/audit-request', {
      headers,
      data: Buffer.from('{'),
    });
  }
  const limited = await request.post('/api/audit-request', {
    headers,
    data: Buffer.from('{'),
  });
  expect(limited.status()).toBe(429);
  expect((await limited.json()).message).toContain('Príliš veľa');
});
