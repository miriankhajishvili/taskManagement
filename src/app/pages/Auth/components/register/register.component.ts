import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services';
import { PasswordValidate } from 'src/app/core/validators/password.validators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true
  hideConfirmPassword=true
  get getEmail(){
    return this.form.get('email')
  }
  get getPassword(){
    return this.form.get('password')
  }

  get confirmPassword(){
    return this.form.get('confirmPassword')
  }

form: FormGroup = new FormGroup({
  firstName: new FormControl('', Validators.required),
  lastName: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(25)]),
  confirmPassword: new FormControl('',)

}, {validators:PasswordValidate.passwordMatch})

constructor(

  private authService: AuthService,
  private router: Router
){

}
ngOnInit(): void {


  
}

submit(){
  this.authService.register(this.form.value).subscribe(res => {
    this.router.navigate(['/auth/login'])
  })
  
}

  
}
