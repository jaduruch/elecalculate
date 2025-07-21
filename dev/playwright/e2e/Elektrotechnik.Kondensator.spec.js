// playwright/e2e/Elektrotechnik.Kondensator.spec.js
import { test as base, expect } from '@playwright/test';
import { attachFixture } from '../fixtures/attachFixture.js';
import kondensatorInputs from '../fixtures/kondensatorInputs.json' assert { type: "json" };

const test = base.extend({
  kondensatorInputs: async ({}, use) => {
    await use(kondensatorInputs);
  },
});

// Helper: Open a dropdown by its header text
async function openDropdown(page, headerText) {
  const header = page.locator('.dropdown-header', { hasText: headerText });
  const parent = header.locator('..');
  if (!(await parent.evaluate(el => el.classList.contains('open')))) {
    await header.click();
  }
}

// Helper: Click an img-button by its label
async function clickImgButton(page, label) {
  await page.locator('button.img-button span', { hasText: label }).first().click();
}

test.describe('Elektrotechnik | Kondensator.html (value-only)', () => {
  const url = '/Elektrotechnik/Kondensator.html';

  test.beforeEach(async ({}, testInfo) => {
    await attachFixture(
      testInfo,
      '../fixtures/kondensatorInputs.json',
      {
        description: `This fixture contains input and expected output values for various Kondensator calculations.`
      }
    );
  });

  test('should calculate Kapazität C from Q and U', async ({ page, kondensatorInputs }) => {
    await page.goto(url);
    await openDropdown(page, 'Kondensator berechnungen');
    await page.locator('#Q').fill(kondensatorInputs.kapazitaet.Q);
    await page.locator('#U').fill(kondensatorInputs.kapazitaet.U);
    await page.locator('input[onclick="calculateCapacitorParameters()"]').click();
    await expect(page.locator('#result')).toContainText(kondensatorInputs.kapazitaet.expected);
  });

  test('should calculate Spannung U from E and s', async ({ page, kondensatorInputs }) => {
    await page.goto(url);
    await openDropdown(page, 'Kondensator berechnungen');
    await page.locator('#E').fill(kondensatorInputs.spannung.E);
    await page.locator('#s').fill(kondensatorInputs.spannung.s);
    await page.locator('input[onclick="calculateCapacitorParameters()"]').click();
    await expect(page.locator('#result')).toContainText(kondensatorInputs.spannung.expected);
  });

  test('should calculate Energie W from C and U', async ({ page, kondensatorInputs }) => {
    await page.goto(url);
    await openDropdown(page, 'Kondensator berechnungen');
    await page.locator('#C').fill(kondensatorInputs.energie.C);
    await page.locator('#U').fill(kondensatorInputs.energie.U);
    await page.locator('input[onclick="calculateCapacitorParameters()"]').click();
    await expect(page.locator('#result')).toContainText(kondensatorInputs.energie.expected);
  });

  test('should calculate Zeitkonstante tau for RC-Glied', async ({ page, kondensatorInputs }) => {
    await page.goto(url);
    await openDropdown(page, 'RC-Glied');
    await page.locator('#R_RC').fill(kondensatorInputs.zeitkonstante.R_RC);
    await page.locator('#C_RC').fill(kondensatorInputs.zeitkonstante.C_RC);
    await page.locator('input[onclick="calculateRC()"]').click();
    await expect(page.locator('#result_RC')).toContainText(kondensatorInputs.zeitkonstante.expected);
  });

  test('should calculate Serie AC values', async ({ page, kondensatorInputs }) => {
    await page.goto(url);
    await openDropdown(page, 'Kondensator an Wechselstrom');
    await clickImgButton(page, 'Serie');
    await page.locator('#R_AC').fill(kondensatorInputs.ac_serie.R_AC);
    await page.locator('#Xc_AC').fill(kondensatorInputs.ac_serie.Xc_AC);
    await page.locator('#C_AC').fill(kondensatorInputs.ac_serie.C_AC);
    await page.locator('input[onclick="calculateSerieAC()"]').click();
    await expect(page.locator('#result_Serie_AC')).toContainText(kondensatorInputs.ac_serie.expected);
  });

  test('should calculate Parallel AC Blindleitwert Bc', async ({ page, kondensatorInputs }) => {
    await page.goto(url);
    await openDropdown(page, 'Kondensator an Wechselstrom');
    await clickImgButton(page, 'Parallel');
    await page.locator('#U_ACp').fill(kondensatorInputs.ac_parallel_Bc.U_ACp);
    await page.locator('#f_ACp').fill(kondensatorInputs.ac_parallel_Bc.f_ACp);
    await page.locator('#C_ACp').fill(kondensatorInputs.ac_parallel_Bc.C_ACp);
    await page.locator('input[onclick="calculateParallelAC()"]').click();
    await expect(page.locator('#result_Parallel_AC')).toContainText(kondensatorInputs.ac_parallel_Bc.expected);
  });

  test('should calculate Parallel AC Blindstrom Ic from Ir and phi', async ({ page, kondensatorInputs }) => {
    await page.goto(url);
    await openDropdown(page, 'Kondensator an Wechselstrom');
    await clickImgButton(page, 'Parallel');
    await page.locator('#Ir_ACp').fill(kondensatorInputs.ac_parallel_Ir_phi.Ir_ACp);
    await page.locator('#phi_ACp').fill(kondensatorInputs.ac_parallel_Ir_phi.phi_ACp);
    await page.locator('input[onclick="calculateParallelAC()"]').click();
    await expect(page.locator('#result_Parallel_AC')).toContainText(kondensatorInputs.ac_parallel_Ir_phi.expected);
  });

  test('should calculate Parallel AC Wirkstrom Ir from I and Ic', async ({ page, kondensatorInputs }) => {
    await page.goto(url);
    await openDropdown(page, 'Kondensator an Wechselstrom');
    await clickImgButton(page, 'Parallel');
    await page.locator('#I_ACp').fill(kondensatorInputs.ac_parallel_I_Ic.I_ACp);
    await page.locator('#Ic_ACp').fill(kondensatorInputs.ac_parallel_I_Ic.Ic_ACp);
    await page.locator('input[onclick="calculateParallelAC()"]').click();
    await expect(page.locator('#result_Parallel_AC')).toContainText(kondensatorInputs.ac_parallel_I_Ic.expected);
  });
});