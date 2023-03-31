import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from "./users.component";
import {UsersListComponent} from "./containers/users-list/users-list.component";

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path:'users',
    component: UsersListComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule {
}
