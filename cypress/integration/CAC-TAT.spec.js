
import '../support/commands.js'

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
  cy. visit('./src/index.html')
})

  it ('verificar o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preencher os campos obrigatórios e enviar o fomulário', function() {
    const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste'
    cy.clock()
    cy. fillMandatoryFieldsAndSubmit()
    cy.get('#open-text-area').type(longText, { delay: 0})
    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um e-mail com formatação inválida', function () {
    cy.get('#firstName').type('amábile')
    cy.get('#lastName').type('lucia')
    cy.get('#email').type('amabileexemplo.com')
    cy.get('#open-text-area').type('teste')
    cy.get('.button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não-numérico', function () {
    cy.get('#phone')
      .type('duhAQDIOUH')
      .should('have.value', '')
  })
  
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', function () {
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('preencher e limpas os capos nome, sobrenome, email e telefone', function () {
    cy.get('#firstName')
    .type('Amábile')
    .should('have.value', 'Amábile')
    .clear()
    .should('have.value', '')
    cy.get('#lastName')
    .type('Lúcia')
    .should('have.value', 'Lúcia')
    .clear()
    .should('have.value', '')
    cy.get('#email')
    .type('amabile_teste@gmail.com')
    .should('have.value', 'amabile_teste@gmail.com')
    .clear()
    .should('have.value', '')
    cy.get('#phone')
    .type('47689746253')
    .should('have.value', '47689746253')
    .clear()
    .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('envia formulários com sucesso usando um comando costumizado', function() {
    cy. fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', function() {
    cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function() {
    cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function() {
    cy.get('#product')
    .select(1)
    .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "feedback"', function() {
    cy.get('input[type="radio"][name="atendimento-tat"][value="feedback"]')
      .check()
      .should('be.checked');
  })
  
  it('marca cada tipo de atendimento', function() {
    cy.get('input[type="radio"][name="atendimento-tat"]')
      .should('have.length', 3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked');
      });
  })
  
  it('marca ambos checkboxes, depois desmarca o último', function() {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked');
  
    cy.get('input[type="checkbox"]').last()
      .uncheck()
      .should('not.be.checked');
  })

  it('seleciona um arquivo da pasta fixtures', function() {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', function() {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para qual foi dada um alias', function() {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })
  

  it('verifica que a política de privacidade abre em outra aba sem necessidade de um clique', function() {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })
  
  it('acessa a páginada política de privacidade removendo o target e então clicando no link', function() {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('Talking About Testing').should('be.visible')
  })
  
it('exibe e esconde as mensagens  de sucesso e erro usando o .invoke', () => {
  cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')
})

it('preencher a area de texto usando o comando invoke', function() {
  const longText = Cypress._.repeat('0123456789', 20)

  cy.get('#open-text-area')
    .invoke('val', longText)
    .should('have.value', longText)
})

it('faz uma requisição HTTP', function() {
  cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    .should(function(response) {
      const { status, statusText, body } = response
      expect(status).to.equal(200)
      expect(statusText).to.equal('OK')
      expect(body).to.include('CAC TAT')
    })
})

})