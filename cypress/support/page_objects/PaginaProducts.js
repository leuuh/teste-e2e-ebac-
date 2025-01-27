class PaginaProducts {

    visitUrl(){ 
        cy.visit('produtos')
    }

    buscarProdutos(nomeProduto) {
        cy.get('[name="s"]').eq(1).type(nomeProduto)
        cy.get('.button-search').eq(1).click({ force:true })
    }

    addProdutoCarrinho(tamanho, cor, quantidade) {
        cy.get(`.button-variable-item-${tamanho}`).click({timeout: 10000})
        cy.get(`.button-variable-item-${cor}`).click({timeout: 10000});
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click({timeout: 10000})
    }
    

}

export default new PaginaProducts()