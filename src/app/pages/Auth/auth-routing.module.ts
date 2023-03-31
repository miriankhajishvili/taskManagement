import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [

  {
   path: '',
   redirectTo: 'auth/login',
   pathMatch: 'full'

  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
         component: LogInComponent
      },

      {
        path: 'register',
        component: RegisterComponent

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
