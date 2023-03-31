import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthFacade} from "../../facades/auth.facade";

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(
    private authFacade:AuthFacade,
    private router:Router,
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const permissions = route.data['permissions'] as string[]
    const userPerms = this.authFacade.permissions;

    const hasPermission = userPerms.some(permission => permissions.includes(permission));
    return hasPermission ? hasPermission : this.router.createUrlTree(['/access-denied']);
  }

}
