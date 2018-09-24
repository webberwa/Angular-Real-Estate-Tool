import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsCreateDialogComponent } from './investments-create-dialog.component';

describe('InvestmentsCreateDialogComponent', () => {
  let component: InvestmentsCreateDialogComponent;
  let fixture: ComponentFixture<InvestmentsCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentsCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentsCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
