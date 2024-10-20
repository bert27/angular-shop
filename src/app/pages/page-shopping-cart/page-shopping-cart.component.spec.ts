import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageShoppingCartComponent } from './page-shopping-cart.component';

describe('PageShoppingCartComponent', () => {
  let component: PageShoppingCartComponent;
  let fixture: ComponentFixture<PageShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageShoppingCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
