import {EIssueTypes} from "../enums/issue-type";

export interface IIssueType {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  type: EIssueTypes;
  issueTypeColumns: IssueTypeColumn[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}


export interface IssueTypeColumn {
  id: number;
  name: string;
  filedName: string;
  type: string;
  isRequired: boolean;
  issueTypeId: number;
  issueType: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
