Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
  cy.get('#firstName').type('amábile')
  cy.get('#lastName').type('lucia')
  cy.get('#email').type('amabile@exemplo.com')
  cy.get('#open-text-area').type('teste')
  cy.get('.button[type="submit"]').click()
  
})