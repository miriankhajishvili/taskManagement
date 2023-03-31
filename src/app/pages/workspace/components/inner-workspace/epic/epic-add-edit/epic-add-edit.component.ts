import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {ProjectFacade} from "../../../../../../facades/project.facade";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {EpicService} from "../../../../../../core/services/epic.service";

@Component({
  selector: 'app-epic-add-edit',
  templateUrl: './epic-add-edit.component.html',
  styleUrls: ['./epic-add-edit.component.scss']
})
export class EpicAddEditComponent   implements OnDestroy, OnInit {
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),

  })
  errorMsg?: string;
  editId!:string;
  projectID?: number
  sub$ = new Subject();
  constructor(
    private epicService: EpicService,
    private projectFacade: ProjectFacade,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.projectID = this.projectFacade.getProject().id
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editId = params['id'];
        this.getEpic(this.editId)
      }
    })
  }
  getEpic(id:string){
    return this.epicService.getEpic(id)
      .pipe(takeUntil(this.sub$))
      .subscribe(res=>{
        this.form.patchValue(res)
      })
  }
  submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) return;

    if(this.editId){
      this.epicService.editEpic(this.editId, this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe({
            next: res =>{
              if (this.errorMsg){
                this.errorMsg = ""
              }
              this.router.navigate(['work/inner/', this.projectID,'epics']).then()
            },
            error: err=>{
              this.errorMsg = err.error.message;
            }
          }
        )

    }else {
      this.epicService.addEpic(this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe({
            next: res =>{
              if (this.errorMsg){
                this.errorMsg = ""
              }
              this.router.navigate(['work/inner/', this.projectID,'epics']).then()
            },
            error: err=>{
              this.errorMsg = err.error.message;
            }
          }
        )
    }
  }

  ngOnDestroy(): void {
    this.sub$.next(null)
    this.sub$.complete();
  }

}
