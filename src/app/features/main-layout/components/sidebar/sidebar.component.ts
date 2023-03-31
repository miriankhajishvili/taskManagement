import { Component } from '@angular/core';
import {AuthService} from "../../../../core/services";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
 userName! :string;
  constructor(
    private authService: AuthService,
    
  ) {
    this.getLoggedInUser()
  }

  getLoggedInUser(){
   this.userName =  this.authService.user?.firstName + " " + this.authService.user?.lastName
  }


  signOut(){
    this.authService.signOut()
  }
}
