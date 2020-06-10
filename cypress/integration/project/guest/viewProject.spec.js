describe("Chat", () => {
  before(() => {
    const username = "madhavi@gmail.com";
    const password = "123456@";

    cy.visit("/signin");
    cy.get("input[name=email]").type(username);
    cy.get("input[id=Password]").type(`${password}{enter}`);
    cy.wait(1500);
  });

  // it("Check tab content visible", () => {
  //   cy.visit("/project/viewproject/20")
  //     .get("#full-width-tab-1")
  //     .click()
  //     .should("be.visible")
  //     .wait(1000)
  //     .get("button[id=10001]")
  //     .click();
  // .wait(1000)
  // .get("#full-width-tab-2")
  // .click()
  // .should("be.visible")
  // .wait(1000)
  // .get("#full-width-tab-3")
  // .click()
  // .should("be.visible");
  // });

  // it("Check if image available image viewable", () => {
  //   cy.visit("/project/viewproject/20")
  //     .get("#full-width-tab-1")
  //     .click()
  //     .should("be.visible")
  //     .wait(1000)
  //     .get("button[id=10001]")
  //     .click();
  // .wait(1000)
  // .get("#full-width-tab-2")
  // .click()
  // .should("be.visible")
  // .wait(1000)
  // .get("#full-width-tab-3")
  // .click()
  // .should("be.visible");
  // });

  it("file upload test", () => {
    cy.visit("/project/viewproject/22")
      .get("button[id=related-images-edit]")
      .click()
      .wait(1000);

    cy.get("input[type=file]")
      .uploadFile("demo.png", "image/png")
      .get("input[type=file]")
      .uploadFile("demo.png", "image/png")
      .get("button")
      .contains("save")
      .should("be.visible")
      .click()
      .wait(1500)
      .get("button")
      .contains("CLOSE")
      .should("be.visible")
      .click();

    // cy.get("input[type=file]")
    //   .uploadFile("23.pdf", "application/pdf")
    //   .get("button")
    //   .contains("save")
    //   .should("be.visible")
    //   .click();
  });

  //   after(() => {

  //   })
});
