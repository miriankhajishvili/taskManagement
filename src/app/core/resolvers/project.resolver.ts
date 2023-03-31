import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {map, Observable, of} from 'rxjs';
import {WorkspaceService} from "../services";
import {ProjectFacade} from "../../facades/project.facade";

@Injectable({
  providedIn: 'root'
})
export class ProjectResolver implements Resolve<boolean> {
  constructor(
    private workspaceService: WorkspaceService,
    private projectFacade: ProjectFacade
  ) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const projectId: string = route.params['projectId']
    return this.workspaceService.getOneProject(projectId)
      .pipe(
        map(res=>{
          this.projectFacade.setProject(res)
          return true
        })
      );
  }
}
