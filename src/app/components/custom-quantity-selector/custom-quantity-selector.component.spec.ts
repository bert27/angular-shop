import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomQuantitySelectorComponent } from './custom-quantity-selector.component';

describe('CustomQuantitySelectorComponent', () => {
  let component: CustomQuantitySelectorComponent;
  let fixture: ComponentFixture<CustomQuantitySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomQuantitySelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomQuantitySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
