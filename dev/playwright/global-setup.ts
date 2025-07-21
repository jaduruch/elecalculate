import { test as base, expect as baseExpect } from '@playwright/test';
import { allure } from 'allure-playwright';
import path from 'path';

// Extend the base test
export const test = base;

test.beforeEach(async ({}, testInfo) => {
  const filePath = testInfo.file; // Full path to the test file
  const fileName = path.basename(filePath, '.spec.js'); // Extract file name without extension
  const parts = fileName.split('.'); // Split file name into parts

  if (parts.length >= 2) {
    const [epic, feature] = parts; // Use the first part as epic and second as feature
    allure.epic(epic); // Assign epic dynamically
    allure.feature(feature); // Assign feature dynamically
    allure.story(testInfo.title); // Use the test title as the story

    // Log the labels for debugging
    console.log(`Assigned Allure Labels:`);
    console.log(`  Epic: ${epic}`);
    console.log(`  Feature: ${feature}`);
    console.log(`  Story: ${testInfo.title}`);
  } else {
    console.warn(`Invalid file name format: ${fileName}`);
  }
});

// Export both `test` and `expect`
export { baseExpect as expect };