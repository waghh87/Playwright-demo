// @ts-nocheck
import { defineConfig, devices } from '@playwright/test';
//import { on } from 'events';
//import { trace } from 'console';

const config = {
  testDir: './tests',
  
  // Override on the by default timeout
  timeout: 600*1000,
    expect: {
      timeout: 30000,
    },
  // if want HTML Report
    reporter: 'html',

  use: {

     browserName: 'chromium',
     headless : false,
         viewport: null,
    launchOptions: {
      args: ['--start-maximized']
    },
     screenshot: 'on',
    // trace: 'retain-on-failure',
    video: 'on',
    

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    
  },



  
};
module.exports = config
