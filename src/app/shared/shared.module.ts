import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog";
import {DeletePopupComponent} from "./popups/delete-popup/delete-popup.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    DeletePopupComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  exports:[
    DeletePopupComponent
  ]
})
export class SharedModule { }
