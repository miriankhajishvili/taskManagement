import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home.component";
import {CreateEditWorkspaceComponent} from "../workspace/components/create-edit-workspace/create-edit-workspace.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'add',
    component: CreateEditWorkspaceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
