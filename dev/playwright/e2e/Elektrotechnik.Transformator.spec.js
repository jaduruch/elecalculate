// playwright/e2e/Elektrotechnik.Transformator.spec.js
import { test as base, expect } from '@playwright/test';
import { attachFixture } from '../fixtures/attachFixture.js';
import transformatorInputs from '../fixtures/transformatorInputs.json' assert { type: "json" };

const test = base.extend({
  transformatorInputs: async ({}, use) => {
    await use(transformatorInputs);
  },
});

test.describe('Elektrotechnik | Transformator.html', () => {
  const url = '/Elektrotechnik/Transformator.html';

  test.beforeEach(async ({}, testInfo) => {
    await attachFixture(
      testInfo,
      '../fixtures/transformatorInputs.json',
      {
        description: `This fixture contains input and expected output values for various Transformator calculations.`
      }
    );
  });

  test('should calculate Übersetzungsverhältnis (ue) from I1 and I2', async ({ page, transformatorInputs }) => {
    await page.goto(url);
    await page.locator('#I1').fill(transformatorInputs.uebersetzungsverhaeltnis.I1);
    await page.locator('#I2').fill(transformatorInputs.uebersetzungsverhaeltnis.I2);
    await page.locator('input[onclick="calculateParameters()"]').click();
    const text = await page.locator('#result').innerText();
    await expect(text).toContain(transformatorInputs.uebersetzungsverhaeltnis.expected);
  });

  test('should calculate Spannung U2 from U1 and ue', async ({ page, transformatorInputs }) => {
    await page.goto(url);
    await page.locator('#U1').fill(transformatorInputs.spannungU2.U1);
    await page.locator('#ue').fill(transformatorInputs.spannungU2.ue);
    await page.locator('input[onclick="calculateParameters()"]').click();
    const text = await page.locator('#result').innerText();
    await expect(text).toContain(transformatorInputs.spannungU2.expected);
  });

  test('should calculate Leistung P2 from P1 and eta', async ({ page, transformatorInputs }) => {
    await page.goto(url);
    await page.locator('#P1').fill(transformatorInputs.leistungP2.P1);
    await page.locator('#eta').fill(transformatorInputs.leistungP2.eta);
    await page.locator('input[onclick="calculateParameters()"]').click();
    const text = await page.locator('#result').innerText();
    await expect(text).toContain(transformatorInputs.leistungP2.expected);
  });

  test('should calculate Windungszahl N2 from N1 and ue', async ({ page, transformatorInputs }) => {
    await page.goto(url);
    await page.locator('#N1').fill(transformatorInputs.windungszahlN2.N1);
    await page.locator('#ue').fill(transformatorInputs.windungszahlN2.ue);
    await page.locator('input[onclick="calculateParameters()"]').click();
    const text = await page.locator('#result').innerText();
    await expect(text).toContain(transformatorInputs.windungszahlN2.expected);
  });

  test('should calculate Wirkungsgrad eta from P1 and P2', async ({ page, transformatorInputs }) => {
    await page.goto(url);
    await page.locator('#P1').fill(transformatorInputs.wirkungsgradEta.P1);
    await page.locator('#P2').fill(transformatorInputs.wirkungsgradEta.P2);
    await page.locator('input[onclick="calculateParameters()"]').click();
    const text = await page.locator('#result').innerText();
    await expect(text).toContain(transformatorInputs.wirkungsgradEta.expected);
  });
});