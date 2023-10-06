const { defineConfig } = require('cypress');

require('dotenv').config({ path: `${__dirname}/.env.local` });

module.exports = defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  port: process.env.CYPRESS_HOST_PORT ? +process.env.CYPRESS_HOST_PORT : 3001,
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
    baseUrl: process.env.CYPRESS_BASE_URL,
    specPattern: 'cypress/tests/**/*.spec.{js,jsx,ts,tsx}',
  },
});
