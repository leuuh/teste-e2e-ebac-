/// <reference types="cypress" />
import PaginaProducts from '../support/page_objects/PaginaProducts'
import { faker } from '@faker-js/faker';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      PaginaProducts.visitUrl()
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
    cy.fixture('massadados').then(dados => {

        PaginaProducts.buscarProdutos(dados[0].nomeProduto);
        PaginaProducts.addProdutoCarrinho( 
            dados[0].tamanho,
            dados[0].cor,
            dados[0].quantidade)
    cy.get('.woocommerce-message', { timeout: 10000 }).should('contain', dados[0].nomeProduto);

    });

    cy.fixture('massadados').then(dados => {

      PaginaProducts.buscarProdutos(dados[1].nomeProduto);
      PaginaProducts.addProdutoCarrinho(
          dados[1].tamanho,
          dados[1].cor,
          dados[1].quantidade)
    cy.get('.woocommerce-message', { timeout: 10000 }).should('contain', dados[1].nomeProduto)
    });  

    cy.fixture('massadados').then(dados => {

      PaginaProducts.buscarProdutos(dados[2].nomeProduto);
      PaginaProducts.addProdutoCarrinho(
          dados[2].tamanho,
          dados[2].cor,
          dados[2].quantidade)
    cy.get('.woocommerce-message').should('contain', dados[2].nomeProduto)      
    });  

    cy.fixture('massadados').then(dados => {

      PaginaProducts.buscarProdutos(dados[3].nomeProduto);
      PaginaProducts.addProdutoCarrinho(
          dados[3].tamanho,
          dados[3].cor,
          dados[3].quantidade)
    cy.get('.woocommerce-message').should('contain', dados[3].nomeProduto)
    });

    cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
    cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()
    cy.get('#billing_first_name')

    it('variaveis', () => {
      
    });
  });
});