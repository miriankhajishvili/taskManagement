import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditWorkspaceComponent } from './create-edit-workspace.component';

describe('CreateWorkspaceComponent', () => {
  let component: CreateEditWorkspaceComponent;
  let fixture: ComponentFixture<CreateEditWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditWorkspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
