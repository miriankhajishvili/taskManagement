import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {IQueryTable} from "../interfaces";
import {IRoles} from "../interfaces/roles";

@Injectable({
  providedIn: 'root'
})
export class RoleService  extends BaseService{

  addRoles(param: IRoles):Observable<IRoles>{
    return this.post<IRoles>('role', param)
  }

  editRoles(id:string, editedProject:IRoles):Observable<IRoles>{
    return  this.put<IRoles>(`role/${id}`, editedProject);
  }
  getAllRoles(): Observable<IRoles[]> {
    return this.get('role/all');
  }
  getMyRoles(): Observable<any> {
    return this.get('role/my');
  }
  getAllRoless() :Observable<IRoles[]>{
    return this.get<IRoles[]>(`role`)
  }
  getRole(id:string) :Observable<IRoles>{
    return this.get<IRoles>(`role/${id}`)
  }
  getRolesByParams(params= {}) :Observable<IQueryTable<IRoles>>{
    return this.get<IQueryTable<IRoles>>(`role`, params)
  }

  deleteRoles(id:string){
    return this.delete(`role/${id}`);
  }


  getPermissionsByRoleId(id : string):Observable<any>{
    return this.get(`role/permissions/${id}`)
  }
  getPermission():Observable<any>{
    return this.get(`role/permission`)
  }
  addPermissions(params: {
    roleId: string, permissions: number[]
  }):Observable<any>{
    return this.post(`role/permissions`, params)
  }

}
