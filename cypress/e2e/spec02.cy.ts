import HomePage from "../support/page/HomePage";
import ProductPage from "../support/page/ProductPage";

describe(
  "My Second Test Suite",
  { defaultCommandTimeout: 60_000 },
  function () {
    before(function () {
      // runs once before all tests in the block
      cy.fixture("example").then(function (data) {
        this.data = data;
      });
    });

    it("My FirstTest case", function () {
      const homePage = new HomePage();
      const productPage = new ProductPage();
      cy.visit("https://rahulshettyacademy.com" + "/angularpractice/");
      homePage.getEditBox().type(this.data.name);
      homePage.getGender().select(this.data.gender);
      homePage.getTwoWayDataBinding().should("have.value", this.data.name);
      homePage.getEditBox().should("have.attr", "minlength", "2");
      homePage.getEntrepreneaur().should("be.disabled");
      homePage.getShopTab().click();
      Cypress.config("defaultCommandTimeout", 8000);

      this.data.productName.forEach(function (element) {
        cy.selectProduct(element);
      });

      productPage.checkOutButton().click();

  let sumExpect: number  = 0;

     cy.get("tr td:nth-child(4) strong")
  .then(($elements) => {
    sumExpect = [...$elements]// coppy jquery object -> js array
      .map((el) => el.innerText.match(/\d+(\.\d+)?/)?.[0] || "0") // Extracts the numeric part and . 
      .reduce((acc, num) => acc + Number(num), 0);

    cy.log(`Total Sum: ${sumExpect}`);
  });

  cy.get("h3 strong").then(function (element) {
    const amount = element.text().trim();  // Get the text and trim whitespace
    const match = amount.match(/\d+/);     // Match only the digits (this will capture the number)
    
    if (match) {
      const total = Number(match[0]);     // Convert the matched string to a number
      expect(total).to.equal(sumExpect);     // Replace with your expected value
    } else {
      throw new Error("No valid amount found");
    }
  });
  


      cy.contains("Checkout").click();
      cy.get("#country").type("India");
      cy.get(".suggestions > ul > li > a").click();
      cy.get("#checkbox2").click({ force: true });
      cy.get('input[type="submit"]').click();
      //cy.get('.alert').should('have.text','Success! Thank you! Your order will be delivered in next few weeks :-).')
      cy.get(".alert").then(function (element) {
        const actualText = element.text();
        expect(actualText.includes("Success")).to.be.true;
      });
    });
  }
);
