// playwright/e2e/Elektrotechnik.Wechselstrom.spec.js
import { test as base, expect } from '@playwright/test';
import { attachFixture } from '../fixtures/attachFixture.js';
import wechselstromInputs from '../fixtures/wechselstromInputs.json' assert { type: "json" };

const test = base.extend({
  wechselstromInputs: async ({}, use) => {
    await use(wechselstromInputs);
  },
});

// Helper: Click the correct img-button by its label (strict, robust)
async function clickImgButton(page, label) {
  await page.locator('button.img-button').filter({
    has: page.locator('span', { hasText: label })
  }).first().click();
}

test.describe('Elektrotechnik | Wechselstrom.html', () => {
  const url = '/Elektrotechnik/Wechselstrom.html';

  test.beforeEach(async ({}, testInfo) => {
    await attachFixture(
      testInfo,
      '../fixtures/wechselstromInputs.json',
      {
        description: `This fixture contains input and expected output values for Sinus, Rechteck, Dreieck, and PWM Effektivwert calculations.`
      }
    );
  });

  test('should calculate Sinus Effektivwert', async ({ page, wechselstromInputs }) => {
    await page.goto(url);

    await clickImgButton(page, 'Sinus');
    await page.locator('#up-Sinus').fill(wechselstromInputs.sinus.up);
    await page.locator('input[onclick="calculate_Sinus()"]').click();
    let text = await page.locator('#result_Sinus').innerText();
    await expect(text).toContain(wechselstromInputs.sinus.expected);

    // upp = 20, up left empty, should still get Ueff = 7.07V
    await page.locator('#up-Sinus').fill('');
    await page.locator('#upp-Sinus').fill(wechselstromInputs.sinus.upp);
    await page.locator('input[onclick="calculate_Sinus()"]').click();
    text = await page.locator('#result_Sinus').innerText();
    await expect(text).toContain(wechselstromInputs.sinus.expected);
  });

  test('should calculate Rechteck Effektivwert', async ({ page, wechselstromInputs }) => {
    await page.goto(url);

    await clickImgButton(page, 'Rechteck');
    await page.locator('#up-Rechteck').fill(wechselstromInputs.rechteck.up);
    await page.locator('input[onclick="calculate_Rechteck()"]').click();
    let text = await page.locator('#result_Rechteck').innerText();
    await expect(text).toContain(wechselstromInputs.rechteck.expected);

    // upp = 20, up left empty, should still get Ueff = 10V
    await page.locator('#up-Rechteck').fill('');
    await page.locator('#upp-Rechteck').fill(wechselstromInputs.rechteck.upp);
    await page.locator('input[onclick="calculate_Rechteck()"]').click();
    text = await page.locator('#result_Rechteck').innerText();
    await expect(text).toContain(wechselstromInputs.rechteck.expected);
  });

  test('should calculate Dreieck Effektivwert', async ({ page, wechselstromInputs }) => {
    await page.goto(url);

    await clickImgButton(page, 'Dreieck');
    await page.locator('#up-Dreieck').fill(wechselstromInputs.dreieck.up);
    await page.locator('input[onclick="calculate_Dreieck()"]').click();
    let text = await page.locator('#result_Dreieck').innerText();
    await expect(text).toContain(wechselstromInputs.dreieck.expected);

    // upp = 20, up left empty, should still get Ueff = 5.77V
    await page.locator('#up-Dreieck').fill('');
    await page.locator('#upp-Dreieck').fill(wechselstromInputs.dreieck.upp);
    await page.locator('input[onclick="calculate_Dreieck()"]').click();
    text = await page.locator('#result_Dreieck').innerText();
    await expect(text).toContain(wechselstromInputs.dreieck.expected);
  });

  test('should calculate PWM Effektivwert', async ({ page, wechselstromInputs }) => {
    await page.goto(url);

    await clickImgButton(page, 'PWM');
    await page.locator('#up-PWM').fill(wechselstromInputs.pwm.up);
    await page.locator('#g-PWM').fill(wechselstromInputs.pwm.g);
    await page.locator('input[onclick="calculate_PWM()"]').click();
    const text = await page.locator('#result_PWM').innerText();
    await expect(text).toContain(wechselstromInputs.pwm.expected);
  });
});