
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, map, Observable, switchMap, tap, throwError} from 'rxjs';
import { User } from '../interfaces';
import { AuthResponse, Login,Register } from '../interfaces/auth';
import { BaseService } from './base.service';
import { CookieStorageService } from './cookie.service';
import {RoleService} from "./role.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(
    private cookieStorageService: CookieStorageService,
    private roleService: RoleService,
    http: HttpClient,
  ){
   super(http)
  }

  get user(): User | null {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }

  login(payload:Login): Observable<AuthResponse>{
    return this.post<AuthResponse>( 'auth/login', payload)
    .pipe(
      catchError(this.handleError),
      tap((response: AuthResponse) => {
        const cookieExpire = new Date(Date.now()+24 * 60 * 60 * 1000)
        this.cookieStorageService.setCookie('token', response.token.accessToken, cookieExpire);
        this.cookieStorageService.setCookie('refreshToken', response.token.refreshToken);

        const roles = response.user.roles.map((r:any)=> r.name)
        this.cookieStorageService.setCookie('roles',JSON.stringify(roles))

        this.setUser(response.user)
      })
    )
  }

  get token(): string{
    return this.cookieStorageService.getCookie('token')
  }

  get refreshToken():string{
    return this.cookieStorageService.getCookie('refreshToken')
  }
  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user))
  }

  register(payload:Register): Observable<AuthResponse>{
    return this.post<AuthResponse>('auth/signup', payload)
  }

  signOut(){
    localStorage.clear()
    this.cookieStorageService.deleteCookie('token')
    this.cookieStorageService.deleteCookie('refreshToken')
    this.cookieStorageService.deleteAllcookies()

  }
  // private
  handleError(error: HttpErrorResponse) {
   let  errorMsg = ''
    if (error.status === 401) {
      errorMsg = 'User does not exit!'

    } else if (error.status === 404) {
      errorMsg = 'Password is wrong'
    }
    // console.log(error.status)
    return throwError(errorMsg);
  }
}
