describe('The Home Page', function() {
  beforeEach(function() {
    cy.visit('/')
  })

  it('successfully loads home page', function() {
    cy.get('[data-cy=menu] a').its('length').should('eq', 6)
    cy.get('[href="/categories"]').should('contain', 'Categories')
    cy.get('[href="/albums"]').should('contain', 'Albums')
    cy.get('[href="/pictures"]').should('contain', 'Pictures')
    cy.get('[href="/login"]').should('contain', 'Log in')
  })


})