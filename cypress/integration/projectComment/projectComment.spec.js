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

  it("1.0 Add Comments", () => {
    cy.get("#full-width-tab-2").click().should("be.visible").wait(1000);
    cy.get("button")
      .contains("span", "New Comment")
      .trigger("mouseover")
      .wait(1500)
      .click()
      .get("textarea[id=name]")
      .type("This is a new comment!")
      .wait(1500)
      .get("button")
      .contains("span", "Post")
      .click()
      .wait(1500)
      .get("button[title=Close]")
      .click()
      .wait(1500)
      .get("div[aria-controls=panel4bh-content]")
      .first()
      .click()
      .wait(1500)
      .get("button[aria-label=add]")
      .first()
      .click()
      .wait(1500)
      .get("textarea[id=name]")
      .type("This is a new reply to the comment!")
      .wait(1500)
      .get("button")
      .contains("span", "Post")
      .click()
      .wait(1500)
      .get('button[aria-label="edit"]')
      .first()
      .click()
      .wait(1500)
      .get("textarea[id=name]")
      .type("EDITED! ")
      .wait(1500)
      .get("button")
      .contains("span", "Post")
      .click()
      .wait(1500)
      .get('button[aria-label="delete"]')
      .first()
      .click()
      .wait(1500)
      .get("button")
      .contains("span", "Delete")
      .click()
      .wait(1500)
      .get("div[aria-controls=panel4bh-content]")
      .first()
      .click()
      .wait(1500)
      .get("div[aria-controls=panel4bh-content]")
      .first()
      .click()
      .wait(1500)
      .get("div[aria-controls=panel4bh-content]")
      .first()
      .click();
  });
});
