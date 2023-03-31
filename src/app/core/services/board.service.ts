import { Injectable } from '@angular/core';
import { IBoard } from '../interfaces/board';
import { BaseService } from './base.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BoardService extends BaseService {

  getBoards(): Observable<IBoard[]>{
    return this.get<IBoard[]>('board')
  }

  getBoardsWithHeader(headerValue :any): Observable<IBoard[]>{
    return this.getHeader<IBoard[]>('board', headerValue)
  }
  getBoard(id: number): Observable<IBoard> {
    return this.get<IBoard>(`board/${id}`);
  }

  createBoard(data: any): Observable<IBoard> {
    return this.post<IBoard>('board', data);
  }

  updateBoard(data: any): Observable<IBoard> {
    return this.put<IBoard>(`board/${data.id}`, data);
  }

  deleteBoard(id: number): Observable<any> {
    return this.delete(`board/${id}`);
  }
}


