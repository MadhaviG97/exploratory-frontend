const { wait } = require("@testing-library/react");

describe("Create project", () => {
  before(() => {
    cy.visit("/signin");

    cy.fixture("user.json").then((user) => {
      cy.get("input[name=email]").type(user.username);
      cy.get("input[id=Password]").type(user.password);
    });
    cy.get("button")
      .contains("span", "SIGN IN")
      .trigger("mouseover")
      .wait(500)
      .click()
      .wait(1500);

    cy.visit("/project/viewproject/10001");
  });

  it("1.0 view task tracker", () => {
    cy.get("button[title=Task-Tracker]")
      .trigger("mouseover")
      .click()
      .wait(3000);
    cy.visit("/project/viewproject/10001");
  });

  it("2.0 follow project", () => {
    cy.get("button[title=follow]").trigger("mouseover").click().wait(1000);
  });

  it("3.0 view Abstract", () => {
    cy.get(".MuiBox-root-481").should("be.visible");
  });

  it("4.0 view related images", () => {
    cy.get(".MuiBox-root-507").should("be.visible");
  });

  it("5.0 Check Team", () => {
    cy.get("#full-width-tab-1")
      .click()
      .should("be.visible")
      .wait(1000)
      .get("button[id=10003]")
      .click()
      .wait(3000)
      .visit("/project/viewproject/10001");

    cy.get("#full-width-tab-1")
      .click()
      .should("be.visible")
      .wait(1000)
      .get("button[id=10002]")
      .click()
      .wait(3000)
      .visit("/project/viewproject/10001");
  });

  it("6.0 Check Comments", () => {
    cy.get("#full-width-tab-2").click().should("be.visible").wait(1000);
  });

  it("7.0 Check files", () => {
    cy.get("#full-width-tab-3").click().should("be.visible").wait(1000);
  });
});
