import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post } from './post';
import { Observable, of } from 'rxjs';
import { DeletePostRequest } from './deletePostRequest';
import * as globals from '../../global'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private deletePostURL: string = globals.apiLink  + "/post/deletePost";
  private apiURL: string = globals.apiLink + "";
  private httpClient = inject(HttpClient);


  public discardReport(postId: string): Observable<any>{
    return this.httpClient.post<any>(this.apiURL, postId);
  }

  public deletePost(postId: string): Observable<any>{ 
    return this.httpClient.post<any>(
      this.deletePostURL, 
      new DeletePostRequest(postId));
  }

  public banUser(postId: string): Observable<any>{
    return this.httpClient.post<any>(this.apiURL, postId);
  }

  public getPosts(pageNo: number): Observable<any>{
    return of([
      {
        id: 'ds',
        title: 'title',
        file: null,
    },
    {
      id: 'gfds',
      title: 'title',
      file: null,
    },
    {
      id: '5t',
      title: 'title',
      file: null,
    },
    {
      id: 'dsad',
      title: 'title',
      file: null,
    },
    {
    id: 'ds;l/',
    title: 'title',
    file: null,
    },      
    {
    id: 'dfgs',
    title: 'title',
    file: null,
    },
    {
    id: 'ddgs',
    title: 'title',
    file: null,
    },
    {
      id: '1ddgs',
      title: 'title',
      file: null,
      },
    ]);
  }  
}
