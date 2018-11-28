import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Deletepop1Component } from './deletepop1.component';

describe('Deletepop1Component', () => {
  let component: Deletepop1Component;
  let fixture: ComponentFixture<Deletepop1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Deletepop1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Deletepop1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
