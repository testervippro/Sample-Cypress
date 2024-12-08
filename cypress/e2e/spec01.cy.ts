describe("Connect to database", () => {

  const query = "";

  it("can call a database and execute a query", () => {
    cy.sqlServer(query).then ((result :any)=> {
      cy.log(result.recordset[0].JobId)
    })

  });
});
