/* eslint-disable jest/no-focused-tests */
describe('The Categories Page', function() {
  const email = Cypress.env('email')
  const password = Cypress.env('password')
  // // const username = Cypress.env('username')
  const title = 'Category test'
  const content = 'Test content.'

  context('open public pages', function() {
    before(function() {
      cy.server()
      cy.route('categories', 'fixture:categories').as('getCategories')
      cy.visit('/categories')
      cy.wait('@getCategories')
    })

    it('get all categories', function() {
      cy.get('h2').should('contain', 'Kategoriat')
      cy.get('[data-cy=category]').its('length').should('eq', 2)
    })

    it('hidden content can be opened', function() {
      cy.get('[data-cy=linkable]').first().click({ force: true })
    })
  })

  context('logged in user', function() {
    before(function() {
      cy.loginByForm(email, password)
      cy.visit('/categories')
      cy.get('.CategoryList button:first').as('createButton')
    })

    it('can see form', function() {
      cy.get('@createButton').should('contain', 'new category')
      cy.get('@createButton').click()
      cy.get('[data-cy=title]').should('be.visible')
      cy.get('[data-cy=content]').should('be.visible')
    })

    it('can see update button', function() {
      cy.get('[data-cy=category] .edit').should('be.visible')
    })

    it('can see delete button', function() {
      cy.get('[data-cy=delete]').should('be.visible')
    })

    // it('title is required', function() {
    //   cy.get('[data-cy=addCategory]').click()
    //   cy.get('input[name=content]').type('content{enter}')
    //   cy.get('[data-cy=error-message]').should('be.visible')
    //   cy.get('[data-cy=error-message]').should('contain', 'title is required!')
    // })
  })

  context('create category', function() {
    before(function() {
      cy.loginByForm(email, password)
      cy.visit('/categories')
    })

    after(function() {
      cy.get('[data-cy=delete]').last().click()
    })

    it.only('can add new category', function() {
      cy.get('.CategoryList button:first').as('createButton')
      cy.get('@createButton').click()
      cy.get('[data-cy=title]').type(title)
      cy.get('[data-cy=content]').type(content)
      cy.get('form').submit()
      cy.get('[data-cy=category]').should('contain', title)
    })
  })

  context('update category', function() {
    before(function() {
      cy.loginByForm(email, password)
      cy.visit('/categories')
    })

    beforeEach(function() {
      cy.get('[data-cy=addCategory]').click()
      cy.get('[data-cy=title]').type(title)
      cy.get('[data-cy=content]').type(content)
      cy.get('form').submit()
      cy.visit('/categories')
    })

    after(function() {
      cy.get('[data-cy=delete]').last().click()
    })

    it('can update category', function() {
      const newType = 'Updated'
      cy.get('[data-cy=update]').last().click()
      // cy.get('@lasttUpdateButton').click()
      cy.get('[type="title"]').clear()
      cy.get('[data-cy=title]').type(newType)
      cy.get('[data-cy=content]').type(content)
      cy.get('form').submit()
      cy.get('[data-cy=header]').last().should('contain', newType)

    })
  })

  context('create and delete category', function() {
    before(function() {
      cy.loginByForm(email, password)
      cy.visit('/categories')
    })
    beforeEach(function() {
      cy.get('[data-cy=addCategory]').click()
      cy.get('[data-cy=title]').type(title)
      cy.get('[data-cy=content]').type(content)
      cy.get('form').submit()
      cy.visit('/categories')
    })

    it('delete last created categories', function() {
      cy.get('[data-cy=delete]').last().as('lastDeleteButton')
      cy.get('@lastDeleteButton').click()
      cy.get('[data-cy=category]').last().as('lastItem')
      cy.get('@lastItem').should('not.contain', title)
    })
  })

})
