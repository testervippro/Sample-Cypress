import { defineConfig } from "cypress";
import * as auth from "./cypress/graph/auth.ts";
const sql = require("mssql");

const database = {
  server: process.env.SERVER,
  port: 1433,
  database: process.env.DATABASE_NAME,
  user: process.env.USER_NAME_DB,
  password: process.env.PASS_WORD_DB,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function queryDatabase(query) {
  try {
    const pool = await sql.connect(database);
    const result = await pool.request().query(query);
    return result;
  } catch (err) {
    console.error("Database query failed:", err);
    throw err;
  } finally {
    await sql.close();
  }
}

async function getAPI(url: string) {
  try {
   const result = await auth.userClient.api(url).get();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function updateAPI(url: string, body:any) {
let _body = JSON.stringify(body)
   
  
  try {
   const result = await auth.userClient.api(url).update(_body);
    return null
  } catch (error) {
    console.error("Error:", error);
  }
}

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      //sql db
      on("task", {
        queryDatabase(query) {
          return queryDatabase(query);
        },
      });

      //get  api
      on("task", {
        getAPI(url) {
          return getAPI(url);
        },
      });

      //update api
      on("task", {
        updateAPI({url , body}) {
          return updateAPI(url, body);
        },
      });

      on("task", {
        // Task to log messages to the console
        log(message) {
          console.log(message);
          return null;
        },
      });

      return config;
    },
  },
});
