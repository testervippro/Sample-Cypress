describe("Connect to database", () => {
  const query = "";

  it.skip("can call a database and execute a query", () => {
    cy.sqlServer(query).then((result: any) => {
      cy.log(result.recordset[0].JobId);
    });
  });

  // it("test can ps1 file", () => {
  //   cy.executePowerShell("path/to/your/script.ps1").then((result) => {
  //     console.log(result.stdout);
  //   });
  // });
});
