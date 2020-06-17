describe("Task Tracker", () => {
    const pId = 10011;
    it("visits the task tracker page for project Id 10011", () => {
      cy.visit(`/project/tasktracker/${pId}`);
    });

    describe("Loading and displaying task tracker sections", () => {
      beforeEach(() => {
        cy.visit(`/project/tasktracker/${pId}`);
      });
  
      it("displays tasks from API", () => {
        cy.request(`/project/tasktracker/tasks/${pId}`).should((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.success).to.eq(1);
          // expect(response).to.have.property('headers')
          // expect(response).to.have.property('duration')
        });
      });

      it("displays comments from API", () => {
        cy.request(`/project/tasktracker/comments/${pId}`).should((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.success).to.eq(1);
        });
      });
    });
});