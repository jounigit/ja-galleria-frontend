/* eslint-disable jest/no-focused-tests */
describe('The Home Page', function() {
  const email = Cypress.env('email')
  const password = Cypress.env('password')
  const username = Cypress.env('username')

  context('open home page', function() {
    beforeEach(function() {
      cy.visit('/')
      cy.get('[data-cy=menu] > .container > .item').as('menuLinks')
    })

    it('can see menu links', function() {
      // cy.get('@menuLinks').its('length').should('eq', 4)
      cy.get('@menuLinks').should('contain', 'Home')
      cy.get('@menuLinks').should('contain', 'Categories')
      cy.get('@menuLinks').should('contain', 'Albums')
      cy.get('@menuLinks').should('contain', 'Pictures')
      cy.get('@menuLinks').should('contain', 'Log in')
      cy.get('@menuLinks').should('contain', 'Sign Up')
    })
  })

  context('logged in user', function() {
    beforeEach(function() {
      cy.visit('/')
      cy.loginByForm(email, password)
      cy.visit('/')
      cy.get('[data-cy=menu] > .container > .item').as('menuLinks')
    })

    it('can not see login link', function() {
      cy.get('@menuLinks').should('not.contain', 'Log in')
    })

    it('can see logout link', function() {
      cy.get('@menuLinks').should('contain', 'Logout - ' + username)
    })
  })


})