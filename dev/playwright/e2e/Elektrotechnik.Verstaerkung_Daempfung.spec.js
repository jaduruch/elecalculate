// playwright/e2e/Elektrotechnik.Verstaerkung_Daempfung.spec.js
import { test as base, expect } from '@playwright/test';
import { attachFixture } from '../fixtures/attachFixture.js';
import verstaerkungDaempfungInputs from '../fixtures/verstaerkung_daempfungInputs.json' assert { type: "json" };

const test = base.extend({
  verstaerkungDaempfungInputs: async ({}, use) => {
    await use(verstaerkungDaempfungInputs);
  },
});

test.describe('Elektrotechnik | Verstaerkung_Daempfung.html', () => {
  const url = '/Elektrotechnik/Verstaerkung_Daempfung.html';

  test.beforeEach(async ({}, testInfo) => {
    await attachFixture(
      testInfo,
      '../fixtures/verstaerkung_daempfungInputs.json',
      {
        description: `This fixture contains input and expected output values for Verstärkungsmaß, Dämpfungsmaß, Verstärkungsfaktor, Dämpfungsfaktor, and output calculations.`
      }
    );
  });

  test('should calculate Verstärkungsmaß g from I1 and I2', async ({ page, verstaerkungDaempfungInputs }) => {
    await page.goto(url);
    await page.locator('#I1').fill(verstaerkungDaempfungInputs.verstaerkungsMassG.I1);
    await page.locator('#I2').fill(verstaerkungDaempfungInputs.verstaerkungsMassG.I2);
    await page.locator('input[onclick="calculateParameters()"]').click();
    const text = await page.locator('#result').innerText();
    await expect(text).toContain(verstaerkungDaempfungInputs.verstaerkungsMassG.expected);
  });

  test('should calculate Dämpfungsmaß a from I1 and I2', async ({ page, verstaerkungDaempfungInputs }) => {
    await page.goto(url);
    await page.locator('#I1').fill(verstaerkungDaempfungInputs.daempfungsMassA.I1);
    await page.locator('#I2').fill(verstaerkungDaempfungInputs.daempfungsMassA.I2);
    await page.locator('input[onclick="calculateParameters()"]').click();
    const text = await page.locator('#result').innerText();
    await expect(text).toContain(verstaerkungDaempfungInputs.daempfungsMassA.expected);
  });

  test('should calculate Verstärkungsfaktor V from I1 and I2', async ({ page, verstaerkungDaempfungInputs }) => {
    await page.goto(url);
    await page.locator('#I1').fill(verstaerkungDaempfungInputs.verstaerkungsFaktorV.I1);
    await page.locator('#I2').fill(verstaerkungDaempfungInputs.verstaerkungsFaktorV.I2);
    await page.locator('input[onclick="calculateParameters()"]').click();
    const text = await page.locator('#result').innerText();
    await expect(text).toContain(verstaerkungDaempfungInputs.verstaerkungsFaktorV.expected);
  });

  test('should calculate Dämpfungsfaktor D from I1 and I2', async ({ page, verstaerkungDaempfungInputs }) => {
    await page.goto(url);
    await page.locator('#I1').fill(verstaerkungDaempfungInputs.daempfungsFaktorD.I1);
    await page.locator('#I2').fill(verstaerkungDaempfungInputs.daempfungsFaktorD.I2);
    await page.locator('input[onclick="calculateParameters()"]').click();
    const text = await page.locator('#result').innerText();
    await expect(text).toContain(verstaerkungDaempfungInputs.daempfungsFaktorD.expected);
  });

  test('should calculate Ausgangsstrom I2 from I1 and g', async ({ page, verstaerkungDaempfungInputs }) => {
    await page.goto(url);
    await page.locator('#I1').fill(verstaerkungDaempfungInputs.ausgangsstromI2.I1);
    await page.locator('#g').fill(verstaerkungDaempfungInputs.ausgangsstromI2.g);
    await page.locator('input[onclick="calculateParameters()"]').click();
    const text = await page.locator('#result').innerText();
    await expect(text).toContain(verstaerkungDaempfungInputs.ausgangsstromI2.expected);
  });

  test('should calculate Ausgangsspannung U2 from U1 and g', async ({ page, verstaerkungDaempfungInputs }) => {
    await page.goto(url);
    await page.locator('#U1').fill(verstaerkungDaempfungInputs.ausgangsspannungU2.U1);
    await page.locator('#g').fill(verstaerkungDaempfungInputs.ausgangsspannungU2.g);
    await page.locator('input[onclick="calculateParameters()"]').click();
    const text = await page.locator('#result').innerText();
    await expect(text).toContain(verstaerkungDaempfungInputs.ausgangsspannungU2.expected);
  });

  test('should calculate Ausgangsleistung P2 from P1 and g', async ({ page, verstaerkungDaempfungInputs }) => {
    await page.goto(url);
    await page.locator('#P1').fill(verstaerkungDaempfungInputs.ausgangsleistungP2.P1);
    await page.locator('#g').fill(verstaerkungDaempfungInputs.ausgangsleistungP2.g);
    await page.locator('input[onclick="calculateParameters()"]').click();
    const text = await page.locator('#result').innerText();
    await expect(text).toContain(verstaerkungDaempfungInputs.ausgangsleistungP2.expected);
  });
});