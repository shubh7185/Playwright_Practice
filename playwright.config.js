// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 40000,
  expect : {
    timeout : 40000,
    // time for assertion validaion
  },
  reporter : 'html',

  use: { 

    browserName : 'chromium',
    headless : false,
    trace: 'on',
    screenshot : 'on',

  },

 

 
});

module.exports = config;

