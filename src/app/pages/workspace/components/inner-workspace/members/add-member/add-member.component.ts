import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IWorkspace, User} from "../../../../../../core/interfaces";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {UsersService} from "../../../../../../core/services/users.service";
import {WorkspaceService} from "../../../../../../core/services";

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit{
  // form: FormGroup = new FormGroup({});
  // members$: Observable<User[]> = this.usersService.getUsers();


  form: FormGroup = new FormGroup({
    // members: new FormControl([], Validators.required)
  });

  members$: Observable<User[]> = this.usersService.getUsersall();
  addedMembers:User[] = []
  loading: Boolean  = false;
  memIds: number[]=[]
  allUsers:User[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { project: IWorkspace, mems: User[] },
    public dialogRef: MatDialogRef<AddMemberComponent>,
    private usersService: UsersService,
    private workspaceService: WorkspaceService,
    private formBuilder: FormBuilder,
  ) {

  }
  setWorkspaceMembers(){
    return this.workspaceService.getProjectUsers()
      .pipe(
        map(re=> {
          re.forEach((each:any)=>{
            this.memIds.push(each.id)
            return each.id
          })
        })
      ).subscribe(res=>{
        this.loading = false
        this.form = this.formBuilder.group({
          members:[this.memIds , [Validators.required]]
        })
    })
  }
  getAllUsers(){
    return this.usersService.getUsersall()
      .subscribe(res=>{
        // console.log("users: ",res)
        this.allUsers = res
      })
  }
  // ngOnInit(): void {
  //   this.loading = true
  //   this.getAllUsers();
  //   this.setWorkspaceMembers()
  // }
  ngOnInit(): void {
    if (this.data.mems) {
      // console.log("mems", this.data.mems)

      this.form = this.formBuilder.group({
        members:[this.data.mems.map((r:User) => r.id), [Validators.required]]
      })
      // this.form.patchValue({
      //   roles: this.data.mems.map((r:User) => r.id)
      // })
    }
  }
  submit() {
    if (this.form.invalid) return;
    if (!this.data.project.id) return;

    const {members} = this.form.value;
    // console.log("on submit values",members)
    this.workspaceService.addUsersToWorkspace({
      projectId: this.data.project.id,
      userIds:members
    })
      .subscribe((res) => {
        this.dialogRef.close(true);
      })
  }





}
