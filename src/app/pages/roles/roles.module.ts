import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './role/roles.component';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import { PermissionsAddEditComponent } from './permissions-add-edit/permissions-add-edit.component';
import { RoleAddEditComponent } from './role-add-edit/role-add-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    RolesComponent,
    PermissionsAddEditComponent,
    RoleAddEditComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    MatTableModule,
    MatIconModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class RolesModule { }
