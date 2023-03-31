import { ETaskStatus } from "../enums/task-status.enum";
import { ITask } from "./task";
import { IWorkspace } from "./workspace.interface";
import {User} from "./user";



export interface IBoard {
  id: number;
  name: string;
  description: string;
  position: number;
  projectId: number;
  user: User[];
  project: IWorkspace;
  columns: Column[];
  tasks: ITask[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface Column {
  id: number;
  name: string;
  description: string;
  position: number;
  taskStatus: ETaskStatus;
  boardId: number;
  board: string;
  tasks: ITask[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
