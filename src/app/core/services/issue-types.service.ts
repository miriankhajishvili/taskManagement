import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {IIssueType} from "../interfaces/issue-type";
import {IQueryTable} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class IssueTypesService  extends BaseService{


  addIssueType(param: IIssueType):Observable<IIssueType>{
    return this.post<IIssueType>('issue-type', param)
  }

  editIssueType(id:string, editedProject:IIssueType):Observable<IIssueType>{
    return  this.put<IIssueType>(`issue-type/${id}`, editedProject);
  }

  getAllIssueTypes() :Observable<IIssueType[]>{
    return this.get<IIssueType[]>(`issue-type`)
  }
  getIssueType(id:string) :Observable<IIssueType>{
    return this.get<IIssueType>(`issue-type/${id}`)
  }
  getIssueTypesByParams(params= {}) :Observable<IQueryTable<IIssueType>>{
    return this.get<IQueryTable<IIssueType>>(`issue-type`, params)
  }

  deleteIssueType(id:string){
    return this.delete(`issue-type/${id}`);
  }
}
