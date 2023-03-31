import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './features/main-layout/main-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import {PagenotfoundComponent} from "./pages/pagenotfound/pagenotfound.component";
import {PermissionGuard} from "./core/guards/permission.guard";


const routes: Routes = [
  {
    path: 'auth',
    canActivate: [LoginGuard],
    loadChildren: () => import('./pages/Auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'work',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/workspace/workspace.module').then(m => m.WorkspaceModule)
      },
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'users',
        canActivate: [AuthGuard , PermissionGuard],
        data:{
          permissions:['user:list']
        },
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'roles',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/roles/roles.module').then(m => m.RolesModule)
      },
      {
        path: 'backlog',
        canActivate: [AuthGuard],
        loadComponent: () => import('./pages/backlog/backlog.component').then(m => m.BacklogComponent)
      },
      {
        path: 'access-denied',
        loadComponent: () => import('./pages/access-denied/access-denied.component').then(m => m.AccessDeniedComponent)
      },
      { path: '**',
        pathMatch:"full",
        component: PagenotfoundComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
