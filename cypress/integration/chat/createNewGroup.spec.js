// import { cy } from "date-fns/locale"

describe("Chat", () => {
  before(() => {
    const username = "damika@gmail.com";
    const password = "123456@";

    cy.visit("/signin");
    cy.get("input[name=email]").type(username);

    // {enter} causes the form to submit
    cy.get("input[id=Password]").type(`${password}{enter}`);
    cy.get('button').contains('SIGN IN').click()
    cy.wait(2500);
    cy.get("[id=chatButton").click();
  });

  // it('Create new group', () => {

  //     const newGroupName="Test Group 1"
  //     const newDescription="new Test Description"
  //     cy.get('button[id=moreButton]').scrollIntoView().click()
  //     cy.get('li').contains('Create a New Group').click()
  //     cy.get('input[id=name]').type(newGroupName).should('have.value', newGroupName)
  //     cy.get('[id=description]').type(newDescription).should('have.value', newDescription)
  //     // cy.get('button').contains('Create').click()

  //     cy.get('div[id=alert-dialog-title').get('h2').should('contain','Successfully Created the Group')

  //     cy.get('button').contains('OK').click()
  // })

  it("Create new group select more participants", () => {
    const newGroupName = "Test Group 1";
    const newDescription = "new Test Description";
    cy.get("button[id=moreButton]").scrollIntoView().click();
    cy.get("li").contains("Create a New Group").click();

    cy.get("button").contains("Create").should("not.be.visible");
    cy.get("button").contains("Cancel").should("be.visible");
    cy.get("input[id=name]")
      .type(newGroupName)
      .should("have.value", newGroupName);
    cy.get("button").contains("Create").should("not.be.visible");
    cy.get("[id=description]")
      .type(newDescription)
      .should("have.value", newDescription);
    cy.get("button").contains("Create").should("be.visible");

    cy.get("input[name=participants").click();
    cy.get('[type="checkbox"]').first().check();

    cy.get("button").contains("Create").click();

    cy.get("div[id=alert-dialog-title")
      .get("h2")
      .should("contain", "Successfully Created the Group");
    cy.get("button").contains("OK").click();
  });

  //       cy.get('input[name=participants').click()
  //       // cy.wait(1000)
  //       // cy.get('[type="checkbox"]').first().check()  
  //       cy.get('li').get('[id=participantItem]').first().click({waitForAnimations: false})
  //       cy.get('button').contains('Create').click()

  //   cy.get("input[id=name]").clear();
  //   cy.get("button").contains("Create").should("not.be.visible");
  //   cy.get("[id=name-helper-text]").should(
  //     "contain",
  //     '"Group Name" is not allowed to be empty'
  //   );
  //   cy.get("input[id=name]")
  //     .type(newGroupName)
  //     .should("have.value", newGroupName);

  //   cy.get("button").contains("Create").should("be.visible");

  //   cy.get("[id=description]").clear();
  //   cy.get("button").contains("Create").should("not.be.visible");
  //   cy.get("[id=description-helper-text]").should(
  //     "contain",
  //     '"Description" is not allowed to be empty'
  //   );
  //   cy.get("button").contains("Cancel").click();
  // });

  it("Create new group check for invalid inputs", () => {
    const newGroupName =
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.';
    cy.get("button[id=moreButton]").scrollIntoView().click();
    cy.get("li").contains("Create a New Group").click();
    cy.get("input[id=name]")
      .type(newGroupName)
      .should("have.value", newGroupName);
    cy.get("[id=name-helper-text]").should(
      "contain",
      '"Group Name" length must be less than or equal to 255 characters long'
    );
    cy.get("button").contains("Cancel").click();
  });

  it("Create new group check for long description", () => {
    const newDescription =
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.';
    cy.get("button[id=moreButton]").scrollIntoView().click();
    cy.get("li").contains("Create a New Group").click();

    cy.get("[id=description]")
      .type(newDescription)
      .should("have.value", newDescription);
    cy.get("button").contains("Cancel").click();
  });
});
