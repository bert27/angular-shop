import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonComponent } from './custom-button.component';

describe('BotonComponent', () => {
  let component: BotonComponent;
  let fixture: ComponentFixture<BotonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
