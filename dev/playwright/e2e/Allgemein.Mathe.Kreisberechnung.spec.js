// playwright/e2e/Allgemein.Mathe.Kreisberechnung.spec.js
import { test, expect } from '../global-setup'; // Import the extended test
import { attachFixture } from '../fixtures/attachFixture.js';
import matheInputs from '../fixtures/matheInputs.json' assert { type: "json" }; // Import JSON file using ES Modules

function normalizeText(text) {
  return text.replace(/\s+/g, ' ').trim();
}

test.describe('Mathe.html Kreisberechnung', () => {
  const url = '/Allgemein/Mathe.html';

  // Attach the fixture before each test
  test.beforeEach(async ({}, testInfo) => {
    await attachFixture(
      testInfo,
      '../fixtures/matheInputs.json',
      {
        description: `This fixture contains input and expected output values for Kreisberechnung calculations, including diameter and area conversions.`,
      }
    );
  });

  test('should calculate diameter from area', async ({ page }) => {
    await page.goto(url);
    await page.getByText('Kreisberechnung').click();

    await page.locator('#A').fill(matheInputs.diameterFromArea.area);
    await page.locator('#d').fill('');
    await page.getByRole('button', { name: /Berechnen/i }).click();

    const result = await page.locator('#result_Kreis').textContent();
    expect(normalizeText(result)).toContain('Leiterdurchmesser d');
    // Match "= 4", "= 4.0", "= 4.00", "= 4.001",
    expect(normalizeText(result)).toMatch(/= *4(\.0{0,3}1?)? *m/);
  });

  test('should calculate area from diameter', async ({ page }) => {
    await page.goto(url);
    await page.getByText('Kreisberechnung').click();

    await page.locator('#A').fill('');
    await page.locator('#d').fill(matheInputs.areaFromDiameter.diameter);
    await page.getByRole('button', { name: /Berechnen/i }).click();

    const result = await page.locator('#result_Kreis').textContent();
    expect(normalizeText(result)).toContain('Fläche A');
    // Match "= 12.57", "= 12.570", "= 12.57 m2",
    expect(normalizeText(result)).toMatch(/= *12\.57\d* *m/);
  });

  test('should show nothing if both fields are empty', async ({ page }) => {
    await page.goto(url);
    await page.getByText('Kreisberechnung').click();

    await page.locator('#A').fill('');
    await page.locator('#d').fill('');
    await page.getByRole('button', { name: /Berechnen/i }).click();

    await expect(page.locator('#result_Kreis')).toHaveText('');
  });

  test('should show nothing if both fields are filled', async ({ page }) => {
    await page.goto(url);
    await page.getByText('Kreisberechnung').click();

    await page.locator('#A').fill(matheInputs.diameterFromArea.area);
    await page.locator('#d').fill(matheInputs.areaFromDiameter.diameter);
    await page.getByRole('button', { name: /Berechnen/i }).click();

    await expect(page.locator('#result_Kreis')).toHaveText('');
  });
});