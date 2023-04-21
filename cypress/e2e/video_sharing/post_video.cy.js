import { useVideoInfo } from "../../../hooks/useVideoInfo"
import { apiCreateVideo } from "../../../services/video";

describe('ShareVideo component', () => {
    beforeEach(() => {
        localStorage.clear()
        cy.visit('/home')
        cy.get("[data-test*=input__username]").type("admin");
        cy.get("[data-test*=input__password]").type("admin");
        cy.get("[data-test*=button__login]").click();
    });
    it('submits the form and shows a success notification', () => {
        cy.get('[data-test="header__share-button"]').click()

        cy.get('[data-test="input__url-sharing"]').type('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        cy.get('[data-test="btn-sharing"]').click()

        cy.get('.ant-notification-notice-message').should('have.text', 'Notification')
        cy.get('.ant-notification-notice-description').should('have.text', 'Successfully sharing')
    })

    it('submits the form with an invalid URL and shows an error notification', () => {
        cy.get('[data-test="header__share-button"]').click()

        cy.get('[data-test="input__url-sharing"]').type('https://invalid_url')
        cy.get('[data-test="btn-sharing"]').click()

        cy.get('.ant-notification-notice-message').should('have.text', 'Notification')
        cy.get('.ant-notification-notice-description').should('have.text', 'Something wrong. Please check your url!')
    })
})
