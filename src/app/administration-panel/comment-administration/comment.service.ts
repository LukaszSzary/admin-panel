import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Comment } from './comment';
import { Observable, of } from 'rxjs';
import * as globals from '../../global'
import { DeleteCommentRequest } from './deleteCommentRequest';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private deleteCommentURL: string = globals.apiLink + "/comment/deleteComment";
  private apiURL: string = globals.apiLink  + "";
  
  private httpClient = inject(HttpClient);

  public discardReport(commentId: string): Observable<any>{
    return this.httpClient.post<any>(this.apiURL, commentId);
  }

  public deleteComment(postId: string, commentId: string): Observable<any>{
    return this.httpClient.post<any>(
      this.deleteCommentURL, 
      new DeleteCommentRequest(postId, commentId)
     );
  }

  public banUser(postId: string, commentId: string): Observable<any>{
    return this.httpClient.post<any>(this.apiURL, commentId);
  }

  public getComments(pageNo: number): Observable<Comment[]>{
    return of([
    {
    postId: 'gdg',  
    id: 'FSDFDG',
    userName: 'Tomek',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    postedOn: new Date('2001-12-31'),
    },
    {
      postId: 'gdg',
      id: 'FSGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      postId: 'gdg',
      id: 'FSDFDRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      postId: 'gdg',
      id: 'DFDGFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      postId: 'gdg',
      id: 'FSDFDGFkBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      postId: 'gdg',
      id: 'FSyuFRBVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    },
    {
      postId: 'gdg',
      id: 'FSDFDvVBD',
      userName: 'Tomek',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
      postedOn: new Date('2001-12-31'),
    }
  ]);
    
  }
}
