/* eslint-disable jest/no-focused-tests */
describe('The Albums Page', function() {
  const email = Cypress.env('email')
  const password = Cypress.env('password')
  // const username = Cypress.env('username')
  const title = 'Luo otsikko'
  const content = 'Luo sisältöä.'

  context('open public pages', function() {
    it('get all albums', function() {
      cy.server()
      cy.route('albums', 'fixture:albums').as('getAlbums')
      cy.visit('/albums')
      cy.wait('@getAlbums')
      cy.get('h2').should('contain', 'Albumit')
      cy.get('[data-cy=albumListItem]').its('length').should('eq', 3)
    })

    it('get one album', function() {
      cy.visit('/albums/1')

      cy.get('[data-cy=album]').its('length').should('eq', 1)
    })
  })

  context('logged in user', function() {
    beforeEach(function() {
      cy.loginByForm(email, password)
      cy.visit('/albums')
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
      cy.visit('/albums')
    })

    after(function() {
      cy.get('[data-cy=delete]').first().as('firstDeleteButton')
      cy.get('@firstDeleteButton').click()
      cy.visit('/albums')
    })

    it('can add new album', function() {
      cy.get('[data-cy=addNewAlbum]').click()
      cy.get('[data-cy=title]').type(title)
      cy.get('[data-cy=content]').type(content)
      cy.get('form').submit()
      cy.get('[data-cy=albumListItem]').should('contain', title)
    })
  })

  context('update album', function() {
    before(function() {
      cy.loginByForm(email, password)
      cy.visit('/albums')
    })

    beforeEach(function() {
      cy.get('[data-cy=addNewAlbum]').click()
      cy.get('[data-cy=title]').type(title)
      cy.get('[data-cy=content]').type(content)
      cy.get('form').submit()
      cy.visit('/albums')
    })

    after(function() {
      cy.get('[data-cy=delete]').first().click()
    })

    it('can update album', function() {
      const newType = 'Updated'
      cy.get('[data-cy=albumListItem] .edit').first().click()
      cy.get('[type="title"]').clear()
      cy.get('[data-cy=title]').type(newType)
      cy.get('[data-cy=content]').type(content)
      cy.get('form').submit()
      cy.get('[data-cy=success-message]').should('be.visible')
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(3000)
      cy.get('[data-cy=header]').first().should('contain', newType)

    })
  })

  context('create and delete album', function() {
    before(function() {
      cy.loginByForm(email, password)
      cy.visit('/albums')
    })
    beforeEach(function() {
      cy.get('[data-cy=addNewAlbum]').click()
      cy.get('[data-cy=title]').type(title)
      cy.get('[data-cy=content]').type(content)
      cy.get('form').submit()
      cy.visit('/albums')
    })

    it('delete last created album', function() {
      cy.get('[data-cy=delete]').first().as('firstDeleteButton')
      cy.get('@firstDeleteButton').click()
      cy.get('[data-cy=albumListItem]').first().as('firstItem')
      cy.get('@firstItem').should('not.contain', title)
    })
  })

  context('logged out user', function() {
    beforeEach(function() {
      cy.visit('/albums')
    })

    it('can not see form', function() {
      cy.get('[data-cy=addNewAlbum]').should('not.be.visible')
    })

    // it.only('can not see update button', function() {
    //   cy.get('[data-cy=update]').should('not.be.visible')
    // })

    it('can not see delete button', function() {
      cy.get('[data-cy=delete]').should('not.be.visible')
    })
  })

})

// it('get one album', function() {
//   // cy.route('albums/:id', 'fixture:album').as('getAlbum')
//   cy.route('albums/*', 'fixture:album').as('getAlbum')
//   cy.visit('http://localhost:3000/albums/1')
//   cy.wait('@getAlbum')
//   cy.get('[data-cy=album]').its('length').should('eq', 1)
// })
