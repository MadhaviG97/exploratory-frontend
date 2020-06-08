
describe('Chat', () => {

    before(() => {

        const username = 'damika@gmail.com'
        const password = 'password1'

        cy.visit('/signin')
        cy.get('input[name=email]').type(username)

        // {enter} causes the form to submit
        cy.get('input[id=Password]').type(`${password}{enter}`)
        cy.wait(1500)
        cy.get('[id=chatButton').click()

    })

    it('Create a new dirrect chat', () => {

        cy.get('button[id=moreButton]').scrollIntoView().click()
        cy.get('li').contains('Start a Dirrect Chat').click()

        cy.get('button').contains('Start').should('not.be.visible')
        cy.get('button').contains('Cancel').should('be.visible')

        cy.get('input[name=researcher').type('Nimal').click()
        cy.get('li').contains('Nimal').click()
        cy.get('button').contains('Start').should('be.visible')
        cy.get('button').contains('Cancel').should('be.visible')
        cy.get('button').contains('Start').click()

        cy.get('[id=chatWindowBackButton').should('be.visible').click()

    })

    it('Create a new dirrect chat Cancel', () => {

        cy.get('button[id=moreButton]').scrollIntoView().click()
        cy.get('li').contains('Start a Dirrect Chat').click()

        cy.get('button').contains('Start').should('not.be.visible')
        cy.get('button').contains('Cancel').should('be.visible')

        cy.get('input[name=researcher').type('Nimal').click()
        cy.get('li').contains('Nimal').click()
        cy.get('button').contains('Start').should('be.visible')
        cy.get('button').contains('Cancel').should('be.visible')
        cy.get('button').contains('Cancel').click()

    })

    it('Check Dirrect Chat Messaging', () => {

        const message = "Test message 1"

        cy.get('[id=chatItem').contains('Nimal').click()

        cy.get('[id=chatWindowMoreButton').should('not.be.visible')
        cy.get('[id=chatWindowBackButton').should('be.visible')
        cy.get('[id=chatWindow').get('[id=chatWindowTopAppBar').should('contain', 'Nimal')
        cy.get('[id=chatWindow').get('[id=sendButton').should('not.be.visible')

        cy.get('[id=chatWindow').get('[id=msgBox').type(message).should('have.value', message)
        cy.get('[id=chatWindow').get('[id=sendButton').should('be.visible').click()
        cy.get('[id=chatWindow').get('[id=msgBox').should('have.value', '')
        cy.get('[id=chatWindow').get('[id=sendButton').should('not.be.visible')

        cy.get('[id=chatWindow').get('[id=msgBox').type(message).should('have.value', message)
        cy.get('[id=chatWindow').get('[id=msgBox').type('{enter}')
        
        cy.get('[id=chatWindow').get('[id=messageInfoButton]').last().click()

        cy.get('[id=messageStatusDialog]').should('contain', 'Message Status')
        cy.get('[id=messageStatusDialog]').should('contain', 'Seen Participants')
        cy.get('[id=messageStatusDialog]').should('contain', 'Delivered Participants')


        cy.get('[id=messageStatusDialog]').click(100, 100)
        cy.get('[id=chatWindowBackButton').click()

    })

})