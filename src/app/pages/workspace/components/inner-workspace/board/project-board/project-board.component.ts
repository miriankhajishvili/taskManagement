import {AfterViewInit, Component, OnDestroy, OnInit, ChangeDetectorRef} from '@angular/core';

import {Observable, of, Subject, switchMap, takeUntil} from "rxjs";

import {DataSource} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import { BoardService } from 'src/app/core/services/board.service';
import { IBoard } from 'src/app/core/interfaces/board';
import { DeletePopupComponent } from 'src/app/shared/popups/delete-popup/delete-popup.component';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns = ['id', 'name', 'createdAt', 'actions'];

  dataSource = new MatTableDataSource<IBoard>();

  sub$ = new Subject();

  isLoading = false;

  totalData?: number;
  pageSizes = [5,10,20];

  constructor(
    private boardService: BoardService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {

  }


  ngOnInit(): void {
    this.getBoards();
  }

  getBoards() {
    this.boardService.getBoards()
      .pipe(takeUntil(this.sub$))
      .subscribe(boards => {
        this.dataSource.data = boards;
        this.isLoading =false
      });
  }

  addBoard() {
    // console.log('add boards');
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }

  deleteBoard(id: number) {
    const dialogRef = this.dialog.open(DeletePopupComponent);

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.sub$),
        switchMap((result) => {
          if (result) {
            return this.boardService.deleteBoard(id);
          }
          return of(null);
        })
      )
      .subscribe(result => {
        if (result) {
          this.getBoards();
        }
      });


  }

  ngAfterViewInit(): void {
    this.isLoading = true
    this.getBoards()
    this.cd.detectChanges()




  }

}
