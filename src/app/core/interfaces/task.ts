import { IEpic } from "./epic";
import { IIssueType } from "./issue-type";
import {User} from "./user";
import { IWorkspace } from "./workspace.interface";
import {Column, IBoard} from "./board";

export interface ITask {
  id: number;
  name: string;
  description: string;
  issueTypeId: number;
  issueType: IIssueType;
  epicId: number;
  epic: IEpic;
  projectId: number;
  project: IWorkspace;
  boardId: number;
  board: IBoard;
  boardColumnId: number;
  boardColumn: Column;
  isBacklog: boolean;
  priority: string;
  taskStatus: string;
  assigneeId: number;
  assignee: User;
  reporterId: number;
  reporter: User;
  createdById: number;
  createdBy: User;
  deletedById: number;
  deletedBy: User;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  taskProperty: ITaskProperty[];
}

export interface ITaskProperty {
  id: number;
  name: string;
  filedName: string;
  value: string;
  isRequired: boolean;
}

