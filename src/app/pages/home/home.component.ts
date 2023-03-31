import {Component, OnDestroy} from '@angular/core';
import {map, Observable, Subject, takeUntil, tap} from "rxjs";
import {IWorkspace} from "../../core/interfaces";
import {WorkspaceService} from "../../core/services/workspace.service";
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {IBoard} from "../../core/interfaces/board";
import {BoardService} from "../../core/services/board.service";
import {ProjectFacade} from "../../facades/project.facade";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../../core/services/task.service";
import {ITask} from "../../core/interfaces/task";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy{
  // getWorkspacesForMyUser$: Observable<IWorkspace[]> = this.workspaceService.getAllWorkspacesForUser();
  getWorkspacesForMyUser :IWorkspace[] = []
  eachworkBoards?: IBoard
  tasks:ITask[]= [];

  sub$ = new Subject();
  firstLetter!: string;
  loading: Boolean = false;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  constructor(
    private workspaceService:WorkspaceService,
    private taskService:TaskService,
    private projectFacade: ProjectFacade,
    private  router : Router,

  ) {
    this.getAllWorkspaces()
    this.getTasks()
  }

  goToDashboard(id: number, workspaceID:any) {
    let proj
    this.workspaceService.getOneProject(workspaceID)
      .pipe(takeUntil(this.sub$))
      .subscribe(res =>{
        proj = res
        // console.log("proj", proj)
        this.projectFacade.setProject(proj)
        this.router.navigate(['dashboard/',workspaceID, id])
      } )
  }
  getAllWorkspaces(){
    this.loading  = true
    return this.workspaceService.getProjectBoards()
      .pipe(
        takeUntil(this.sub$)
      )
      .subscribe(res =>{
        // console.log("workspaces with boards",res)
        this.loading = false
        this.getWorkspacesForMyUser = res

    })
  }
  getTasks(){
    return this.taskService.getMyTasks()
      .pipe(takeUntil(this.sub$))
      .subscribe(res=>{
        this.tasks = res
        // console.log(res)
      })
  }
  getFirstLetter(a:string){
    return a.charAt(0)
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }
}
