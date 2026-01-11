describe('Checkout Flow', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('1. Debería añadir un producto al carrito y navegar al checkout', () => {
    cy.visit('/productos');
    cy.location('pathname').should('include', '/productos');
    cy.get('body').should('be.visible');
    cy.wait(1000); // Wait for potential animations/load
    
    // Ensure we see the button and it's not covered
    cy.get('[data-testid="add-to-cart-btn"]').first().scrollIntoView().should('be.visible');
    
    // Click and capture state
    cy.get('[data-testid="add-to-cart-btn"]').first().click({ force: true });
        cy.wait(1000); // Wait for potential animations/load

    // The cart opens automatically, so we don't click the icon. 
    // We just wait for it to be visible.
    cy.get('[data-testid="cart-checkout-btn"]').should('be.visible');
    cy.screenshot('cart-modal-test-1');
    
    cy.get('.header__cart-badge').should('not.contain', '0');
    cy.get('[data-testid="cart-checkout-btn"]').click();
    
    // 1. First it goes to /carrito (Resumen)
    cy.url().should('include', '/carrito');
    cy.get('[data-testid="checkout-submit-btn"]').click();
     cy.wait(1000); // Wait for potential animations/load
  
  });

  it('2. Debería rellenar el formulario de envío y proceder al pago', () => {
    // Setup - visit products and add to cart
    cy.visit('/productos');
    cy.location('pathname').should('include', '/productos');
    cy.wait(1000);
    
    cy.get('[data-testid="add-to-cart-btn"]').first().scrollIntoView().click({ force: true });
    cy.wait(1000);
    
    cy.get('[data-testid="cart-checkout-btn"]').should('be.visible');
    cy.screenshot('cart-modal-test-2');
    cy.get('[data-testid="cart-checkout-btn"]').click();
    
    // 1. Go to /carrito
    cy.url().should('include', '/carrito');
    cy.get('[data-testid="checkout-submit-btn"]').click();
    cy.wait(1000);
    
    // 2. Now it is in /checkout - STEP 1 (Entrega)
    cy.url().should('include', '/checkout');
    
    // Fill the form which is visible in Step 1
    cy.get('[data-testid="input-name"] input', { timeout: 10000 }).should('be.visible').type('Juan', { force: true });
    cy.get('[data-testid="input-surname"] input').type('Pérez', { force: true });
    cy.get('[data-testid="input-address"] input').type('Calle Falsa 123', { force: true });
    cy.get('[data-testid="input-phone"] input').type('123456789', { force: true });
    cy.get('[data-testid="input-city"] input').type('Madrid', { force: true });
    cy.get('[data-testid="input-country"] input').type('España', { force: true });
    cy.get('[data-testid="input-postalCode"] input').type('28001', { force: true });
    cy.get('[data-testid="input-province"] input').type('Madrid', { force: true });
    cy.get('[data-testid="input-email"] input').type('juan.perez@example.com', { force: true });
    
    // Click submit/next in the checkout page
    cy.get('.checkout-column [data-testid="checkout-submit-btn"]').click({ force: true });
     cy.wait(1000); // Wait for potential animations/load
    // 3. Check we are in Step 2 (Pago) and click payment button
    cy.get('[data-testid="payment-btn"]').should('be.visible').click({ force: true });
  });
});
