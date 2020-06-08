// import { cy } from "date-fns/locale"

describe('Drive', () => {

    before(() => {
        cy.login();
        cy.saveLocalStorage();
    });
      
    beforeEach(() => {
        cy.restoreLocalStorage();
    });


    it('Creates a document', () => {
        cy.visit('/document/10024/create')
        cy.wait(1500)
        const content = 'Adding an alias using .as() to stubs makes them easier to identify in error messages and Cypress’s command log.'
        const newDocumentName = 'Test Document'
        cy.get('[data-cy="quill-editor"]').should('be.visible')
        cy.get('[data-cy="quill-editor"]').type(content)
        cy.get('[data-cy="create-button"]').should('be.visible')
        cy.wait(1000)
        cy.get('[data-cy="create-button"]').click()
        cy.wait(1000)
        cy.get('[data-cy="document-dialog"]').should('be.visible')
        cy.get('input[id=name]').type(newDocumentName).should('have.value', newDocumentName)
        cy.wait(1000)
        cy.get('[data-cy="button-confirm-create"]').click()
        cy.wait(1000)
        cy.get('[data-cy="create-success-alert"]').should('be.visible')
        cy.wait(2500)
        
    })

    it('Deletes the created document ', () => {

        cy.wait(2500)
        cy.get('[data-cy="delete-folder-button"]').should('be.visible')
        cy.get('[data-cy="delete-folder-button"]').click()
        cy.get('[data-cy="confirm-delete"]').should('be.visible')
        cy.get('[data-cy="confirm-delete"]').click()
        cy.wait(2500)

    })

    

})
//