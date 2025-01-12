/// <reference types="cypress" />


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
export{}
// declare 
declare global {
  namespace Cypress {
    interface Chainable {
        sqlServer(query: string): Chainable<any>;
        getAPI(url: string): Chainable<any>;
        updateAPI(url: string, body: any): Chainable<any>;
        getMicrosoftDenfenderPolicy( path :string):Chainable<any>;
        setMicrosoftDenfenderPolicy( path :string):Chainable<any>;
        selectProduct( name :string):Chainable<any>;
    }
  }
}

Cypress.Commands.add("selectProduct",(productName:any)=> {
  cy.get("h4.card-title").each(($el , index , $list) => {
      if($el.text().includes(productName)){
        cy.get("button.btn.btn-infor").eq(index).click()
      }
  })
})

//get API
Cypress.Commands.add('getAPI', (url: string) => {
  if (!url) {
    throw new Error('Query must be set');
}
  return cy.task('getAPI', url)
});

//update API
Cypress.Commands.add('updateAPI', (url: string, body:any) => {
  if (!url) {
    throw new Error('Query must be set');
}
  return cy.task('updateAPI',{ url,body})
});




Cypress.Commands.add('getMicrosoftDenfenderPolicy', (setScriptPolicyPath) => {
  return cy.exec(`powershell -File "cypress\\defender\\setPolicy.ps1" -username "ad.onmicrosoft.com" -password "Demo" -command ${setScriptPolicyPath}`, { failOnNonZeroExit: false })
    .then((result) => {
      return {
        code: result.code,
        stdout: result.stdout.trim(),
        stderr: result.stderr.trim()
      };
    });
});
//call setPolicy.ps1 then setPolicy.ps1 call setScriptPolicyPath to execute  
Cypress.Commands.add('setMicrosoftDenfenderPolicy', (setScriptPolicyPath) => {
  const _sciptSetPolicy = "cypress\defender\setPolicy.ps1"
  return cy.exec(`powershell -File cypress\\defender\\setPolicy.ps1 -username "lukecom" -password "Demo" -command ${setScriptPolicyPath}`, { failOnNonZeroExit: false })
    .then((result) => {
      return {
        code: result.code,
        stdout: result.stdout.trim(),
        stderr: result.stderr.trim()
      };
    });
});




  
