import { Injectable } from '@angular/core';
import {CookieStorageService} from "../core/services";

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {

  constructor(

    private cookieStorageService: CookieStorageService,
  ) { }

  get roles():string[]{
    const roles = this.cookieStorageService.getCookie('roles');
    return( roles? JSON.parse(roles):[]) as string[];
  }
  get permissions():string[]{
    const permissions = localStorage.getItem('permissions');
    return ( permissions ? JSON.parse(permissions):[]) as string[];
  }
}
