import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageContentArticleComponent } from './page-content-article.component';

describe('PageContentArticleComponent', () => {
  let component: PageContentArticleComponent;
  let fixture: ComponentFixture<PageContentArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageContentArticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageContentArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
