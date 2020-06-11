describe("Forum", () => {
  it("visits the forum page", () => {
    cy.visit("/forum");
  });
  describe("Loading and displaying forum data", () => {
    beforeEach(() => {
      cy.visit("/forum");
    });

    it("displays questions from API", () => {
      cy.request(`/forum/questions`).should((response) => {
        console.log(response);
        expect(response.status).to.eq(200);
        expect(response.body.success).to.eq(1);
        // expect(response).to.have.property('headers')
        // expect(response).to.have.property('duration')
      });
    });

    it("displays posted answers for the questions from API", () => {
      cy.request(`/forum/answers`).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.success).to.eq(1);
      });
    });

    it("displays all users section by loading all users from API", () => {
      cy.request(`/forum/users`).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.success).to.eq(1);
      });
    });

    it("displays freequent users section by loading all frequent users from API", () => {
      cy.request(`/forum/frequsers`).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.success).to.eq(1);
      });
    });

    it("displays popular questions section by loading all rated questions from API", () => {
      cy.request(`/forum/popularquestions`).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.success).to.eq(1);
      });
    });

    it("displays popular answers section by loading all rated answers from API", () => {
      cy.request(`/forum/popularanswers`).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.success).to.eq(1);
      });
    });

    it("displays likes for questions by loading likes from API", () => {
      cy.request(`/forum/questionlikes`).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.success).to.eq(1);
      });
    });

    it("displays likes for answers by loading likes from API", () => {
      cy.request(`/forum/answerlikes`).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.success).to.eq(1);
      });
    });
  });
});
