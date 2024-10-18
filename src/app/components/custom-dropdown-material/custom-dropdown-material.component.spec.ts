import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDropdownMaterialComponent } from './custom-dropdown-material.component';

describe('CustomDropdownMaterialComponent', () => {
  let component: CustomDropdownMaterialComponent;
  let fixture: ComponentFixture<CustomDropdownMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomDropdownMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomDropdownMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
