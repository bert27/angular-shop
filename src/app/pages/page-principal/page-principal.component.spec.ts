import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePrincipalComponent } from './page-principal.component';

describe('PagePrincipalComponent', () => {
  let component: PagePrincipalComponent;
  let fixture: ComponentFixture<PagePrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagePrincipalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagePrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
