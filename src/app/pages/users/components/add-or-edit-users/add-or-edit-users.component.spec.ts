import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditUsersComponent } from './add-or-edit-users.component';

describe('AddOrEditUsersComponent', () => {
  let component: AddOrEditUsersComponent;
  let fixture: ComponentFixture<AddOrEditUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
