import { defineConfig } from "cypress";
//import * as auth from "./cypress/graph/auth.ts";


// async function getAPI(url: string) {
//   try {
//     const result = await auth.userClient.api(url).get();
//     return result;
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// async function updateAPI(url: string, body: any) {
//   let _body = JSON.stringify(body);

//   try {
//     const result = await auth.userClient.api(url).update(_body);
//     return null;
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

export default defineConfig({
  projectId: 'jz2xs6', // A
  env: {},
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      reporterEnabled: 'mochawesome,mocha-junit-reporter',
      mochawesomeReporterOptions: {
        reportDir: 'cypress/reports/mochawesome-report',   // Directory for Mochawesome reports
        reportFilename: 'report',                          // File name for the Mochawesome report
        overwrite: false,                                  // Do not overwrite the report
        html: false,                                       // Disable HTML report generation
        json: true                                         // Enable JSON report generation
      },
      mochaJunitReporterOptions: {
        mochaFile: 'cypress/reports/junit/test-results.xml' // Path to the JUnit XML file
      }
    },
  e2e: {
    setupNodeEvents(on, config) {
      //sql db
      


      // //get  api
      // on("task", {
      //   getAPI(url) {
      //     return getAPI(url);
      //   },
      // });

      // //update api
      // on("task", {
      //   updateAPI({ url, body }) {
      //     return updateAPI(url, body);
      //   },
      // });

   

      return config;
    },
  },
});
