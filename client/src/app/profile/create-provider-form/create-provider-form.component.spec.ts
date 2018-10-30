import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProviderFormComponent } from './create-provider-form.component';

describe('CreateProviderFormComponent', () => {
  let component: CreateProviderFormComponent;
  let fixture: ComponentFixture<CreateProviderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProviderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProviderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
