import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, of, Subject, switchMap, takeUntil} from "rxjs";
import {WorkspaceService} from "../../../core/services";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {IRoles} from "../../../core/interfaces/roles";
import {RoleService} from "../../../core/services/role.service";

@Component({
  selector: 'app-role-add-edit',
  templateUrl: './role-add-edit.component.html',
  styleUrls: ['./role-add-edit.component.scss']
})
export class RoleAddEditComponent implements OnDestroy , OnInit{
  form: FormGroup = new FormGroup({
      id: new FormControl(null),
      name : new FormControl('', [Validators.required])
    }
  );
  sub$ = new Subject();
  errorMsg? : string
  pageTitle:string = "Create Role"
  roleId?:string;
  isEditable: boolean = false;

  roles$: Observable<IRoles[]> = this.roleService.getAllRoless()
  constructor(
    private roleService:RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private CS:CookieService
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: any) => {
        if (params['roleId']) {
          this.pageTitle = "edit workspace"
          return this.roleService.getRole(params['roleId'])
        }
        return of(null)
      })
    ).subscribe(res => {
      if (res) {
        this.form.patchValue(res)
      }
    })

  }
  submit(){

    // console.log("test test")
    this.form.markAllAsTouched();
    if(this.form.invalid) return;

    // console.log(this.form.value)

    if(this.form.value.id){
      this.roleService.editRoles(this.form.value.id ,this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe({
          next: res =>{
            if (this.errorMsg){
              this.errorMsg = ""
            }
            // console.log("ress: ", res)
            this.router.navigate(['/roles/permissions/', this.form.value.id])
          },
          error: err=>{
            this.errorMsg = err.error.message;
          }
        })
    }else{
      this.roleService.addRoles(this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe({
            next: res =>{
              if (this.errorMsg){
                this.errorMsg = ""
              }
              // console.log("ress: ", res)
              this.roleId = res.id
              this.router.navigate(['/roles/permissions/', res.id])

              // console.log(this.roleId)
            },
            error: err=>{
              this.errorMsg = err.error.message;
            }
          }
        )
    }
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }

}
