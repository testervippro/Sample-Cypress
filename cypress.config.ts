import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'jz2xs6', // A
  env: {},
  reporter: 'mochawesome', // Use only Mochawesome reporter
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome-report', // Directory for Mochawesome reports
    reportFilename: 'report',                       // File name for the Mochawesome report
    overwrite: false,                               // Do not overwrite the report
    html: true,                                     // Enable HTML report generation
    json: true                                      // Enable JSON report generation
  },
  // https://github.com/adamgruber/mochawesome when use cypres split 
  // reporter: 'mochawesome',
  // reporterOptions: {
  //   useInlineDiffs: true,
  //   embeddedScreenshots: true,
  //   reportDir: 'cypress/results',
  //   reportFilename: '[name].html',
  //   overwrite: true,
  //   html: true,
  //   json: true,
  // },

  e2e: {
    setupNodeEvents(on, config) {
      // Add any setup or custom tasks here

      return config;
    },
  },
});
