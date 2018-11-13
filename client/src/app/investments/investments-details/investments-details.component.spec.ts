import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsDetailsComponent } from './investments-details.component';

describe('InvestmentsDetailsComponent', () => {
  let component: InvestmentsDetailsComponent;
  let fixture: ComponentFixture<InvestmentsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
