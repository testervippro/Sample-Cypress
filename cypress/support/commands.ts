/// <reference types="cypress" />

import { userClient } from "../graph/auth";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

// declare
declare global {
  namespace Cypress {
    interface Chainable {
      sqlServer(query: string): Chainable<any>;
      getAPI(url: string): Chainable<any>;
      updateAPI(url: string, body: any): Chainable<any>;
      selectProduct(query: string): Chainable<any>;
    }
  }
}

Cypress.Commands.add("selectProduct", (productName) => {
  cy.get("h4.card-title").each(($el, index, $list) => {
    if ($el.text().includes(productName)) {
      cy.get("button.btn.btn-info").eq(index).click();
    }
  });
});

Cypress.Commands.add("sqlServer", (query: string) => {
  if (!query) {
    throw new Error("Query must be set");
  }
  return cy.task("queryDatabase", query);
});

//get API
Cypress.Commands.add("getAPI", (url: string) => {
  if (!url) {
    throw new Error("Query must be set");
  }
  return cy.task("getAPI", url);
});

//update API
Cypress.Commands.add("updateAPI", (url: string, body: any) => {
  if (!url) {
    throw new Error("Query must be set");
  }
  return cy.task("updateAPI", { url, body });
});
