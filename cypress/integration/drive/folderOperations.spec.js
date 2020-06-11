// import { cy } from "date-fns/locale"

describe('Drive', () => {

    before(() => {
        cy.login();
        cy.saveLocalStorage();
      });
      
      beforeEach(() => {
        cy.restoreLocalStorage();
      });


    it('Creates a folder in root directory', () => {
        cy.visit('/document/10003/filemanager')
        cy.wait(2500)
        const newFolderName="Test Folder 1"
        cy.get('[data-cy="folder-dialog"]').should('be.visible')
        cy.get('[data-cy="folder-dialog"]').click()
        cy.wait(1000)
        cy.get('[id="name"]').should('be.visible')
        cy.get('input[id=name]').type(newFolderName).should('have.value', newFolderName)
        cy.get('button').contains('Create').should('be.visible')
        cy.wait(1000)
        cy.get('button').contains('Create').click()
        cy.wait(2000)
        cy.get('[data-cy="folder-created-alert"]').should('be.visible')
        cy.wait(2500)

    })

    it('Goes inside another folder ', () => {

        const newFolderName="Test Folder 2"
        cy.wait(2500)
        cy.get('[data-cy="folder-card"]').should('be.visible')
        cy.get('[data-cy="folder-card"]').eq(0).click()
        cy.wait(3500)
        
    })

    it('Creates a folder inside another folder ', () => {

        const newFolderName="Test Folder 2"
        cy.wait(2500)
        cy.get('[data-cy="folder-dialog"]').should('be.visible')
        cy.get('[data-cy="folder-dialog"]').click()
        cy.wait(2500)
        cy.get('[id="name"]').should('be.visible')
        cy.get('input[id=name]').type(newFolderName).should('have.value', newFolderName)
        cy.wait(1500)
        cy.get('button').contains('Create').should('be.visible')
        cy.get('button').contains('Create').click()
        cy.wait(2500)
        

    })

    it('Goes inside created folder ', () => {

        cy.wait(2500)
        cy.get('[data-cy="folder-card"]').should('be.visible')
        cy.get('[data-cy="folder-card"]').eq(0).click()
        cy.wait(2500)

    })

    it('Deletes a folder inside another folder ', () => {

        cy.wait(2500)
        cy.get('[data-cy="delete-folder-button"]').should('be.visible')
        cy.get('[data-cy="delete-folder-button"]').click()
        cy.get('[data-cy="confirm-delete"]').should('be.visible')
        cy.get('[data-cy="confirm-delete"]').scrollIntoView().click()
        cy.wait(2500)

    })

    

    it('Deletes a folder in root folder ', () => {

        cy.wait(3500)
        cy.get('[data-cy="delete-folder-button"]').should('be.visible')
        cy.get('[data-cy="delete-folder-button"]').click()
        cy.wait(1500)
        cy.get('[data-cy="confirm-delete"]').should('be.visible')
        cy.get('[data-cy="confirm-delete"]').click()
        cy.wait(2500)

    })

})