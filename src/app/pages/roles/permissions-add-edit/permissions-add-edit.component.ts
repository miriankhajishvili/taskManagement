import {Component, OnInit} from '@angular/core';
import {RoleService} from "../../../core/services/role.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from "lodash";

@Component({
  selector: 'app-permissions-add-edit',
  templateUrl: './permissions-add-edit.component.html',
  styleUrls: ['./permissions-add-edit.component.scss']
})
export class PermissionsAddEditComponent implements OnInit{
 pageTitle? :string
  roleId!:string;
  groups: any = [];
  permissions: Set<number> = new Set<number>();

  constructor(
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router:Router,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['roleId']) {
        this.roleId = params['roleId'];
        this.getPermissionByRoleId(this.roleId)
      }
    })
    this.getPermission()
  }
  getPermissionByRoleId(id:string){
    this.roleService.getRole(id).subscribe(res=>{

      this.pageTitle = res.name
      res && res.permissions && res.permissions.length && res.permissions.forEach((per:any) => this.permissions.add(per.id))
    })
  }
  getPermission(){
    this.roleService.getPermission()
      .subscribe( per =>{
        const grouped = _.groupBy(per,'groupKey');
        this.groups = Object.keys(grouped).map(key=>{
          return{
            key,
            permissions:grouped[key]
          }
        })
      })
  }
  checkPermission(permission: any) {
    this.permissions.has(permission.id) ? this.permissions.delete(permission.id) : this.permissions.add(permission.id)
  }
  save() {
    this.roleService.addPermissions({
      roleId: this.roleId,
      permissions:Array.from(this.permissions)
    }).subscribe(res=>{
      this.router.navigate(["/roles"])
    })
  }

}
