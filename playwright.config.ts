import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env['CI'],
  /* Retry on CI only */
  retries: process.env['CI'] ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env['CI'] ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Configure web server to run Angular app */
  webServer: {
    command: 'ng serve --port 4200',
    url: 'http://localhost:4200',
    reuseExistingServer: true, // Reuse existing server to avoid port conflicts
    timeout: 120000, // 2 minutes for server startup
  },
  /* Shared settings for all the projects */
  use: {
    /* Base URL for actions like `await page.goto('/')` */
    baseURL: 'http://localhost:4200',
    /* Collect trace when retrying failed tests */
    trace: 'on-first-retry',
    /* Increase timeouts for actions and assertions */
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
