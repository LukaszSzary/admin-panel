import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Comment } from './comment';
import { Observable, of } from 'rxjs';
import * as globals from '../../global'

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiURL: string = "";

  private httpClient = inject(HttpClient);
  constructor() { }

  getComments(pageNo: number): Observable<Comment[]>{
    return of([
    {
    id: 'FSDFDG',
    userName: 'Tomek',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'DFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDGFkBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSyuFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      id: 'FSDFDvVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    }
  ]);
    
  }
}
