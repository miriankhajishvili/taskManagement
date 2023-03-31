import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {WorkspaceService} from "../../../../../core/services";
import {Subject, takeUntil} from "rxjs";
import {User} from "../../../../../core/interfaces";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DeletePopupComponent} from "../../../../../shared/popups/delete-popup/delete-popup.component";
import {AddMemberComponent} from "./add-member/add-member.component";
import {ProjectFacade} from "../../../../../facades/project.facade";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements  OnInit,AfterViewInit, OnDestroy{

  displayedColumns: string[] = ['id', 'name','email','createdAt','updatedAt','actions'];
  sub$ = new Subject();
  isLoading = false;
  loading: boolean = false;
  totalData?: number;
  pageSizes = [5,10,20];
  @ViewChild('paginator') paginator!: MatPaginator;


  dataSource = new MatTableDataSource<User>();
  members: User[] = [];
  constructor(
    private workspaceService: WorkspaceService,
    private projectFacade: ProjectFacade,
    private route : ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    // this.getMembers()
  }
  get project(){
    return this.projectFacade.getProject()
  }

  getMembers(){
    return this.workspaceService.getProjectUsers()
      .pipe(takeUntil(this.sub$))
      .subscribe(res=>{
        // console.log("get members",res)
        this.members =res;
        this.dataSource =  new MatTableDataSource<User>(this.members);
        this.dataSource.paginator = this.paginator;
        this.isLoading =false
        this.loading = false
      })
  }
  ngAfterViewInit() {
    this.isLoading = true
    this.loading =true
    this.getMembers()
    // imistvis rom afterViewInit-is mere shecvlilma isLoading cvladma errori ar amoagdos
    this.cd.detectChanges()
  }
  delete(id: number):void {
    this.openDialog().afterClosed().subscribe(res=>{
        if(res){
          this.workspaceService.deleteUsersFromWorkspace(id)
            .pipe(takeUntil(this.sub$))
            .subscribe(res=>{
              this.getMembers()
            })
        }
      }
    )
  }
  addMember(mems:User[]) {
    const dialogRef = this.dialog.open(AddMemberComponent,{
      data:{
        project: this.project,
        mems:mems
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log("after dialog closed")
        this.getMembers();
      }
    })
  }
  openDialog(){
    return  this.dialog.open(DeletePopupComponent, {
      width: '250px',
    });
  }
  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }
}
