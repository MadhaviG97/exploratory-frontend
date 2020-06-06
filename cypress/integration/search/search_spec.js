describe('Search', () => {

    before(() => {

        const username = 'damika@gmail.com'
        const password = 'password1'

        cy.visit('/signin')

        cy.get('input[name=email]').type(username)

        // {enter} causes the form to submit
        cy.get('input[id=Password]').type(`${password}{enter}`)


    })
    it('Search Institutions', () => {
        const searchString = 'Damika'
        cy.get('input[name=searchString]').type(searchString).should('have.value', searchString)
        cy.get('button[aria-label=search').click()
        cy.get('button').get('span').contains('Projects').click()
        cy.get('button').get('span').contains('Institutions').click()
    })

    it('sets auth cookie when logging in via form submission', function () {
        // destructuring assignment of the this.currentUser object


        // cy.request('POST', '/signin', {
        //     username,
        //     password
        //   })

        //     cy.visit('/')










        // cy.visit('/chat')
        // // we should be redirected to /dashboard
        // cy.url().should('include', '/dashboard')

        // // our auth cookie should be present
        // cy.getCookie('your-session-cookie').should('exist')

        // // UI should reflect this user being logged in
        // cy.get('h1').should('contain', 'jane.lane')
    })

    // it('successfully loads', () => {
    //   cy.visit('/') // change URL to match your dev URL
    // })
})