// playwright/e2e/Allgemein.Werkstoffe.spec.js
import { test as base, expect } from '@playwright/test';
import { attachFixture } from '../fixtures/attachFixture.js';
import werkstoffeInputs from '../fixtures/werkstoffeInputs.json' assert { type: "json" };

const test = base.extend({
  werkstoffeInputs: async ({}, use) => {
    await use(werkstoffeInputs);
  },
});

// Helper: Open a dropdown by its header text (strict, robust)
async function openDropdown(page, headerText) {
  const header = page.locator('.dropdown-header', { hasText: headerText });
  const parent = header.locator('..');
  if (!(await parent.evaluate(el => el.classList.contains('open')))) {
    await header.click();
  }
}

// Helper: Fill fields from an object
async function fillFields(page, fields) {
  for (const [id, value] of Object.entries(fields)) {
    await page.locator(`#${id}`).fill(value);
  }
}

test.describe('Allgemein | Werkstoffe.html', () => {
  const url = '/Allgemein/Werkstoffe.html';

  test.beforeEach(async ({}, testInfo) => {
    await attachFixture(
      testInfo,
      '../fixtures/werkstoffeInputs.json',
      {
        description: `This fixture contains input and expected output values for Spezifischer Widerstand, Temperaturabhängigkeit, and Stromdichte calculations.`
      }
    );
  });

  // --- Spezifischer Widerstand Section ---
  for (const [i, tc] of werkstoffeInputs.spezifischerWiderstand.entries()) {
    test(`Spezifischer Widerstand: ${tc.desc}`, async ({ page }) => {
      await page.goto(url);
      await openDropdown(page, 'Spezifischer Widerstand');
      await fillFields(page, tc.fields);
      await page.locator('input[onclick="calculateLeitfaehigkeit()"]').click();
      const text = await page.locator('#result_Leiter').innerText();
      await expect(text).toContain(tc.expected);
    });
  }

  // --- Temperaturabhängigkeit Section ---
  for (const [i, tc] of werkstoffeInputs.temperaturabhaengigkeit.entries()) {
    test(`Temperaturabhängigkeit: ${tc.desc}`, async ({ page }) => {
      await page.goto(url);
      await openDropdown(page, 'Temperaturabhängigkeit Widerstände');
      await fillFields(page, tc.fields);
      await page.locator('input[onclick="calculateTemperaturwiderstand()"]').click();
      const text = await page.locator('#result_Temp').innerText();
      await expect(text).toContain(tc.expected);
    });
  }

  // --- Stromdichte Section ---
  for (const [i, tc] of werkstoffeInputs.stromdichte.entries()) {
    test(`Stromdichte: ${tc.desc}`, async ({ page }) => {
      await page.goto(url);
      await openDropdown(page, 'Stromdichte');
      await fillFields(page, tc.fields);
      await page.locator('input[onclick="calculateStromdichte()"]').click();
      const text = await page.locator('#result_Stromd').innerText();
      await expect(text).toContain(tc.expected);
    });
  }
});