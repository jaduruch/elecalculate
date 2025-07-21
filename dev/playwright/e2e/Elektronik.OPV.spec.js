// playwright/e2e/Elektronik.OPV.spec.js
import { test as base, expect } from '@playwright/test';
import { attachFixture } from '../fixtures/attachFixture.js';
import opvInputs from '../fixtures/opvInputs.json' assert { type: "json" };

const test = base.extend({
  opvInputs: async ({}, use) => {
    await use(opvInputs);
  },
});

test.describe('Elektronik | OPV.html', () => {
  const url = '/Elektronik/OPV.html';

  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(url);
    await attachFixture(
      testInfo,
      '../fixtures/opvInputs.json',
      {
        description: `This fixture contains input and expected output values for various OPV (Operationsverstärker) calculations.`
      }
    );
  });

  test('should calculate gain for invertierender Verstärker', async ({ page, opvInputs }) => {
    const data = opvInputs.invertierenderVerstaerker;
    await page.locator('//button[span[normalize-space(text())="invertierender Verstärker"]]').click();

    await page.locator('#R1-1').fill(data.R1);
    await page.locator('#R2-1').fill(data.R2);
    // Leave V empty to trigger gain calculation

    await page.locator('#invertierender_Verstaerker input.Button_Berechnen').click();

    await expect(page.locator('#result_invertierender_Verstaerker')).toContainText(data.expectedGain);
  });

  test('should calculate output voltage for nicht-invertierender Verstärker', async ({ page, opvInputs }) => {
    const data = opvInputs.nichtInvertierenderVerstaerker;
    await page.locator('button span', { hasText: 'nicht-invertierender Verstärker' }).click();

    await page.locator('#R1-2').fill(data.R1);
    await page.locator('#R2-2').fill(data.R2);
    await page.locator('#Uin-2').fill(data.Uin);
    // Leave Uout and V empty to trigger Uout calculation

    await page.locator('#nicht_invertierender_Verstaerker input.Button_Berechnen').click();

    await expect(page.locator('#result_nicht_invertierender_Verstaerker')).toContainText(data.expectedUout);
  });

  test('should calculate output voltage for Summier Verstärker', async ({ page, opvInputs }) => {
    const data = opvInputs.summierVerstaerker;
    await page.locator('button span', { hasText: 'Summier Verstärker' }).click();

    await page.locator('#R11-3').fill(data.R11);
    await page.locator('#R12-3').fill(data.R12);
    await page.locator('#R2-3').fill(data.R2);
    await page.locator('#Uin1-3').fill(data.Uin1);
    await page.locator('#Uin2-3').fill(data.Uin2);

    await page.locator('#summier_Verstaerker input.Button_Berechnen').click();

    await expect(page.locator('#result_summier_Verstaerker')).toContainText(data.expectedUout);
  });
});