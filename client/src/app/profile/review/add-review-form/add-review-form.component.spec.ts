import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReviewFormComponent } from './add-review-form.component';

describe('AddReviewFormComponent', () => {
  let component: AddReviewFormComponent;
  let fixture: ComponentFixture<AddReviewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReviewFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
