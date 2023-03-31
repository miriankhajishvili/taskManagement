import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  public sideNavToggle$: BehaviorSubject<any> = new BehaviorSubject(null)
  constructor() { }

  public toggleNav(){
    return this.sideNavToggle$.next(null)
  }
}
