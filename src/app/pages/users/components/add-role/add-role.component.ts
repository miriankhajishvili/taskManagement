import {Component, Inject} from '@angular/core';
import {FormBuilder,  FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {RoleService} from "../../../../core/services/role.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../../core/interfaces";
import {UsersService} from "../../../../core/services/users.service";
import {IRoles} from 'src/app/core/interfaces/roles';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent {
  form: FormGroup = new FormGroup({
    // roles: new FormControl([], Validators.required)
  });

  roles$: Observable<IRoles[]> = this.roleService.getAllRoles();

  constructor(
    public dialogRef: MatDialogRef<AddRoleComponent>,
    private usersService: UsersService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
  ) {
  }

  ngOnInit(): void {
    if (this.data.user.roles) {
      this.form = this.formBuilder.group({
        roles: [this.data.user.roles.map((e: IRoles) => e.id), [Validators.required]]
      })
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const {roles} = this.form.value;
    this.usersService.setRoles({
      userId: this.data.user.id,
      roleIds: roles
    })
      .subscribe(() => {
        this.dialogRef.close(true);
      })
  }
}
