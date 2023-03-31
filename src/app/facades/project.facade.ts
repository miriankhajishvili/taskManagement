import { Injectable } from '@angular/core';
import {IWorkspace} from "../core/interfaces";

@Injectable({
  providedIn: 'root'
})
export class ProjectFacade {

  constructor() { }


  setProject(project: IWorkspace):void{
    // console.log("in setProkect: ", project)
    if(project && project.id){
      localStorage.setItem('project',JSON.stringify(project))
    }
  }
  getProject():IWorkspace{
   const proj = localStorage.getItem('project');
   return proj? JSON.parse(proj): null
  }


}
