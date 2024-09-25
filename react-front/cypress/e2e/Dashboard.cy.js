describe('Testando a Tela de Tickets', function () {
    it('Deve exibir a lista de tickets com sucesso', function () {
        // Intercepta a requisição GET para /api/tickets
        cy.intercept('GET', '/api/tickets', {
            statusCode: 200,
            body: [
                { id: 1, description: 'Passagem Inteira', price: 100 },
                { id: 2, description: 'Passagem Meia', price: 50 },
            ],
        }).as('getTickets');
        // Visita a página onde a requisição é feita
        cy.visit('/tickets');
        // Espera a requisição ser feita e verifica se o mock foi usado
        cy.wait('@getTickets');
        // Verifica se os elementos renderizados na tela estão corretos
        cy.get('.ticket-item').should('have.length', 2);
        cy.get('.ticket-item').first().should('contain', 'Passagem Inteira');
        cy.get('.ticket-item').last().should('contain', 'Passagem Meia');
    });
});
