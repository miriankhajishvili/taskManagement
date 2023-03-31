import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms'

  


@NgModule({
  declarations: [
    AuthComponent,
    LogInComponent,
    RegisterComponent,


  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    MatTabsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatIconModule
    
  ]
})
export class AuthModule { }
