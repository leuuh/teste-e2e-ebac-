/// <reference types="cypress" />
import PaginaProducts from '../support/page_objects/PaginaProducts'
import PaginaCheckout from '../support/page_objects/PaginaCheckout'
import { faker } from '@faker-js/faker/locale/pt_BR';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /* Como cliente
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
    cy.fixture('massadados').then(produtos => {
      // Itera sobre cada item do array de produtos
      produtos.forEach(({ nomeProduto, tamanho, cor, quantidade }) => {
        PaginaProducts.buscarProdutos(nomeProduto);
        PaginaProducts.addProdutoCarrinho(tamanho, cor, quantidade);
        cy.get('.woocommerce-message', { timeout: 10000 })
          .should('contain', nomeProduto);
      });
    });

    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      company: faker.company.name(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      zip: faker.location.zipCode(),
      phone: faker.phone.number('(##) #####-####'),
      password: faker.internet.password(12, false, /[A-Za-z0-9]/)
    };

    cy.get('.dropdown-toggle > .text-skin > .icon-basket').click({ force: true })
    // Seletor aprimorado para o botão de checkout
    cy.get('.button.checkout', { timeout: 10000 }).first().click({ force: true })

    PaginaCheckout.preencherDados(user);

    cy.get('#place_order', { timeout: 10000 }).click()
    cy.get('.page-title', { timeout: 10000 })
      .should('be.visible').and('contain.text', 'Pedido recebido')
  });
});