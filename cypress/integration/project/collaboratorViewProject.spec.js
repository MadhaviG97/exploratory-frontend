const { wait } = require("@testing-library/react");

describe("Create project", () => {
  before(() => {
    cy.visit("/signin");

    cy.fixture("collaborator.json").then((user) => {
      cy.get("input[name=email]").type(user.username);
      cy.get("input[id=Password]").type(user.password);
    });
    cy.get("button")
      .contains("span", "SIGN IN")
      .trigger("mouseover")
      .wait(500)
      .click()
      .wait(1500);

    cy.visit("/project/viewproject/10001").wait(2000);
  });

  //   it("1.0 view apps", () => {
  //     cy.get("button[aria-label=apps]")
  //       .scrollIntoView()
  //       .trigger("mouseover")
  //       .wait(1000)
  //       .click();
  //     cy.get("button[id=app-close]")
  //       .scrollIntoView()
  //       .trigger("mouseover")
  //       .wait(1000)
  //       .click();
  //   });

  //   it("2.0 follow project", () => {
  //     cy.get("button[title=follow]")
  //       .scrollIntoView()
  //       .trigger("mouseover")
  //       .click()
  //       .wait(1000);
  //   });

  //   it("3.0 view Abstract", () => {
  //     cy.get("div")
  //       .contains("div", "Abstract")
  //       .scrollIntoView()
  //       .should("be.visible");
  //   });

  //   it("3.0 edit Abstract", () => {
  //     cy.fixture("collaborator.json").then((data) => {
  //       cy.get("div")
  //         .contains("div", "Abstract")
  //         .scrollIntoView()
  //         .get('button[id="abstract-edit"]')
  //         .click()
  //         .get('textarea[id="outlined-multiline-static"]')
  //         .clear()
  //         .type(data.abstract)
  //         .get("button")
  //         .contains("span", "SUBMIT")
  //         .wait(1500)
  //         .click();
  //     });
  //   });

  it("4.0 view related images", () => {
    cy.get("div")
      .contains("div", "Related Images")
      .scrollIntoView()
      .should("be.visible");
  });

  it("4.1 edit related images", () => {
    cy.get('button[id="related-images-edit"]')
      .click()
      .wait(1500)
      .get(".dzu-previewButton")
      .click()
      .wait(1500)
      .get("input[type=file]")
      .uploadFile("demo.png", "image/png")
      .wait(1000)
      .get("input[type=file]")
      .uploadFile("demo.png", "image/png")
      .wait(1000)
      .get("button")
      .contains("save")
      .should("be.visible")
      .click()
      .wait(1500)
      .visit("/project/viewproject/10001");
  });

  //   it("4.0 view final paper", () => {
  //     cy.get('button[id="final-paper-edit"]')
  //       .scrollIntoView()
  //       .should("be.visible");
  //   });
  //   it("5.0 Check Team", () => {
  //     cy.get("#full-width-tab-1")
  //       .click()
  //       .should("be.visible")
  //       .wait(1000)
  //       .get("button[id=10003]")
  //       .click()
  //       .wait(3000)
  //       .visit("/project/viewproject/10001");

  //     cy.get("#full-width-tab-1")
  //       .click()
  //       .should("be.visible")
  //       .wait(1000)
  //       .get("button[id=10002]")
  //       .click()
  //       .wait(3000)
  //       .visit("/project/viewproject/10001");
  //   });

  //   it("6.0 Check Comments", () => {
  //     cy.get("#full-width-tab-2").click().should("be.visible").wait(1000);
  //   });

  //   it("7.0 Check files", () => {
  //     cy.get("#full-width-tab-3").click().should("be.visible").wait(1000);
  //   });
});
