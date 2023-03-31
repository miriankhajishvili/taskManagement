import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {SidenavService} from "../../core/services";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit{
  @ViewChild('toggable') public toggable!: MatSidenav;

  constructor(
    private sidenavService : SidenavService
  ) {}

  ngOnInit(): void {
    this.sidenavService.sideNavToggle$.subscribe(()=>{
      if (this.toggable){
        this.toggable.toggle()
      }
    })
  }



}
