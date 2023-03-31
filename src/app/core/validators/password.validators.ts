import { AbstractControl } from "@angular/forms";

export class PasswordValidate {
  static passwordMatch(control: AbstractControl){
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

 
  if(password?.value === confirmPassword?.value){
    return null
  }
confirmPassword?.setErrors({passwordMismatch: true});
return {passwordMismatch: true};

}
}