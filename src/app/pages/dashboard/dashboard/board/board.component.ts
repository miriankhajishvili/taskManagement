import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Column, IBoard } from 'src/app/core/interfaces/board';
import { ITask } from 'src/app/core/interfaces/task';
import { BoardService } from 'src/app/core/services/board.service';
import { TaskService } from 'src/app/core/services/task.service';
import { TaskAddEditComponent } from 'src/app/shared/task-add-edit/task-add-edit.component';


import * as _ from 'lodash';
import {ProjectFacade} from "../../../../facades/project.facade";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit{

  boardId!: number;
  workspace  = this.projectFacade.getProject();
  board: IBoard = {} as IBoard;
  tasks: any = {}

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private taskService:TaskService,
    private projectFacade: ProjectFacade
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.boardId = +params['id']
        this.getBoard()
      }
    })
  }
  getBoard() {
    this.boardService.getBoard(this.boardId).subscribe(board => {
      // console.log(board)
      this.board = board
      this.getTasks()
    })
  }
  drop(event: CdkDragDrop<any>, column: Column) {
    // console.log(event.container)

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const tasks: ITask[] = event.container.data.map((task: ITask, index: number) => {
        return {
          ...task,
          taskStatus: column.taskStatus,
          boardColumnId: column.id,
        }
      })

      this.tasks[column.id] = tasks
      const currentTask = tasks[event.currentIndex]
      // console.log(currentTask)
      this.taskService.updateTask(currentTask.id, currentTask).subscribe(task => {

        // console.log(task)
        this.getTasks()
      })
    }

}
addTask(column: Column) {
  const  doalogRef = this.dialog.open(TaskAddEditComponent, {
    width: '1000px',
    data: {
      boardId: this.boardId,
      column: column
    },
  });

  doalogRef.afterClosed().subscribe((task: ITask) => {
    if (task) {
      this.getTasks()
    }
  })
}



private getTasks() {
  this.taskService.getTasks({boardId: this.boardId}).subscribe(tasks => {
    this.tasks = _.groupBy(tasks, 'boardColumnId')
  })
}
viewTask(task: ITask, column: Column) {
  const  doalogRef = this.dialog.open(TaskAddEditComponent, {
    width: '1000px',
    data: {
      boardId: this.boardId,
      column: column,
      taskId: task.id
    },
  });
  doalogRef.afterClosed().subscribe((task: ITask) => {
    if (task) {
      this.getTasks()
    }
  })
}

}
