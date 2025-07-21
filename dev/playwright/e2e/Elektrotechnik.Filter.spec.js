// playwright/e2e/Elektrotechnik.Filter.spec.js
import { test as base, expect } from '@playwright/test';
import { attachFixture } from '../fixtures/attachFixture.js';
import filterInputs from '../fixtures/filterInputs.json' assert { type: "json" };

const test = base.extend({
  filterInputs: async ({}, use) => {
    await use(filterInputs);
  },
});

// Helper: Click the filter button by its label
async function clickFilterButton(page, label) {
  await page
    .locator('button.filter-button span', { hasText: label })
    .first()
    .click();
}

test.describe('Elektrotechnik | Filter.html', () => {
  const url = '/Elektrotechnik/Filter.html';

  test.beforeEach(async ({}, testInfo) => {
    await attachFixture(
      testInfo,
      '../fixtures/filterInputs.json',
      {
        description: `This fixture contains input and expected output values for various filter calculations (Hochpass RC/RL, Tiefpass RC/RL) on the Elektrotechnik/Filter.html page.`
      }
    );
  });

  test('should calculate Blindwiderstand XC for Hochpass RC', async ({ page, filterInputs }) => {
    await page.goto(url);
    await clickFilterButton(page, 'Hochpass RC');
    await page.locator('#f-HP_RC').fill(filterInputs.hochpassRC.f);
    await page.locator('#C-HP_RC').fill(filterInputs.hochpassRC.C);
    await page.locator('input[onclick="calculate_HP_RC()"]').click();
    await expect(page.locator('#result_HP_RC')).toContainText(filterInputs.expected.hochpassRC_XC);
  });

  test('should calculate Blindwiderstand XL for Hochpass RL', async ({ page, filterInputs }) => {
    await page.goto(url);
    await clickFilterButton(page, 'Hochpass RL');
    await page.locator('#f-HP_RL').fill(filterInputs.hochpassRL.f);
    await page.locator('#L-HP_RL').fill(filterInputs.hochpassRL.L);
    await page.locator('input[onclick="calculate_HP_RL()"]').click();
    await expect(page.locator('#result_HP_RL')).toContainText(filterInputs.expected.hochpassRL_XL);
  });

  test('should calculate Blindwiderstand XC for Tiefpass RC', async ({ page, filterInputs }) => {
    await page.goto(url);
    await clickFilterButton(page, 'Tiefpass RC');
    await page.locator('#f-TP_RC').fill(filterInputs.tiefpassRC.f);
    await page.locator('#C-TP_RC').fill(filterInputs.tiefpassRC.C);
    await page.locator('input[onclick="calculate_TP_RC()"]').click();
    await expect(page.locator('#result_TP_RC')).toContainText(filterInputs.expected.tiefpassRC_XC);
  });

  test('should calculate Blindwiderstand XL for Tiefpass RL', async ({ page, filterInputs }) => {
    await page.goto(url);
    await clickFilterButton(page, 'Tiefpass RL');
    await page.locator('#f-TP_RL').fill(filterInputs.tiefpassRL.f);
    await page.locator('#L-TP_RL').fill(filterInputs.tiefpassRL.L);
    await page.locator('input[onclick="calculate_TP_RL()"]').click();
    await expect(page.locator('#result_TP_RL')).toContainText(filterInputs.expected.tiefpassRL_XL);
  });

  test('should calculate Grenzfrequenz for Hochpass RC', async ({ page, filterInputs }) => {
    await page.goto(url);
    await clickFilterButton(page, 'Hochpass RC');
    await page.locator('#R-HP_RC').fill(filterInputs.hochpassRC.R);
    await page.locator('#C-HP_RC').fill(filterInputs.hochpassRC.C);
    await page.locator('input[onclick="calculate_HP_RC()"]').click();
    await expect(page.locator('#result_HP_RC')).toContainText(filterInputs.expected.hochpassRC_fg);
  });

  test('should calculate Grenzfrequenz for Tiefpass RC', async ({ page, filterInputs }) => {
    await page.goto(url);
    await clickFilterButton(page, 'Tiefpass RC');
    await page.locator('#R-TP_RC').fill(filterInputs.tiefpassRC.R);
    await page.locator('#C-TP_RC').fill(filterInputs.tiefpassRC.C);
    await page.locator('input[onclick="calculate_TP_RC()"]').click();
    await expect(page.locator('#result_TP_RC')).toContainText(filterInputs.expected.tiefpassRC_fg);
  });
});