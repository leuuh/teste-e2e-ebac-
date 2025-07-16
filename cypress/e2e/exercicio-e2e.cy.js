/// <reference types="cypress" />
import PaginaProducts from '../support/page_objects/PaginaProducts'
import PaginaCheckout from '../support/page_objects/PaginaCheckout'
import { faker } from '@faker-js/faker/locale/pt_BR';

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

    const user = {
      firstName: faker.person.firstName(),
      lastName:  faker.person.lastName(),
      email:     faker.internet.email(),
      company:   faker.company.name(),
      address:   faker.location.streetAddress(),
      city:      faker.location.city(),
      zip:       faker.location.zipCode(),
      phone:     faker.phone.number('(##) #####-####'),
      password:  faker.internet.password(12, false, /[A-Za-z0-9]/)
    };

    cy.get('.dropdown-toggle > .text-skin > .icon-basket').click({force:true})
    cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click({force:true})

    PaginaCheckout.preencherDados(user);

    cy.get('#place_order', { timeout: 10000 }).click()
    cy.get('.page-title', { timeout: 10000 })
    .should('be.visible').and('contain.text', 'Pedido recebido')
  });
});