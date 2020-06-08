describe('Chat', () => {

    beforeEach(() => {

        const username = 'damika@gmail.com'
        const password = 'password1'

        cy.visit('/signin')
        cy.get('input[name=email]').type(username)

        // {enter} causes the form to submit
        cy.get('input[id=Password]').type(`${password}{enter}`)
        cy.wait(1500)
        cy.get('[id=chatButton').click()

    })

    it('Group Chat Messaging', () => {

        const message = "Test message 1"

        cy.get('[id=chatItem').contains('Test Group 1').click()

        cy.get('[id=chatWindowMoreButton').should('be.visible')
        cy.get('[id=chatWindowBackButton').should('be.visible')
        cy.get('[id=chatWindow').get('[id=chatWindowTopAppBar').should('contain', 'Test Group 1')
        cy.get('[id=chatWindow').get('[id=sendButton').should('not.be.visible')

        cy.get('[id=chatWindow').get('[id=msgBox').type(message).should('have.value', message)
        cy.get('[id=chatWindow').get('[id=sendButton').should('be.visible').click()
        cy.get('[id=chatWindow').get('[id=msgBox').should('have.value', '')
        cy.get('[id=chatWindow').get('[id=sendButton').should('not.be.visible')

        cy.get('[id=chatWindow').get('[id=messageInfoButton]').last().click()

        cy.get('[id=messageStatusDialog]').should('contain', 'Message Status')
        cy.get('[id=messageStatusDialog]').should('contain', 'Seen Participants')
        cy.get('[id=messageStatusDialog]').should('contain', 'Delivered Participants')


        cy.get('[id=messageStatusDialog]').click(100, 100)
        cy.get('[id=chatWindowBackButton').click()

    })

    it('Check Group Chat Info Update', () => {

        const longText = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
        cy.get('[id=chatItem').contains('Test Group 1').click()


        cy.get('[id=chatWindowMoreButton').click()
        cy.get('li').contains('Settings').click()

        cy.get('[id=chatWindowSettingsDialog]').should('contain', 'Participants')
        cy.get('[id=chatWindowSettingsDialog]').should('contain', 'Group Information')
        cy.get('button').contains('Update').should('not.be.visible')
        cy.get('button').contains('Cancel').should('be.visible')

        cy.get('[id=name').type('Add to name')
        cy.get('button').contains('Update').should('be.visible')
        cy.get('button').contains('Cancel').click()


        cy.get('[id=chatWindowMoreButton]').click()
        cy.get('li').contains('Settings').click()

        cy.get('button').contains('Update').should('not.be.visible')
        cy.get('[id=description').type('change description')
        cy.get('button').contains('Update').should('be.visible')
        cy.get('button').contains('Update').click()
        cy.get('[id=alert-dialog-title]').should('contain', 'Successfully Updated!')
        cy.get('button').contains('OK').click()
        cy.get('button').contains('Update').should('not.be.visible')
        cy.get('[id=name').type(longText)
        cy.get('[id=name-helper-text]').should('contain', '"Group Name" length must be less than or equal to 255 characters long')
        cy.get('button').contains('Update').should('not.be.visible')
        cy.get('button').contains('Cancel').click()

        cy.get('[id=chatWindowMoreButton]').click()
        cy.get('li').contains('Settings').click()
        cy.get('[id=name').clear()
        cy.get('button').contains('Update').should('not.be.visible')
        cy.get('button').contains('Cancel').click()

        cy.get('[id=chatWindowMoreButton]').click()
        cy.get('li').contains('Settings').click()
        cy.get('[id=description').clear()
        cy.get('button').contains('Update').should('not.be.visible')
        cy.get('button').contains('Cancel').click()
        cy.get('[id=chatWindowBackButton').click()

    })

    it('Check Group Chat add more participants', () => {

        const longText = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
        cy.get('[id=chatItem').contains('Test Group 1').click()

        cy.get('[id=chatWindowMoreButton').click()
        cy.get('li').contains('Settings').click()

        cy.get('[id=addMoreParticipantsButton]').click()
        cy.get('input[id=fixed-participant-demo').type('Dummy User1').click()
        cy.get('li').get('[id=participantItem]').first().click()
        cy.get('button').contains('Add').click()
        cy.get('[id=alert-dialog-title]').should('contain', 'Successfully added the participants')
        cy.get('button').contains('OK').click()
        cy.get('button').contains('Cancel').click()
    })

})