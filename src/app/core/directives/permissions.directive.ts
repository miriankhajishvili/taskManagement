import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {AuthFacade} from "../../facades/auth.facade";

@Directive({
  selector: '[appPermissions]',
  standalone:true
})
export class PermissionsDirective implements AfterViewInit{
  @Input() appPermissions:string[] = []
  constructor(
    private authFacade: AuthFacade,
    private elementRef: ElementRef<HTMLElement>,
  ) { }

  hasPermission(){
    const userPerms = this.authFacade.permissions;

    return userPerms.some(permission => this.appPermissions.includes(permission));
  }
  ngAfterViewInit() {
    // console.log(this.elementRef.nativeElement)
    if(!this.hasPermission()){
      this.elementRef.nativeElement.remove()
    }
  }
}
