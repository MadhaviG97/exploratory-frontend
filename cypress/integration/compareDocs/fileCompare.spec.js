// import { cy } from "date-fns/locale"

describe('Drive', () => {

    before(() => {
        cy.login();
        cy.saveLocalStorage();
      });
      
      beforeEach(() => {
        cy.restoreLocalStorage();
      });


    it('Compares two files word by word ', () => {
        cy.visit('/document/10001/compare')
        cy.wait(2500)
        cy.get('[data-cy="select-doc"]').should('be.visible')
        cy.get('[data-cy="select-doc"]').click()
        cy.wait(1000)
        cy.get('[data-cy="select-button1"]').should('be.visible')
        cy.get('[data-cy="select-button1"]').click()
        cy.wait(1000)
        cy.get('[data-cy="compare-file1-select"]').eq(0).scrollIntoView().should('be.visible')
        cy.get('[data-cy="compare-file1-select"]').eq(0).scrollIntoView().click()
        cy.wait(1000)
        cy.get('[data-cy="select-button2"]').should('be.visible')
        cy.get('[data-cy="select-button2"]').click()
        cy.wait(1000)
        cy.get('[data-cy="compare-file2-select"]').eq(1).scrollIntoView().should('be.visible')
        cy.get('[data-cy="compare-file2-select"]').eq(1).scrollIntoView().click()
        cy.wait(1000)
        cy.get('[data-cy="compare-confirm-button"]').should('be.visible')
        cy.get('[data-cy="compare-confirm-button"]').click()
        cy.wait(2000)
        cy.get('[data-cy="display-compare"]').scrollIntoView()

        cy.wait(10000)


    })

    it('Compares two files sentence by sentence ', () => {

        cy.wait(2500)
        cy.get('[data-cy="select-type"]').should('be.visible')
        cy.get('[data-cy="select-type"]').click()
        cy.wait(1000)
        cy.get('[data-cy="sent-sent"]').click()
        cy.wait(1000)
        cy.get('[data-cy="select-doc"]').should('be.visible')
        cy.get('[data-cy="select-doc"]').click()
        cy.wait(1000)
        cy.get('[data-cy="select-button1"]').should('be.visible')
        cy.get('[data-cy="select-button1"]').click()
        cy.wait(1000)
        cy.get('[data-cy="compare-doc1-select"]').eq(0).scrollIntoView().should('be.visible')
        cy.get('[data-cy="compare-doc1-select"]').eq(0).scrollIntoView().click()
        cy.wait(1000)
        cy.get('[data-cy="select-button2"]').should('be.visible')
        cy.get('[data-cy="select-button2"]').click()
        cy.wait(1000)
        cy.get('[data-cy="compare-doc2-select"]').eq(1).scrollIntoView().should('be.visible')
        cy.get('[data-cy="compare-doc2-select"]').eq(1).scrollIntoView().click()
        cy.wait(1000)
        cy.get('[data-cy="compare-confirm-button"]').should('be.visible')
        cy.get('[data-cy="compare-confirm-button"]').click()
        cy.wait(2000)
        cy.get('[data-cy="display-compare"]').scrollIntoView()

        cy.wait(10000)


    })

    it('Compares two files line by line ', () => {

        cy.wait(2500)
        cy.get('[data-cy="select-type"]').should('be.visible')
        cy.get('[data-cy="select-type"]').click()
        cy.wait(1000)
        cy.get('[data-cy="line-line"]').click()
        cy.wait(1000)
        cy.get('[data-cy="select-doc"]').should('be.visible')
        cy.get('[data-cy="select-doc"]').click()
        cy.wait(1000)
        cy.get('[data-cy="select-button1"]').should('be.visible')
        cy.get('[data-cy="select-button1"]').click()
        cy.wait(1000)
        cy.get('[data-cy="compare-doc1-select"]').eq(0).scrollIntoView().should('be.visible')
        cy.get('[data-cy="compare-doc1-select"]').eq(0).scrollIntoView().click()
        cy.wait(1000)
        cy.get('[data-cy="select-button2"]').should('be.visible')
        cy.get('[data-cy="select-button2"]').click()
        cy.wait(1000)
        cy.get('[data-cy="compare-file2-select"]').eq(0).scrollIntoView().should('be.visible')
        cy.get('[data-cy="compare-file2-select"]').eq(0).scrollIntoView().click()
        cy.wait(1000)
        cy.get('[data-cy="compare-confirm-button"]').should('be.visible')
        cy.get('[data-cy="compare-confirm-button"]').click()
        cy.wait(2000)
        cy.get('[data-cy="display-compare"]').scrollIntoView()

        cy.wait(8000)


    })

    it('Compares two files character by character ', () => {

        cy.wait(2500)
        cy.get('[data-cy="select-type"]').should('be.visible')
        cy.get('[data-cy="select-type"]').click()
        cy.wait(1000)
        cy.get('[data-cy="char-char"]').click()
        cy.wait(1000)
        cy.get('[data-cy="select-doc"]').should('be.visible')
        cy.get('[data-cy="select-doc"]').click()
        cy.wait(1000)
        cy.get('[data-cy="select-button1"]').should('be.visible')
        cy.get('[data-cy="select-button1"]').click()
        cy.wait(1000)
        cy.get('[data-cy="compare-file1-select"]').eq(0).scrollIntoView().should('be.visible')
        cy.get('[data-cy="compare-file1-select"]').eq(0).scrollIntoView().click()
        cy.wait(1000)
        cy.get('[data-cy="select-button2"]').should('be.visible')
        cy.get('[data-cy="select-button2"]').click()
        cy.wait(1000)
        cy.get('[data-cy="compare-file2-select"]').eq(0).scrollIntoView().should('be.visible')
        cy.get('[data-cy="compare-file2-select"]').eq(0).scrollIntoView().click()
        cy.wait(1000)
        cy.get('[data-cy="compare-confirm-button"]').should('be.visible')
        cy.get('[data-cy="compare-confirm-button"]').click()
        cy.wait(2000)
        cy.get('[data-cy="display-compare"]').scrollIntoView()

        cy.wait(4000)


    })


})