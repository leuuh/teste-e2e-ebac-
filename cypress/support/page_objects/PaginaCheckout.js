
// support/page_objects/PaginaCheckout.js
class PaginaCheckout {
  preencherDados(user) {
    cy.get('#billing_first_name').type(user.firstName);
    cy.get('#billing_last_name').type(user.lastName);
    cy.get('#billing_company').type(user.company);
    cy.get('#billing_address_1').type(user.address);
    cy.get('#billing_city').type(user.city);
    cy.get('#billing_postcode').type(user.zip);
    cy.get('#billing_phone').type(user.phone);
    cy.get('#billing_email').type(user.email);
    cy.get('#createaccount').click();
    cy.get('#account_password').type(user.password);
    cy.get('#terms').click();
  }
}

export default new PaginaCheckout();
