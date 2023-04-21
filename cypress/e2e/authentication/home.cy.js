
describe('Login or Register', () => {
  beforeEach(() => {
    cy.visit('/home')
  });

  it('should display Funny Movies logo', () => {
    cy.get('[data-test="header__logo"]').should('be.visible')
  })

  it('should display login/register form', () => {
    cy.get('[data-test="input__username"]').should('be.visible')
    cy.get('[data-test="input__password"]').should('be.visible')
    cy.get('[data-test="button__login"]').should('be.visible')
  })

  it('should allow users to login/register successfully', () => {
    const username = 'testuser'
    const password = 'testpass'

    cy.get('[data-test="input__username"]').type(username)
    cy.get('[data-test="input__password"]').type(password)
    cy.get('[data-test="button__login"]').click()

    cy.url().should('include', '/home')

    cy.get('[data-test="para__welcome"]').contains(`Welcome ${username}`)
    cy.get('[data-test="header__logo"]').click()
    cy.url().should('include', '/home')
    cy.get('[data-test="para__welcome"]').contains(`Welcome ${username}`)
  })

  it('should allow logged in users to share a movie', () => {
    const username = 'testuser'
    const password = 'testpass'

    cy.get('[data-test="input__username"]').type(username)
    cy.get('[data-test="input__password"]').type(password)
    cy.get('[data-test="button__login"]').click()

    cy.url().should('include', '/home')

    cy.get('[data-test="para__welcome"]').contains(`Welcome ${username}`)
    cy.get('[data-test="header__logo"]').click()

    cy.get('[data-test="header__share-button"]').click()
    cy.url().should('include', '/share')
  })

  it('should allow logged in users to logout', () => {
    const username = 'testuser'
    const password = 'testpass'

    cy.get('[data-test="input__username"]').type(username)
    cy.get('[data-test="input__password"]').type(password)
    cy.get('[data-test="button__login"]').click()

    cy.url().should('include', '/home')

    cy.get('[data-test="para__welcome"]').contains(`Welcome ${username}`)
    cy.get('[data-test="header__logo"]').click()

    cy.get('[data-test="header__logout-button"]').click()

    cy.get('[data-test="input__username"]').should('be.visible')
    cy.get('[data-test="input__password"]').should('be.visible')
    cy.get('[data-test="button__login"]').should('be.visible')
  })
})