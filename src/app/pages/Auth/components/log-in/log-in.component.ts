import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService, CookieStorageService} from 'src/app/core/services';
import {catchError, map, switchMap, tap} from "rxjs";
import {RoleService} from "../../../../core/services/role.service";
import {AuthResponse} from "../../../../core/interfaces";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  errorMsg:any

  hide = true
  get getEmail(){
    return this.form.get('email')
  }

  get getPassword(){
    return this.form.get('password')
  }

  constructor(
    private authService: AuthService,
    private roleService:RoleService,
    private cookieStorageService: CookieStorageService,
    private router: Router
  ){}

  form: FormGroup = new FormGroup({

    email : new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(15),])
  })

  ngOnInit(): void {

  }
  submit(){
    if (this.form.invalid) return

    this.authService.login(this.form.value)
      .pipe(
        catchError(this.authService.handleError),
        tap((response: AuthResponse) => {
          const cookieExpire = new Date(Date.now()+24 * 60 * 60 * 1000)
          this.cookieStorageService.setCookie('token', response.token.accessToken, cookieExpire);
          this.cookieStorageService.setCookie('refreshToken', response.token.refreshToken);

          const roles = response.user.roles.map((r:any)=> r.name)
          this.cookieStorageService.setCookie('roles',JSON.stringify(roles))

          this.authService.setUser(response.user)
        }),
        switchMap(() => this.roleService.getMyRoles()
          .pipe(
            map((res)=>{
              const permissions :string[] =[];
              const roles = res.forEach((r:any)=>{
                r.permissions && permissions.push(...r.permissions.map((p:any)=> p.name))
              })
              localStorage.setItem('permissions', JSON.stringify(permissions))
            })
          ),
        )
      ).subscribe(res =>{
      this.router.navigate(['/home'])
    }, (error)=>{
      this.errorMsg = error
      // console.log(error)
    })
  }
}
