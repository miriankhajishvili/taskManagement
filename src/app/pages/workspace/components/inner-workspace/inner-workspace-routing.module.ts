import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InfoComponent} from "./info/info.component";
import {InnerWorkspaceComponent} from "./inner-workspace.component";
import {ProjectBoardComponent} from "./board/project-board/project-board.component";
import {BoardAddEditComponent} from "./board/board-add-edit/board-add-edit.component";
import {IssueTypesComponent} from "./issue-types/issue-types.component";
import {IssueTypesAddEditComponent} from "./issue-types/issue-types-add-edit/issue-types-add-edit.component";
import {EpicComponent} from "./epic/epic.component";
import {EpicAddEditComponent} from "./epic/epic-add-edit/epic-add-edit.component";
import {MembersComponent} from "./members/members.component";

const routes: Routes = [
  {
    path:':id',
    component:InnerWorkspaceComponent,
    children:[
      {
        path:'',
        component:InfoComponent,
      },
      {
        path: 'board',
        children: [
          {
            path: '',
            component: ProjectBoardComponent
          },
          {
            path: 'add',
            component: BoardAddEditComponent
          },
          {
            path:'edit/:id',
            component: BoardAddEditComponent
          },

        ]
      },
      {
        path: 'types',
        children: [
          {
            path: '',
            component: IssueTypesComponent
          },
          {
            path: 'add',
            component: IssueTypesAddEditComponent
          },
          {
            path:'edit/:id',
            component: IssueTypesAddEditComponent
          },

        ]
      },
      {
        path: 'epics',
        children: [
          {
            path: '',
            component: EpicComponent
          },
          {
            path: 'add',
            component: EpicAddEditComponent
          },
          {
            path:'edit/:id',
            component: EpicAddEditComponent
          },

        ]
      },
      {
        path: 'members',
        children: [
          {
            path: '',
            component: MembersComponent
          },
          // {
          //   path: 'add',
          //   component: EpicAddEditComponent
          // },
          // {
          //   path:'edit/:id',
          //   component: EpicAddEditComponent
          // },
        ]
      },
    ]
  }

];
// {
//   path:'',
//     component:InnerWorkspaceComponent,
//   children:[
//   {
//     path: ':id/info',
//     component:InfoComponent,
//     pathMatch: 'full'}
// ]
// }
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InnerWorkspaceRoutingModule { }
