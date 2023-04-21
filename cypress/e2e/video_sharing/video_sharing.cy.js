describe('Login or Register', () => {
    const mockVideos = [
        {
            "url": "https://www.youtube.com/watch?v=pIrkcBp-UO8",
            "shareby": "xxh37036@omeie.com",
            "title": "Điều gì kéo người trẻ về phía trước? - Khánh Vy | #HaveASip 118",
            "description": "Đừng quên đăng ký theo dõi Vietcetera nhé: https://www.youtube.com/c/vietcetera\nPlaylist: https://www.youtube.com/playlist?list=PLWrhnsc6Cvcrp7HmEWu8q0p95pRyGmpHi\nKhách mời: @KhanhVyOFFICIAL \n\nKhánh V...",
            "createdAt": "2023-04-21T07:11:45.168Z",
            "updatedAt": "2023-04-21T07:11:45.168Z",
            "id": "6442373129f93c23f72659f7"
        },
        {
            "url": "https://www.youtube.com/watch?v=pIrkcBp-UO8",
            "shareby": "xxh37036@omeie.com",
            "title": "Điều gì kéo người trẻ về phía trước? - Khánh Vy | #HaveASip 118",
            "description": "Đừng quên đăng ký theo dõi Vietcetera nhé: https://www.youtube.com/c/vietcetera\nPlaylist: https://www.youtube.com/playlist?list=PLWrhnsc6Cvcrp7HmEWu8q0p95pRyGmpHi\nKhách mời: @KhanhVyOFFICIAL \n\nKhánh V...",
            "createdAt": "2023-04-21T07:11:45.168Z",
            "updatedAt": "2023-04-21T07:11:45.168Z",
            "id": "6442373129f93c23f72659f7"
        },
    ]
    beforeEach(() => {
        cy.visit('/home')
        cy.get("[data-test*=input__username]").type("admin");
        cy.get("[data-test*=input__password]").type("admin");
        cy.get("[data-test*=button__login]").click();

        cy.intercept("GET", "/api/videos", {
            videos: mockVideos
        }).as("getVideos");
    });

    it("listing video successfully", () => {
        cy.get("[data-test*=header__logo]").click();
        cy.wait("@getVideos").then(() => {
            cy.get('[data-test="videos__list"]').should('exist');
            cy.get('[data-test="videos__item"]').should('have.length', 2);
            cy.get('[data-test="videos__item"]').each(($el, index) => {
                const video = mockVideos[index];
                cy.wrap($el).within(() => {
                    cy.get('[data-test="video__title"]').should('have.text', video.title);
                    cy.get('[data-test="video__shareby"]').should('have.text', `Shared by: ${video.shareby}`);
                    cy.get('[data-test="video__description"]').should('have.text', `Description: ${video.description}`);
                });
            });
        })
    });
})