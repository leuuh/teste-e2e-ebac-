class PaginaProducts {

    visitUrl(){ 
        cy.visit('produtos')
    }

    buscarProdutos(nomeProduto) {
        cy.get('[name="s"]').eq(1).type(nomeProduto)
        cy.get('.button-search').eq(1).click({ force:true })
    }

    addProdutoCarrinho(tamanho, cor, quantidade) {
    cy.get(`.button-variable-item-${tamanho}`, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true })
      .click({ force: true }) // apagar depois
      .click({ force: true }) // apagar depois

    cy.get(`.button-variable-item-${cor}`, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true })

    cy.get('.input-text')
      .clear()
      .type(quantidade)

    cy.get('.single_add_to_cart_button', { timeout: 10000 })
      .click({ force: true })
  }
    

}

export default new PaginaProducts()

