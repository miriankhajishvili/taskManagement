import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InnerWorkspaceRoutingModule } from './inner-workspace-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatStepperModule} from "@angular/material/stepper";
import {MatSidenavModule} from "@angular/material/sidenav";
import {InnerWorkspaceComponent} from "./inner-workspace.component";import { IssueTypesComponent } from './issue-types/issue-types.component';
import {IssueTypesAddEditComponent} from "./issue-types/issue-types-add-edit/issue-types-add-edit.component";
import {BoardAddEditComponent} from "./board/board-add-edit/board-add-edit.component";
import {ProjectBoardComponent} from "./board/project-board/project-board.component";
import {InfoComponent} from "./info/info.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { EpicComponent } from './epic/epic.component';
import { EpicAddEditComponent } from './epic/epic-add-edit/epic-add-edit.component';
import { MembersComponent } from './members/members.component';
import { AddMemberComponent } from './members/add-member/add-member.component';
import {PermissionsDirective} from "../../../../core/directives/permissions.directive";


@NgModule({
  declarations: [
    InnerWorkspaceComponent,
    BoardAddEditComponent,
    ProjectBoardComponent,
    InfoComponent,
    IssueTypesAddEditComponent,
    IssueTypesComponent,
    EpicComponent,
    EpicAddEditComponent,
    MembersComponent,
    AddMemberComponent
  ],
  imports: [
    CommonModule,
    InnerWorkspaceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    DragDropModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressBarModule,
    MatStepperModule,
    MatSidenavModule,
    MatCheckboxModule,
    PermissionsDirective,
  ],
  exports:[
    InnerWorkspaceComponent
  ]
})
export class InnerWorkspaceModule { }
