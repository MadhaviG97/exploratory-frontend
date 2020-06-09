// import { cy } from "date-fns/locale"

describe('Drive', () => {

    before(() => {
        cy.login();
        cy.saveLocalStorage();
      });
      
      beforeEach(() => {
        cy.restoreLocalStorage();
      });


    it('Compares two texts word by word ', () => {
        const testText1="This is pretty. Pretty but heavy."
        const testText2="This is pretty. Pretty but hurry "
        cy.visit('/document/10024/compare')
        cy.wait(2500)
        cy.get('[data-cy="text1"]').should('be.visible')
        cy.get('[data-cy="text1"]').type(testText1)
        cy.wait(2000)
        cy.get('[data-cy="text2"]').should('be.visible')
        cy.get('[data-cy="text2"]').type(testText2)
        cy.wait(1000)
        cy.get('[data-cy="text-compare"]').should('be.visible')
        cy.get('[data-cy="text-compare"]').click()
        cy.wait(2000)
        cy.get('[data-cy="display-compare"]').scrollIntoView()

        cy.wait(5000)

    })

    it('Compares two texts sentence by sentence ', () => {

        cy.wait(2500)
        cy.get('[data-cy="select-type"]').should('be.visible')
        cy.get('[data-cy="select-type"]').click()
        cy.wait(1000)
        cy.get('[data-cy="sent-sent"]').click()
        cy.wait(1000)
        cy.get('[data-cy="text-compare"]').should('be.visible')
        cy.get('[data-cy="text-compare"]').click()
        cy.wait(2000)
        cy.get('[data-cy="display-compare"]').scrollIntoView()

        cy.wait(5000)


    })

    it('Compares two texts line by line ', () => {

        cy.wait(2500)
        cy.get('[data-cy="select-type"]').should('be.visible')
        cy.get('[data-cy="select-type"]').click()
        cy.wait(1000)
        cy.get('[data-cy="line-line"]').click()
        cy.wait(1000)
        cy.get('[data-cy="text-compare"]').should('be.visible')
        cy.get('[data-cy="text-compare"]').click()
        cy.wait(2000)
        cy.get('[data-cy="display-compare"]').scrollIntoView()

        cy.wait(5000)


    })

    it('Compares two texts character by character ', () => {

        cy.wait(2500)
        cy.get('[data-cy="select-type"]').should('be.visible')
        cy.get('[data-cy="select-type"]').click()
        cy.wait(1000)
        cy.get('[data-cy="char-char"]').click()
        cy.wait(1000)
        cy.get('[data-cy="text-compare"]').should('be.visible')
        cy.get('[data-cy="text-compare"]').click()
        cy.wait(2000)
        cy.get('[data-cy="display-compare"]').scrollIntoView()

        cy.wait(5000)


    })


})