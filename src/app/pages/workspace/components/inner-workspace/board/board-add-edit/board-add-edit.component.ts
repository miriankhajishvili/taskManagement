import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import { ETaskStatus } from 'src/app/core/enums/task-status.enum';
import { BoardService } from 'src/app/core/services/board.service';
import { IWorkspace } from 'src/app/core/interfaces';
import { ProjectFacade } from 'src/app/facades/project.facade';

@Component({
  selector: 'app-board-add-edit',
  templateUrl: './board-add-edit.component.html',
  styleUrls: ['./board-add-edit.component.scss']
})
export class BoardAddEditComponent implements OnInit {

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    position: new FormControl(1, Validators.required),
    description: new FormControl(null, Validators.required),
    columns: new FormArray([], Validators.required),
  })
  taskStatuses = Object.values(ETaskStatus);

  boardId!: number;
  workspace!: IWorkspace

  get columnsFormArray() {
    return this.form.get('columns') as FormArray;
  }

  constructor(
    private readonly boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute,
    private projectfacade: ProjectFacade
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.boardId = +params['id'];
        this.getBoard()
      }
    })
    this.workspace = this.projectfacade.getProject()
    // console.log(this.workspace)
  }

  getBoard() {
    this.boardService.getBoard(this.boardId).subscribe(res => {
      this.form.patchValue(res)
      res.columns.forEach(column => {
        this.columnsFormArray.push(new FormGroup({
          id: new FormControl(column.id),
          name: new FormControl(column.name, Validators.required),
          description: new FormControl(column.description, Validators.required),
          position: new FormControl(column.position, Validators.required),
          taskStatus: new FormControl(column.taskStatus, Validators.required)
        }, Validators.required));
      })
    })
  }

  addColumn() {
    this.columnsFormArray.push(new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      position: new FormControl(this.columnsFormArray.length + 1, Validators.required),
      taskStatus: new FormControl(ETaskStatus.ToDo, Validators.required)
    }, Validators.required));
  }

  deleteColumn(i: number){
    this.columnsFormArray.removeAt(i)
  }



  save() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      return;
    }
    if (this.boardId) {
      this.boardService.updateBoard(this.form.value)
        .subscribe( res => {
          this.router.navigate(['/work/inner', this.workspace.id, 'board']).then()
        })
    } else {
      this.boardService.createBoard(this.form.value)
        .subscribe( res => {
          this.router.navigate(['/work/inner', this.workspace.id, 'board']).then()
        })
    }


  }

  drop(event: CdkDragDrop<any, any>) {
    moveItemInArray(this.columnsFormArray.controls, event.previousIndex, event.currentIndex);
    // console.log(this.columnsFormArray.controls)
    this.columnsFormArray.controls.forEach((control, index) => {
      control.get('position')?.setValue(index + 1)
    })
  }
}
