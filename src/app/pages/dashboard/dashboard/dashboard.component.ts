import {Component, OnInit} from '@angular/core';
import { BoardService } from 'src/app/core/services/board.service';
import {ProjectFacade} from "../../../facades/project.facade";
import {IWorkspace} from "../../../core/interfaces";
import {ActivatedRoute} from "@angular/router";
import {WorkspaceService} from "../../../core/services";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // implements OnInit{

  constructor(
    private boardService: BoardService,
    private projectFacade: ProjectFacade,
    private workspaceService: WorkspaceService,

    private route : ActivatedRoute,
  ) {}

  boards$ = this.boardService.getBoards()

  boardId: number | null = null
  workspace! :IWorkspace;
  workspace$ = this.projectFacade.getProject();
  //
  // ngOnInit(): void {
  //   // console.log("facade :", this.projectFacade.getProject())
  //   this.route.params.subscribe(params =>{
  //     // this.workspaceId = params['id']
  //     console.log("in facade page: ", params);
  //     this.getOneProject(params['projectId']);
  //     // this.getOneProject(this.workspaceId)
  //   })
  //   this.workspace = this.projectFacade.getProject()
  // }
  //
  // selectProject(projectId: any) {
  //   console.log("in selectProject: " , projectId)
  //   this.projectFacade.setProject(projectId)
  // }
  //
  // getOneProject(id: any){
  //   return this.workspaceService.getOneProject(id)
  //     .subscribe(res =>{
  //       this.workspace = res;
  //       this.selectProject(res);
  //       // console.log("localstorage", id)
  //     })
  // }
}
