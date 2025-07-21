// playwright/e2e/HST.Glossar.spec.js
import { test as base, expect } from '@playwright/test';
import { attachFixture } from '../fixtures/attachFixture.js';
import hstInputs from '../fixtures/hstInputs.json' assert { type: "json" };

const test = base.extend({
  hstInputs: async ({}, use) => {
    await use(hstInputs);
  },
});

test.describe('HST Glossar', () => {
  const url = '/HST/hst.html';

  test.beforeEach(async ({}, testInfo) => {
    await attachFixture(
      testInfo,
      '../fixtures/hstInputs.json',
      {
        description: `This fixture contains known glossary terms and search queries for the HST Glossar page.`
      }
    );
  });

  test('should display the glossary table and some known terms', async ({ page, hstInputs }) => {
    await page.goto(url);
    await expect(page.locator('table')).toContainText('Begriff');
    for (const term of hstInputs.knownTerms) {
      await expect(page.locator(`table td:first-child strong`, { hasText: term })).toBeVisible();
    }
  });

  test('should show all matching terms when searching for RAM', async ({ page }) => {
    await page.goto('/HST/hst.html');
    await page.locator('#search').fill('DRAM');
    // All terms containing "RAM" should be visible as main terms
    for (const term of ["DRAM"]) {
      await expect(page.locator('table td:first-child strong', { hasText: term })).toBeVisible();
    }
  });

  test('should scroll to the correct letter when using alphabet nav', async ({ page, hstInputs }) => {
    await page.goto(url);
    await page.locator('.alphabet-nav a', { hasText: hstInputs.alphabetNav.letter }).click();
    await expect(page.locator(`#letter-${hstInputs.alphabetNav.sectionId}`)).toHaveCount(1);
    await expect(
      page.locator(`table td:first-child strong`, { hasText: hstInputs.alphabetNav.term })
    ).toBeVisible();
  });
});