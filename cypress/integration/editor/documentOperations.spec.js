// import { cy } from "date-fns/locale"

describe('Drive', () => {

    before(() => {
        cy.login();
        cy.saveLocalStorage();
    });
      
    beforeEach(() => {
        cy.restoreLocalStorage();
    });
    
    it('opens created document in editor', () => {
        cy.visit('/document/10024/editorblog')
        cy.wait(1500)
        cy.get('[data-cy="document-card"]').should('be.visible')
        cy.get('[data-cy="edit-document-icon"]').should('be.visible')
        cy.get('[data-cy="edit-document-icon"]').eq(0).click()
        cy.wait(1500)
        //cy.get('[data-cy="editor-container"]').should('be.visible')

    })

    it('gets saved version and replaces editor', () => {
        cy.wait(1500)
        cy.get('[data-cy="last-saved-version"]').should('be.visible')
        cy.get('[data-cy="last-saved-version"]').click()
        cy.wait(2500)

    })

    it('saves document again', () => {
        cy.wait(1500)
        cy.get('[data-cy="save-edited"]').should('be.visible')
        cy.get('[data-cy="save-edited"]').click()
        cy.wait(500)
        cy.get('[data-cy="file-saved-alert"]').should('be.visible')
        cy.wait(500)
        cy.get('[data-cy="alert-close-icon"]').click()
        cy.get('[data-cy="file-saved-alert"]').should('not.be.visible')
        cy.wait(2500)

    })

    it('Opens document to view ', () => {
        cy.get('[data-cy="goto-blog"]').should('be.visible')
        cy.get('[data-cy="goto-blog"]').click()
        cy.wait(1500)
        cy.get('[data-cy="document-card"]').should('be.visible')
        cy.get('[data-cy="pdf-document-icon"]').eq(1).should('be.visible')
        cy.get('[data-cy="pdf-document-icon"]').eq(1).click()
        cy.wait(1500)
        cy.get('[data-cy="turn-pdf-icon"]').should('be.visible')
        cy.wait(2500)
    })

    it('Deletes the created document ', () => {
        cy.visit('/document/10024/editorblog')
        cy.wait(1500)
        cy.get('[data-cy="document-card"]').should('be.visible')
        cy.get('[data-cy="delete-document-icon"]').should('be.visible')
        cy.get('[data-cy="delete-document-icon"]').eq(0).click()
        cy.wait(1000)
        cy.get('[data-cy="delete-confirm-document-button"]').should('be.visible')
        cy.get('[data-cy="delete-confirm-document-button"]').click()
        cy.get('[data-cy="delete-success-alert"]').should('be.visible')
        cy.wait(2500)

    }) 

})
//