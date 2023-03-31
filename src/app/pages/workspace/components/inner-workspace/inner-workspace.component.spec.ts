import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerWorkspaceComponent } from './inner-workspace.component';

describe('InnerWorkspaceComponent', () => {
  let component: InnerWorkspaceComponent;
  let fixture: ComponentFixture<InnerWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerWorkspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnerWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
