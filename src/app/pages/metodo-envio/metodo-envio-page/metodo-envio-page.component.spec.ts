import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoEnvioPageComponent } from './metodo-envio-page.component';

describe('MetodoEnvioPageComponent', () => {
  let component: MetodoEnvioPageComponent;
  let fixture: ComponentFixture<MetodoEnvioPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetodoEnvioPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetodoEnvioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
