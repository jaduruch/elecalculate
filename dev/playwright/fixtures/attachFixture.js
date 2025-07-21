import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Attach a JSON fixture file to the Playwright test report.
 *
 * This utility attaches the fixture as a JSON artifact, enabling
 * collapsible, syntax-highlighted viewing in Allure and other reporters.
 * It is recommended to use this for any structured test data that
 * benefits from clear, machine-readable presentation.
 *
 * Usage:
 *   await attachFixture(testInfo, './fixtures/user.json', {
 *     name: 'user-data', // Optional: custom attachment name
 *   });
 *
 * @param {import('@playwright/test').TestInfo} testInfo
 *   Playwright's TestInfo object, available in test context.
 * @param {string} fixturePath
 *   Relative path to the JSON fixture file.
 * @param {object} [options]
 * @param {string} [options.name]
 *   Optional base name for the attachment (default: fixture file name).
 */
export async function attachFixture(testInfo, fixturePath, options = {}) {
  // Convert `import.meta.url` to a file path
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Resolve the absolute path to the fixture file
  const absPath = path.resolve(__dirname, fixturePath);
  const body = fs.readFileSync(absPath, 'utf-8');
  const baseName = options.name || path.basename(fixturePath, path.extname(fixturePath));

  // Attempt to pretty-print JSON for readability in the report
  let pretty = body;
  try {
    pretty = JSON.stringify(JSON.parse(body), null, 2);
  } catch (e) {
    // If not valid JSON, attach as-is (should rarely happen)
  }

  await testInfo.attach(`${baseName}.json`, {
    body: pretty,
    contentType: 'application/json',
  });
}