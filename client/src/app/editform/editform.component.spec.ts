import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditformComponent } from './editform.component';

describe('EditformComponent', () => {
  let component: EditformComponent;
  let fixture: ComponentFixture<EditformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
