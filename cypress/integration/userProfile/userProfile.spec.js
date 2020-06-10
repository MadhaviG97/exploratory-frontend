describe("User Profile", () => {
  const uId = 10010;
  it("visits the user profile page for userId 10010", () => {
    cy.visit(`/userprofile/${uId}`);
  });
  describe("Loading and displaying user profile sections", () => {
    beforeEach(() => {
      cy.visit(`/userprofile/${uId}`);
    });

    it("displays user data from API", () => {
      cy.request(`/userprofile/${uId}`).should((response) => {
        console.log(response);
        expect(response.status).to.eq(200);
        expect(response.body.success).to.eq(1);
        // expect(response).to.have.property('headers')
        // expect(response).to.have.property('duration')
      });
    });

    it("displays user posts data from API", () => {
      cy.request(`/userprofile/projects/posts/${uId}`).should((response) => {
        console.log(response);
        expect(response.status).to.eq(200);
        expect(response.body.success).to.eq(1);
      });
    });

    it("displays user projects data from API", () => {
      cy.request(`/userprofile/projects/${uId}`).should((response) => {
        console.log(response);
        expect(response.status).to.eq(200);
        expect(response.body.success).to.eq(1);
      });
    });

    it("fetches institutions to edit profile from API", () => {
        cy.request(`/userprofile/edit/institutions`).should((response) => {
          console.log(response);
          expect(response.status).to.eq(200);
          expect(response.body.success).to.eq(1);
        });
      });
  });
});
