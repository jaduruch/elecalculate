// playwright/e2e/Elektrotechnik.Gleichstrom.spec.js
import { test as base, expect } from '@playwright/test';
import { attachFixture } from '../fixtures/attachFixture.js';
import gleichstromInputs from '../fixtures/gleichstromInputs.json' assert { type: "json" };

const test = base.extend({
  gleichstromInputs: async ({}, use) => {
    await use(gleichstromInputs);
  },
});

async function openDropdown(page, headerText) {
  const header = page.locator('.dropdown-header', { hasText: headerText });
  const parent = header.locator('..');
  if (!(await parent.evaluate(el => el.classList.contains('open')))) {
    await header.click();
  }
}

async function clickOpvButton(page, label) {
  await page.locator('button.opv-button span', { hasText: label }).first().click();
}

test.describe('Elektrotechnik | Gleichstrom.html', () => {
  const url = '/Elektrotechnik/Gleichstrom.html';

  test.beforeEach(async ({}, testInfo) => {
    await attachFixture(
      testInfo,
      '../fixtures/gleichstromInputs.json',
      {
        description: `This fixture contains input and expected output values for Ohmsches Gesetz, Spannungsteiler, Serienschaltung, and Parallelschaltung on the Gleichstrom page.`
      }
    );
  });

  test('should calculate Ohmsches Gesetz (URI)', async ({ page, gleichstromInputs }) => {
    await page.goto(url);
    await openDropdown(page, 'Ohmsches Gesetz');
    await page.locator('#U').fill(gleichstromInputs.ohmschesGesetz.U);
    await page.locator('#R').fill(gleichstromInputs.ohmschesGesetz.R);
    await page.locator('input.Button_Berechnen[onclick="calculateParametersURI()"]').click();
    const text = await page.locator('#result').innerText();
    await expect(text).toContain(gleichstromInputs.ohmschesGesetz.expected.I);
    await expect(text).toContain(gleichstromInputs.ohmschesGesetz.expected.P);
  });

  test('should calculate unbelasteter Spannungsteiler', async ({ page, gleichstromInputs }) => {
    await page.goto(url);
    // Unbelastet
    await openDropdown(page, 'Spannungsteiler');
    await page.evaluate(() => {
        const el = document.getElementById('modeSwitch');
        if (el.checked) {
          el.checked = false;
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    await page.locator('#R1_unb').fill(gleichstromInputs.spannungsteilerUnbelastet.R1);
    await page.locator('#R2_unb').fill(gleichstromInputs.spannungsteilerUnbelastet.R2);
    await page.locator('#Uin_unb').fill(gleichstromInputs.spannungsteilerUnbelastet.Uin);
    await page.locator('input.Button_Berechnen[onclick="calculateParametersUnb_Spannungsteiler()"]').click();
    const text = await page.locator('#result_unb').innerText();
    await expect(text).toContain(gleichstromInputs.spannungsteilerUnbelastet.expected.Uout);
  });

  test('should calculate belasteter Spannungsteiler', async ({ page, gleichstromInputs }) => {
    await page.goto(url);
    // Belastet
    await openDropdown(page, 'Spannungsteiler');
    await page.evaluate(() => {
        const el = document.getElementById('modeSwitch');
        if (!el.checked) {
          el.checked = true;
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    await page.locator('#R1_bel').fill(gleichstromInputs.spannungsteilerBelastet.R1);
    await page.locator('#R2_bel').fill(gleichstromInputs.spannungsteilerBelastet.R2);
    await page.locator('#RL_bel').fill(gleichstromInputs.spannungsteilerBelastet.RL);
    await page.locator('#Uin_bel').fill(gleichstromInputs.spannungsteilerBelastet.Uin);
    await page.locator('input.Button_Berechnen[onclick="calculateParametersBel_Spannungsteiler()"]').click();
    const text = await page.locator('#result_bel').innerText();
    await expect(text).toContain(gleichstromInputs.spannungsteilerBelastet.expected.Uout);
  });

  test('should calculate Serienschaltung', async ({ page, gleichstromInputs }) => {
    await page.goto(url);
    await openDropdown(page, 'Serie- und Parallelschaltung');
    await clickOpvButton(page, 'Serie');
    await page.locator('#r1').fill(gleichstromInputs.serienschaltung.r1);
    await page.locator('#r2').fill(gleichstromInputs.serienschaltung.r2);
    await page.locator('input.Button_Berechnen[onclick="calculate(\'serie_schaltung\')"]').click();
    // Use the result inside the dynamic inputFieldsSerieParallel
    const text = await page.locator('#inputFieldsSerieParallel #result_S_P').innerText();
    await expect(text).toContain(gleichstromInputs.serienschaltung.expected.Rges);
  });

  test('should calculate Parallelschaltung', async ({ page, gleichstromInputs }) => {
    await page.goto(url);
    await openDropdown(page, 'Serie- und Parallelschaltung');
    await clickOpvButton(page, 'Parallel');
    await page.locator('#r1').fill(gleichstromInputs.parallelschaltung.r1);
    await page.locator('#r2').fill(gleichstromInputs.parallelschaltung.r2);
    await page.locator('input.Button_Berechnen[onclick="calculate(\'parallel_schaltung\')"]').click();
    // Use the result inside the dynamic inputFieldsSerieParallel
    const text = await page.locator('#inputFieldsSerieParallel #result_S_P').innerText();
    await expect(text).toContain(gleichstromInputs.parallelschaltung.expected.Rges);
  });
});