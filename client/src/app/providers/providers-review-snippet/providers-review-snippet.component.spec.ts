import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersReviewSnippetComponent } from './providers-review-snippet.component';

describe('ProvidersReviewSnippetComponent', () => {
  let component: ProvidersReviewSnippetComponent;
  let fixture: ComponentFixture<ProvidersReviewSnippetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvidersReviewSnippetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersReviewSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
