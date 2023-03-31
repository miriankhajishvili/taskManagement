import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RolesComponent} from "./role/roles.component";
import {PermissionsAddEditComponent} from "./permissions-add-edit/permissions-add-edit.component";
import {RoleAddEditComponent} from "./role-add-edit/role-add-edit.component";

const routes: Routes = [
  {
    path:"",
    component:RolesComponent
  },
  {
    path:"edit/:roleId",
    component:RoleAddEditComponent
  },
  {
    path:"add",
    component:RoleAddEditComponent
  },
  {
    path:"permissions/:roleId",
    component:PermissionsAddEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
