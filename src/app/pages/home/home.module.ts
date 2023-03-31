import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from "@angular/material/icon";
import {PermissionsDirective} from "../../core/directives/permissions.directive";




@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MatCardModule,
        MatDividerModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatIconModule,
        PermissionsDirective
    ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
