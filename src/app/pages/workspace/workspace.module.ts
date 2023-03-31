import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CreateEditWorkspaceComponent } from './components/create-edit-workspace/create-edit-workspace.component';

import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from "@angular/material/paginator";
import { WorkspaceListComponent } from './components/workspace-list/workspace-list.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatStepperModule} from '@angular/material/stepper';
import {MatSidenavModule} from "@angular/material/sidenav";
import { AddMembersComponent } from './containers/add-members/add-members.component';
import {PermissionsDirective} from "../../core/directives/permissions.directive";




@NgModule({
  declarations: [
    CreateEditWorkspaceComponent,
    WorkspaceListComponent,
    AddMembersComponent,


  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
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
    FormsModule,
    PermissionsDirective,
  ],
})
export class WorkspaceModule { }
