describe("Create project", () => {
  before(() => {
    cy.visit("/signin");

    // cy.fixture("user.json").then((user) => {
    //   cy.get("input[name=email]").type(user.username);
    //   cy.get("input[id=Password]").type(user.password);
    // });
    // cy.get("button")
    //   .contains("span", "SIGN IN")
    //   .trigger("mouseover")
    //   .wait(500)
    //   .click();

    cy.visit("/project/viewproject/24");
  });

  //   it("1.0 view apps", () => {
  //     cy.get("button[aria-label=apps]").trigger("mouseover").wait(1000).click();
  //     cy.get("button[id=app-close]").trigger("mouseover").wait(1000).click();
  //   });

  it("2.0 follow project", () => {
    cy.get("button[title=follow]").trigger("mouseover").click().wait(1000);
  });

  //   it("3.0 Unfollow project", () => {
  //     cy.get("button[aria-label=settings]")
  //       .trigger("mouseover")
  //       .wait(1000)
  //       .click();
  //   });
});
