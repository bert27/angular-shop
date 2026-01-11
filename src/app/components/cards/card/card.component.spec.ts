import { render, screen, fireEvent } from '@testing-library/angular';
import { expect, jest, describe, it, beforeEach } from '@jest/globals';
import { CardComponent } from './card.component';
import { CarritoService } from '@services/carrito.service';
import { Router } from '@angular/router';

describe('CardComponent', () => {
  const mockCarritoService = {
    addProduct: jest.fn(),
    openCartView: jest.fn(),
  };

  const mockRouter = {
    navigate: jest.fn(),
  };

  async function setup(cardData: any) {
    return await render(CardComponent, {
      componentInputs: {
        cardData,
      },
      providers: [
        { provide: CarritoService, useValue: mockCarritoService },
        { provide: Router, useValue: mockRouter },
      ],
    });
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create', async () => {
    const cardData = { title: 'Test', textContent: 'Content' } as any;
    const { fixture } = await setup(cardData);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should identify articles correctly', async () => {
    const cardData = { title: 'Test', textContent: 'Content' } as any;
    const { fixture } = await setup(cardData);
    const component = fixture.componentInstance;

    const article = { title: 'Test', textContent: 'Content' } as any;
    const product = { title: 'Test', stock: true, options: [] } as any;

    expect(component.isArticle(article)).toBe(true);
    expect(component.isArticle(product)).toBe(false);
  });

  it('should handle add to cart for products via handleAddToCart', async () => {
    const product = {
      title: 'Test Product',
      stock: true,
      options: [{ tipo: '128Gb', price: 100 }],
    } as any;

    const { fixture } = await setup(product);
    const component = fixture.componentInstance;

    component.selectedOption = product.options[0];
    component.quantity = 2;

    component.handleAddToCart();

    expect(mockCarritoService.addProduct).toHaveBeenCalledWith(product, product.options[0], 2);
    expect(mockCarritoService.openCartView).toHaveBeenCalled();
  });

  it('should call handleAddToCart when clicking the add-to-cart button', async () => {
    const product = {
      title: 'Test Product',
      stock: true,
      options: [{ tipo: '128Gb', price: 100 }],
    } as any;

    await setup(product);

    const button = screen.getByTestId('add-to-cart-btn');
    fireEvent.click(button);

    expect(mockCarritoService.addProduct).toHaveBeenCalled();
    expect(mockCarritoService.openCartView).toHaveBeenCalled();
  });
});
