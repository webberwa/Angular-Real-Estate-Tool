import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorCodeComponent } from './two-factor-code.component';

describe('TwoFactorCodeComponent', () => {
  let component: TwoFactorCodeComponent;
  let fixture: ComponentFixture<TwoFactorCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoFactorCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoFactorCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
