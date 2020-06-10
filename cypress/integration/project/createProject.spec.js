describe("Create project", () => {
  before(() => {
    const username = "madhavi@gmail.com";
    const password = "123456@";

    cy.visit("/signin");
    cy.get("input[name=email]").type(username);
    cy.get("input[id=Password]").type(`${password}{enter}`);
    cy.get("button")
      .contains("span", "SIGN IN")
      .trigger("mouseover")
      .wait(500)
      .click();

    cy.get('a[href="/project/createproject"]')
      .trigger("mouseover")
      .wait(1000)
      .click();
  });

  it("1.0 Proceed without any field", () => {
    // click create
    cy.get("button")
      .contains("span", "create project")
      .trigger("mouseover")
      .wait(1000)
      .click();
  });

  it("1.1 Proceed only with title field", () => {
    cy.fixture("project.json").then((project) => {
      cy.get("input[id=title]").type(project.title);
      // click create
      cy.get("button")
        .contains("span", "create project")
        .trigger("mouseover")
        .wait(1000)
        .click();
    });
  });

  it("1.2 Proceed only with title and description field", () => {
    cy.fixture("project.json").then((project) => {
      cy.get("input[id=description]").type(project.description);

      // click create
      cy.get("button")
        .contains("span", "create project")
        .trigger("mouseover")
        .wait(1000)
        .click();
    });
  });

  it("1.3 Proceed only with title, description, collaborators field", () => {
    // select collaborators
    cy.get("input[id=collaborators]")
      .click()
      .get("li[id=collaborators-option-1]")
      .within(() => {
        cy.get("input[type=checkbox]").check();
      });
    cy.get("input[id=collaborators]")
      .click()
      .get("li[id=collaborators-option-2]")
      .within(() => {
        cy.get("input[type=checkbox]").check();
      });

    // click create
    cy.get("button")
      .contains("span", "create project")
      .trigger("mouseover")
      .wait(1000)
      .click();
  });

  it("1.4 Valid project creation", () => {
    // select tags
    cy.get("input[id=tags]")
      .click()
      .get("li[id=tags-option-0]")
      .within(() => {
        cy.get("input[type=checkbox]").check();
      });
    // click create
    cy.get("button")
      .contains("span", "create project")
      .trigger("mouseover")
      .wait(1000)
      .click();
  });
});
