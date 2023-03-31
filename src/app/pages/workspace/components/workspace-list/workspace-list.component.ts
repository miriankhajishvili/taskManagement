import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IWorkspace,IQueryTable} from "../../../../core/interfaces";
import {catchError, map, of, startWith, Subject, switchMap, takeUntil} from "rxjs";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {WorkspaceService} from "../../../../core/services";
import {MatTableDataSource} from "@angular/material/table";
import {DeletePopupComponent} from "../../../../shared/popups/delete-popup/delete-popup.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-workspace-list',
  templateUrl: './workspace-list.component.html',
  styleUrls: ['./workspace-list.component.scss']
})
export class WorkspaceListComponent implements OnDestroy,AfterViewInit, OnInit{

  displayedColumns: string[] = ['id', 'name', 'abbreviation',  'description', 'color','createdAt','updatedAt','actions'];
  sub$ = new Subject();


  workspaces:IWorkspace[] = [] // EmpData

  empTable!: IQueryTable<IWorkspace>;
  isLoading = false;

  totalData?: number;
  pageSizes = [5,10,20];
  dataSource = new MatTableDataSource<IWorkspace>();

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private workspaceService : WorkspaceService,
    private route : ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) { }

  getWorkspaces(){
    return this.workspaceService.getAllWorkspaces()
      .pipe(takeUntil(this.sub$))
      .subscribe(res=>{
        this.workspaces =res;
        this.dataSource =  new MatTableDataSource<IWorkspace>(this.workspaces);
        this.dataSource.paginator = this.paginator;
        // console.log(this.paginator)
      })
  }

  getProjectsByParams(limit:number,pageIndex:number ){
    return this.workspaceService.getProjectsByParams({
      page:pageIndex,
      totalCount:length,
      limit:limit
    })
      // .pipe(takeUntil(this.sub$))
      // .subscribe(res=>{
      //   console.log("asdasd")
      //   this.workspaces = res;
      //   this.dataSource =  new MatTableDataSource<IWorkspace>(this.workspaces);
      //   console.log(this.pageEvent)
      // })
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // console.log(this.paginator.page)
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.getProjectsByParams(
            this.paginator.pageSize,
            this.paginator.pageIndex + 1
          ).pipe(catchError(() => of(null)));
        }),
        map((empData) => {
          // console.log("empData", empData)
          if (empData == null) return [];
          this.totalData = empData.totalCount;
          this.isLoading = false;
          return empData.data;
        })
      )
      .subscribe((empData) => {
        // console.log(empData)
        this.workspaces = empData;
        this.dataSource = new MatTableDataSource(this.workspaces);
      });
    // imistvis rom afterViewInit-is mere shecvlilma isLoading cvladma erori ar amoagdos
    this.cd.detectChanges()
  }

  ngOnInit(): void {
    // this.getWorkspaces()
    // this.getProjectsByParams(6,1)
  }

  deleteProject(id?: number):void {
    this.openDialog().afterClosed().subscribe(res=>{
        if(res){
          this.workspaceService.deleteProject(String(id))
            .pipe(takeUntil(this.sub$))
            .subscribe(res=>{
              this.router.navigate(['/home'])
            })
        }
      }
    )
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
