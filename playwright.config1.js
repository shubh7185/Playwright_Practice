// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { worker } from 'node:cluster';
import { permission } from 'node:process';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 40000,
  retries : 1,
  workers : 1,
  expect: {
    timeout: 40000,
    // time for assertion validaion
  },
  reporter: 'html',
  projects: [
    {
      name: 'chrome execution',
      use: {

        browserName: 'chromium',
        headless: false,
        trace: 'on',
        screenshot: 'on',
        ignoreHttpsError : true,
        permissions : ['geolocation'],
        vedio : 'retain-on-failure',

        // viewport : {width:720,height:720}

      }

    },

    {
      name: 'safari execution',
      use: {

        browserName: 'Webkit',
        headless: false,
        trace: 'on',
        screenshot: 'off',
        ...devices['iPad (gen 11)'],
      }

    }



  ]





});

module.exports = config;

