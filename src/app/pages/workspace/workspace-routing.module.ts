import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateEditWorkspaceComponent} from "./components/create-edit-workspace/create-edit-workspace.component";

import {InnerWorkspaceComponent} from "./components/inner-workspace/inner-workspace.component";
import {WorkspaceListComponent} from "./components/workspace-list/workspace-list.component";
import { BoardAddEditComponent } from './components/inner-workspace/board/board-add-edit/board-add-edit.component';
import { ProjectBoardComponent } from './components/inner-workspace/board/project-board/project-board.component';


const routes: Routes = [
  {
    // path: '',
    path: 'list',
    component: WorkspaceListComponent
  },
  {
    path:'add',
    component: CreateEditWorkspaceComponent
  },
  {
    path:'edit/:id',
    component: CreateEditWorkspaceComponent
  },

  // {
  //   path: ':id',
  //   component: InnerWorkspaceComponent
  // },
  {
    path:'inner',
    loadChildren: ()=>import('./components/inner-workspace/inner-workspace.module').then(m=> m.InnerWorkspaceModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
