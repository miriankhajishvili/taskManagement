import { Component } from '@angular/core';
import {AuthService, SidenavService} from 'src/app/core/services';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private authService: AuthService,
    private sidenavService : SidenavService,
    
  ){}

  signOut(){
    this.authService.signOut()
  }
  toggleMenu(){
    this.sidenavService.toggleNav()
  }
  
}
