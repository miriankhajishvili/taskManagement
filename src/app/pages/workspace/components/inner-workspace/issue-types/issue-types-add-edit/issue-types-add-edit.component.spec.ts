import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueTypesAddEditComponent } from './issue-types-add-edit.component';

describe('IssueTypesAddEditComponent', () => {
  let component: IssueTypesAddEditComponent;
  let fixture: ComponentFixture<IssueTypesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueTypesAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueTypesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
