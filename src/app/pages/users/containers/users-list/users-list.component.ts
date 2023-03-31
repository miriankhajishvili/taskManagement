import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {catchError, map, of, startWith, Subject, switchMap, takeUntil} from "rxjs";
import {UsersService} from "../../../../core/services/users.service";
import { QueryTable, User} from "../../../../core/interfaces";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {DeletePopupComponent} from "../../../../shared/popups/delete-popup/delete-popup.component";
import {AddOrEditUsersComponent} from "../../components/add-or-edit-users/add-or-edit-users.component";
import {AddRoleComponent} from "../../components/add-role/add-role.component";



@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {


  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'mobileNumber','roles', 'createdAt', 'actions'];
  sub$ = new Subject();
  user: User[] = []
  empTable!: QueryTable<User>;
  isLoading = false;
  chooseUserActive = false;

  totalData?: number;
  pageSizes = [5, 7];
  dataSource = new MatTableDataSource<User>();

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef

  ) {
  }


  getUser(limit:number,pageIndex:number ) {
    return this.usersService.getUsers({
      page: pageIndex,
      totalCount: length,
      limit: limit
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // console.log(this.paginator.page)
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.getUser(
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
        this.user = empData;
        this.dataSource = new MatTableDataSource(this.user);
      });
    this.cd.detectChanges()
  }

  ngOnInit(): void {
    // this.getUser()

  }

  addUser(id?: number) {
    const dialogRef = this.dialog.open(AddOrEditUsersComponent, {
      data: {
        userId: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    })
  }
  addRole(user: User) {
    const dialogRef = this.dialog.open(AddRoleComponent, {
      data: {
        user: user,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.getUsersall()
      }
    })
  }


  deleteProject(id?: number): void {
    this.openDialog()
      .afterClosed()
      .subscribe(res => {
          if (res) {
            this.usersService.deleteUser(String(id))
              .pipe(takeUntil(this.sub$))
              .subscribe(res => {
                this.router.navigate(['/users'])
              })
          }
        }
      )
  }

  openDialog() {
    return this.dialog.open(DeletePopupComponent, {
      width: '250px',
    });
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete()
  }

}
