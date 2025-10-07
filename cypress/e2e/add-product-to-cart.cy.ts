describe('Add Product to Cart', () => {
  it('should be able to navigate to the product page and add it to the cart', () => {
    cy.visit('http://localhost:3000') //visita a url

    cy.get('a[href^="/product"]').first().click() //procura pelo primeiro produto e clica nele

    cy.location('pathname').should('include', '/product') //verifica se na url está passando /product

    cy.contains('Adicionar ao carrinho').click() //procura pelo item Adicionar ao carrinho e clica

    cy.contains('Cart (1)').should('exist')
  })

  it('should not count duplicated products on cart', () => {
    cy.visit('http://localhost:3000')

    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')
    cy.contains('Adicionar ao carrinho').click()
    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should be able to search for a product and add it to the cart ', () => {
    cy.visit('http://localhost:3000') //visita a url

    cy.get('input[name=q]').type('moletom').parent('form').submit()

    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')

    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Cart (1)').should('exist')
    
  })
})