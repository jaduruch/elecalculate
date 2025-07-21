// playwright/e2e/Elektrotechnik.Spule.spec.js
import { test as base, expect } from '@playwright/test';
import { attachFixture } from '../fixtures/attachFixture.js';
import spuleInputs from '../fixtures/spuleInputs.json' assert { type: "json" };

const test = base.extend({
  spuleInputs: async ({}, use) => {
    await use(spuleInputs);
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

test.describe('Elektrotechnik | Spule.html', () => {
  const url = '/Elektrotechnik/Spule.html';

  test.beforeEach(async ({}, testInfo) => {
    await attachFixture(
      testInfo,
      '../fixtures/spuleInputs.json',
      {
        description: `This fixture contains input and expected output values for various Spule (inductor) calculations.`
      }
    );
  });

  test('should calculate Strom I from Phi, N, and L', async ({ page, spuleInputs }) => {
    await page.goto(url);
    await openDropdown(page, 'Spulen berechnungen');
    await page.locator('#Phi').fill(spuleInputs.strom.Phi);
    await page.locator('#N').fill(spuleInputs.strom.N);
    await page.locator('#L').fill(spuleInputs.strom.L);
    await page.locator('input[onclick="calculateInductorParameters()"]').click();
    const text = await page.locator('#result').innerText();
    await expect(text).toContain(spuleInputs.strom.expected);
  });

  test('should calculate Induktivität L from ur, N, A, and l', async ({ page, spuleInputs }) => {
    await page.goto(url);
    await openDropdown(page, 'Spulen berechnungen');
    await page.locator('#ur').fill(spuleInputs.induktivitaet.ur);
    await page.locator('#N').fill(spuleInputs.induktivitaet.N);
    await page.locator('#A').fill(spuleInputs.induktivitaet.A);
    await page.locator('#l').fill(spuleInputs.induktivitaet.l);
    await page.locator('input[onclick="calculateInductorParameters()"]').click();
    const text = await page.locator('#result').innerText();
    await expect(text).toContain(spuleInputs.induktivitaet.expected);
  });

  test('should calculate Magnetischer Fluss Phi from L, I, and N', async ({ page, spuleInputs }) => {
    await page.goto(url);
    await openDropdown(page, 'Spulen berechnungen');
    await page.locator('#L').fill(spuleInputs.magnetischerFluss.L);
    await page.locator('#I').fill(spuleInputs.magnetischerFluss.I);
    await page.locator('#N').fill(spuleInputs.magnetischerFluss.N);
    await page.locator('input[onclick="calculateInductorParameters()"]').click();
    const text = await page.locator('#result').innerText();
    await expect(text).toContain(spuleInputs.magnetischerFluss.expected);
  });

  test('should calculate Induzierte Spannung U from Phi, t, and N', async ({ page, spuleInputs }) => {
    await page.goto(url);
    await openDropdown(page, 'Spulen berechnungen');
    await page.locator('#Phi').fill(spuleInputs.induzierteSpannung.Phi);
    await page.locator('#t').fill(spuleInputs.induzierteSpannung.t);
    await page.locator('#N').fill(spuleInputs.induzierteSpannung.N);
    await page.locator('input[onclick="calculateInductorParameters()"]').click();
    const text = await page.locator('#result').innerText();
    const found = spuleInputs.induzierteSpannung.expected.some(val => text.includes(val));
    expect(found).toBe(true);
  });
});