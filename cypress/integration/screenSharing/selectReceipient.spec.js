// import { cy } from "date-fns/locale"

describe('Drive', () => {

    before(() => {
        cy.login();
        cy.saveLocalStorage();
    });
      
    beforeEach(() => {
        cy.restoreLocalStorage();
    });


    it('Selects a receipient and start sharing', () => {
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.visit('/screenshare/10001/send')
        cy.wait(1500)
        cy.get('[data-cy="connect-button"]').should('be.visible')
        cy.get('[data-cy="connect-button"]').click()
        cy.wait(1000)
        cy.get('[data-cy="receipient-select"]').should('be.visible')
        cy.wait(500)
        cy.get('[data-cy="receipient-select"]').click()
        cy.wait(1000)
        cy.get('[data-cy="receipients-menu"]').should('be.visible')
        cy.get('[data-cy="receipients-menu"]').eq(0).click()
        cy.wait(500)
        cy.get('[data-cy="button-click-dialog"]').click()
    })
})
//