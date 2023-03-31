import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { DashboardComponent } from './dashboard.component';
import {ProjectResolver} from "../../../core/resolvers/project.resolver";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: ':projectId/:id',
        // path: ':id',
        resolve: {
          project: ProjectResolver
        },
        component: BoardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
