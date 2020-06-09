// import { cy } from "date-fns/locale"

describe('Drive', () => {

    before(() => {
        cy.login();
        cy.saveLocalStorage();
    });
      
    beforeEach(() => {
        cy.restoreLocalStorage();
    });


    it('checks receipient state', () => {
        
        cy.visit('/screenshare/10024/receive')
        cy.wait(1500)
        cy.get('[data-cy="screen-video"]').should('be.visible')
        cy.get('[data-cy="not-yet-message"]').should('be.visible')
        cy.get('[data-cy="share-message"]').should('not.be.visible')
    })
})
//