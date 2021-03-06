/* eslint-disable jest/no-focused-tests */
describe('The Albums Page', function() {
  const email = Cypress.env('email')
  const password = Cypress.env('password')
  // const username = Cypress.env('username')
  const title = 'Luo otsikko'
  const content = 'Luo sisältöä.'

  context('logged in user', function() {
    beforeEach(function() {
      cy.loginByForm(email, password)
      cy.visit('/admin/albums')
      cy.get('.AlbumList button:first').as('createButton')
    })

    it('can see form', function() {
      cy.get('@createButton').should('contain', 'new album')
      cy.get('@createButton').click()
      cy.get('[data-cy=title]').should('be.visible')
      cy.get('[data-cy=content]').should('be.visible')
      cy.get('label').should('contain', 'category')
    })

    it('can see delete button', function() {
      cy.get('[data-cy=delete]').should('be.visible')
    })

    it('can see update button', function() {
      cy.get('[data-cy=albumListItem] .edit').should('be.visible')
    })

    it('title is required', function() {
      cy.get('@createButton').click()
      cy.get('textarea[name=content]').type('content')
      cy.get('form').submit()
      cy.get('[data-cy=error-message]').should('be.visible')
      cy.get('[data-cy=error-message]').should('contain', 'title is required!')
    })
  })

  context('create album', function() {
    before(function() {
      cy.loginByForm(email, password)
      cy.visit('/admin/albums')
    })

    after(function() {
      cy.get('[data-cy=delete]').first().as('firstDeleteButton')
      cy.get('@firstDeleteButton').click()
      cy.visit('/admin/albums')
    })

    it('can add new album', function() {
      cy.get('[data-cy=addNewAlbum]').click()
      cy.get('[data-cy=title]').type(title)
      cy.get('[data-cy=content]').type(content)
      cy.get('form').submit()
      cy.visit('/admin/albums')
      cy.get('[data-cy=albumListItem]').should('contain', title)
    })
  })

  context('update album', function() {
    before(function() {
      cy.loginByForm(email, password)
      cy.createAlbum('Album', 'create by command')
    })

    after(function() {
      cy.get('[data-cy=delete]').first().as('firstDeleteButton')
      cy.get('@firstDeleteButton').click()
    })

    it('can update album', function() {
      const newType = 'Updated'
      cy.get('[data-cy=albumListItem] .edit').first().as('firstUpdateButton')
      cy.get('@firstUpdateButton').click()
      cy.get('[type="title"]').clear()
      cy.get('[data-cy=title]').type(newType)
      cy.get('[data-cy=content]').type(content)
      cy.get('select').find('option').first()
      cy.get('form').submit()
      cy.get('[data-cy=success-message]').should('be.visible')
      cy.visit('/admin/albums')
    })
  })

  context('create and delete album', function() {
    before(function() {
      cy.loginByForm(email, password)
      cy.createAlbum('Album', 'delete last album')
    })

    it('delete last created album', function() {
      cy.get('[data-cy=delete]').first().as('firstDeleteButton')
      cy.get('@firstDeleteButton').click()
      cy.get('[data-cy=albumListItem]').first().as('firstItem')
      cy.get('@firstItem').should('not.contain', title)
    })
  })

})
