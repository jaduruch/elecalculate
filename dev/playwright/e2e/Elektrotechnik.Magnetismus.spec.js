// playwright/e2e/Elektrotechnik.Magnetismus.spec.js
import { test as base, expect } from '@playwright/test';
import { attachFixture } from '../fixtures/attachFixture.js';
import magnetismusInputs from '../fixtures/magnetismusInputs.json' assert { type: "json" };

const test = base.extend({
  magnetismusInputs: async ({}, use) => {
    await use(magnetismusInputs);
  },
});

test.describe('Elektrotechnik | Magnetismus.html', () => {
  const url = '/Elektrotechnik/Magnetismus.html';

  test.beforeEach(async ({}, testInfo) => {
    await attachFixture(
      testInfo,
      '../fixtures/magnetismusInputs.json',
      {
        description: `This fixture contains input and expected output values for various Magnetismus calculations.`
      }
    );
  });

  test('should calculate Strom I from Theta and N', async ({ page, magnetismusInputs }) => {
    await page.goto(url);
    await page.locator('#Theta').fill(magnetismusInputs.strom.Theta);
    await page.locator('#N').fill(magnetismusInputs.strom.N);
    await page.locator('input[onclick="calculateParameters()"]').click();
    const text = await page.locator('#result').innerText();
    await expect(text).toContain(magnetismusInputs.strom.expected);
  });

  test('should calculate Kraft F from B and A', async ({ page, magnetismusInputs }) => {
    await page.goto(url);
    await page.locator('#B').fill(magnetismusInputs.kraft.B);
    await page.locator('#A').fill(magnetismusInputs.kraft.A);
    await page.locator('input[onclick="calculateParameters()"]').click();
    const text = await page.locator('#result').innerText();
    await expect(text).toContain(magnetismusInputs.kraft.expected);
  });

  test('should calculate Durchflutung Theta from H and l', async ({ page, magnetismusInputs }) => {
    await page.goto(url);
    await page.locator('#H').fill(magnetismusInputs.durchflutung.H);
    await page.locator('#l').fill(magnetismusInputs.durchflutung.l);
    await page.locator('input[onclick="calculateParameters()"]').click();
    const text = await page.locator('#result').innerText();
    await expect(text).toContain(magnetismusInputs.durchflutung.expected);
  });

  test('should calculate Windungszahl N from Theta and I', async ({ page, magnetismusInputs }) => {
    await page.goto(url);
    await page.locator('#Theta').fill(magnetismusInputs.windungszahl.Theta);
    await page.locator('#I').fill(magnetismusInputs.windungszahl.I);
    await page.locator('input[onclick="calculateParameters()"]').click();
    const text = await page.locator('#result').innerText();
    await expect(text).toContain(magnetismusInputs.windungszahl.expected);
  });
});