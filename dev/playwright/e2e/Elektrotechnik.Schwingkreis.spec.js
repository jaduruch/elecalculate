// playwright/e2e/Elektrotechnik.Schwingkreis.spec.js
import { test as base, expect } from '@playwright/test';
import { attachFixture } from '../fixtures/attachFixture.js';
import schwingkreisInputs from '../fixtures/schwingkreisInputs.json' assert { type: "json" };

const test = base.extend({
  schwingkreisInputs: async ({}, use) => {
    await use(schwingkreisInputs);
  },
});

// Helper: Click the correct filter button by its label (strict, robust)
async function clickFilterButton(page, label) {
  await page.locator('button.filter-button').filter({
    has: page.locator('span', { hasText: label })
  }).first().click();
}

test.describe('Elektrotechnik | Schwingkreis.html', () => {
  const url = '/Elektrotechnik/Schwingkreis.html';

  test.beforeEach(async ({}, testInfo) => {
    await attachFixture(
      testInfo,
      '../fixtures/schwingkreisInputs.json',
      {
        description: `This fixture contains input and expected output values for series and parallel Schwingkreis calculations.`
      }
    );
  });

  test('should calculate Blindwiderstand XL for Serienschwingkreis', async ({ page, schwingkreisInputs }) => {
    await page.goto(url);
    await clickFilterButton(page, 'Serie Schwingkreis');
    await page.locator('#f-serie').fill(schwingkreisInputs.serie.XL.f);
    await page.locator('#L-serie').fill(schwingkreisInputs.serie.XL.L);
    await page.locator('input[onclick="calculateSerie()"]').click();
    const text = await page.locator('#result').innerText();
    await expect(text).toContain(schwingkreisInputs.serie.XL.expected);
  });

  test('should calculate Blindwiderstand XC for Serienschwingkreis', async ({ page, schwingkreisInputs }) => {
    await page.goto(url);
    await clickFilterButton(page, 'Serie Schwingkreis');
    await page.locator('#f-serie').fill(schwingkreisInputs.serie.XC.f);
    await page.locator('#C-serie').fill(schwingkreisInputs.serie.XC.C);
    await page.locator('input[onclick="calculateSerie()"]').click();
    const text = await page.locator('#result').innerText();
    await expect(text).toContain(schwingkreisInputs.serie.XC.expected);
  });

  test('should calculate Resonanzfrequenz for Serienschwingkreis', async ({ page, schwingkreisInputs }) => {
    await page.goto(url);
    await clickFilterButton(page, 'Serie Schwingkreis');
    await page.locator('#L-serie').fill(schwingkreisInputs.serie.resonanz.L);
    await page.locator('#C-serie').fill(schwingkreisInputs.serie.resonanz.C);
    await page.locator('input[onclick="calculateSerie()"]').click();
    const text = await page.locator('#result').innerText();
    const found = schwingkreisInputs.serie.resonanz.expected.some(val => text.includes(val));
    expect(found).toBe(true);
  });

  test('should calculate Blindwiderstand XL for Parallelschwingkreis', async ({ page, schwingkreisInputs }) => {
    await page.goto(url);
    await clickFilterButton(page, 'Parallel Schwingkreis');
    await page.locator('#f-parallel').fill(schwingkreisInputs.parallel.XL.f);
    await page.locator('#L-parallel').fill(schwingkreisInputs.parallel.XL.L);
    await page.locator('input[onclick="calculateParallel()"]').click();
    const text = await page.locator('#result_parallel').innerText();
    await expect(text).toContain(schwingkreisInputs.parallel.XL.expected);
  });

  test('should calculate Blindwiderstand XC for Parallelschwingkreis', async ({ page, schwingkreisInputs }) => {
    await page.goto(url);
    await clickFilterButton(page, 'Parallel Schwingkreis');
    await page.locator('#f-parallel').fill(schwingkreisInputs.parallel.XC.f);
    await page.locator('#C-parallel').fill(schwingkreisInputs.parallel.XC.C);
    await page.locator('input[onclick="calculateParallel()"]').click();
    const text = await page.locator('#result_parallel').innerText();
    await expect(text).toContain(schwingkreisInputs.parallel.XC.expected);
  });

  test('should calculate Resonanzfrequenz for Parallelschwingkreis', async ({ page, schwingkreisInputs }) => {
    await page.goto(url);
    await clickFilterButton(page, 'Parallel Schwingkreis');
    await page.locator('#L-parallel').fill(schwingkreisInputs.parallel.resonanz.L);
    await page.locator('#C-parallel').fill(schwingkreisInputs.parallel.resonanz.C);
    await page.locator('input[onclick="calculateParallel()"]').click();
    const text = await page.locator('#result_parallel').innerText();
    const found = schwingkreisInputs.parallel.resonanz.expected.some(val => text.includes(val));
    expect(found).toBe(true);
  });
});