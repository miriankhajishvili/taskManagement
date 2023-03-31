import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {catchError, map, of, startWith, Subject, switchMap, takeUntil} from "rxjs";
import {IRoles} from "../../../core/interfaces/roles";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {RoleService} from "../../../core/services/role.service";
import {DeletePopupComponent} from "../../../shared/popups/delete-popup/delete-popup.component";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnDestroy,AfterViewInit, OnInit{

  displayedColumns: string[] = ['id', 'name', 'type','createdAt', 'actions'];
  sub$ = new Subject();

  roles:IRoles[] = []
  dataSource = new MatTableDataSource<IRoles>();

  isLoading = false;

  totalData?: number;
  pageSizes = [5,10,20];
  @ViewChild('paginator') paginator!: MatPaginator;


  constructor(
    private roleService : RoleService,
    private route : ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) { }

  getRolesByParams(limit:number,pageIndex:number ){
    return this.roleService.getRolesByParams({
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
          return this.getRolesByParams(
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
        this.roles = empData;
        this.dataSource = new MatTableDataSource(this.roles);
      });
    // imistvis rom afterViewInit-is mere shecvlilma isLoading cvladma erori ar amoagdos
    this.cd.detectChanges()
  }

  ngOnInit(): void {
    // this.getWorkspaces()
    // this.getProjectsByParams(6,1)
  }

  deleteRole(id?: number):void {
    this.openDialog().afterClosed().subscribe(res=>{
        if(res){
          this.roleService.deleteRoles(String(id))
            .pipe(takeUntil(this.sub$))
            .subscribe(res=>{
              this.router.navigate(['/roles'])
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


  addRole() {

  }
}
