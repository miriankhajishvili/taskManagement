import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutModule } from './features/main-layout/main-layout.module';
import { HomeModule} from "./pages/home/home.module";
import { WorkspaceModule} from "./pages/workspace/workspace.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors';
import { UsersComponent } from './pages/users/users.component';
import { UsersListComponent } from './pages/users/containers/users-list/users-list.component';
import { AddOrEditUsersComponent } from './pages/users/components/add-or-edit-users/add-or-edit-users.component';
import {MatTableModule} from "@angular/material/table";
import {ProjectInterceptor} from "./core/interceptors/project.interceptor";
import {SharedModule} from "./shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatInputModule} from "@angular/material/input";
import {MatDividerModule} from "@angular/material/divider";
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import {PermissionsDirective} from "./core/directives/permissions.directive";






@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UsersListComponent,
    AddOrEditUsersComponent,
    PagenotfoundComponent,
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainLayoutModule,
    HomeModule,
    WorkspaceModule,
    HttpClientModule,
    SharedModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatDividerModule,
    PermissionsDirective

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProjectInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
