describe('Blog Page Test', () => {
  it('Should load the blog page and navigate to an article', () => {
    // 1. Visit the blog page
    cy.visit('/blog');

    // 2. Verify URL and Title
    cy.url().should('include', '/blog');
    
    // 3. Verify that articles are loaded
    cy.get('[data-testid="article-card"]').should('have.length.greaterThan', 0);
    
    // 4. Click on the first article
    cy.get('[data-testid="article-card"]').first().click();
    
    // Wait for navigation/animation
    cy.wait(1000);

    // 5. Verify navigation to the article page
    cy.url().should('include', '/articulo/');
    
    // 6. Verify article content is visible
    cy.get('[data-testid="article-title"]').should('be.visible');
    cy.get('[data-testid="article-image"]').should('be.visible');
  });

  it('Should load an article directly via URL', () => {
    // Visit a known article URL
    // article1 title: 'El Futuro de los Smartphones: ¿Qué Podemos Esperar?'
    // Slug approx: 'el-futuro-de-los-smartphones-que-podemos-esperar'
    // Let's use a simpler one if possible or just try the first one.
    // article2: 'Minimalismo Digital: Cómo Simplificar tu Vida Tecnológica'
    // Slug: 'minimalismo-digital-como-simplificar-tu-vida-tecnologica'
    
    cy.visit('/articulo/minimalismo-digital-como-simplificar-tu-vida-tecnologica'); // Adjust slug as needed
    
    // Verify content
    cy.get('[data-testid="article-title"]').should('be.visible');
    cy.get('[data-testid="article-image"]').should('be.visible');
  });
});
