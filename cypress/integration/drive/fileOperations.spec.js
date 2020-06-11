// import { cy } from "date-fns/locale"

describe('Drive', () => {

    before(() => {
        cy.login();
        cy.saveLocalStorage();
      });
      
    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it('Share or not share file with public', () => {

        cy.visit('/document/10001/filemanager')
        cy.wait(4500)
        cy.get('[data-cy="card"]').should('be.visible')
        cy.get('[data-cy="icon-button"]').eq(0).click()
        cy.get('[id="simple-menu"]').should('be.visible')
        cy.get('[data-cy="share"]').should('be.visible')
        cy.get('[data-cy="share"]').click()
        cy.wait(500)
        cy.get('[data-cy="share-alert"]').should('be.visible')
        cy.wait(2500)
    })

    it('Download a file', () => {

        cy.wait(2500)
        cy.get('[data-cy="card"]').should('be.visible')
        cy.get('[data-cy="icon-button"]').eq(0).click()
        cy.get('[id="simple-menu"]').should('be.visible')
        cy.get('[data-cy="download"]').should('be.visible')
        cy.get('[data-cy="download"]').click()
        cy.server();
        //to stop file from really downloading
        cy.route({
        url: '/foo',
        status: 304,
        response: '',
        }).as('foo');

    })

})
//