import {Component, OnInit} from '@angular/core';
import {IWorkspace} from "../../../../core/interfaces";
import {WorkspaceService} from "../../../../core/services";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectFacade} from "../../../../facades/project.facade";
import {Subject} from "rxjs";
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-inner-workspace',
  templateUrl: './inner-workspace.component.html',
  styleUrls: ['./inner-workspace.component.scss']
})

export class InnerWorkspaceComponent implements  OnInit{
  workspace!:IWorkspace;
  loading: boolean = true;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  sub$ = new Subject();

  constructor(
    private projectFacade : ProjectFacade,
    private workspaceService: WorkspaceService,
    private route : ActivatedRoute,
  ) {

  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  selectProject(projectId: any) {
    // console.log("in selectProject: " , projectId)
    this.projectFacade.setProject(projectId)
  }

  ngOnInit(): void {
    // console.log("facade :", this.projectFacade.getProject())
    this.workspace = this.projectFacade.getProject()


    this.route.params.subscribe(params =>{
      // this.workspaceId = params['id']
      // console.log("in facade page: ", params);
      this.getOneProject(params['id']);
      // this.getOneProject(this.workspaceId)
    })
  }

  getOneProject(id: any){
    return this.workspaceService.getOneProject(id)
      .subscribe(res =>{
        this.loading  = true;
        this.workspace = res;
        this.loading = false;
        this.selectProject(res);
        // console.log("localstorage", id)
      })
  }
}

