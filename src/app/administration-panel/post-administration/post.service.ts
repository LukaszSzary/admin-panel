import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post } from './post';
import { Observable, of } from 'rxjs';
import * as globals from '../../global'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL: string = globals + "";
  
  private httpClient = inject(HttpClient);

  public discardReport(postId: string): Observable<any>{
    return this.httpClient.post<any>(this.apiURL, postId);
  }

  public deletePost(postId: string): Observable<any>{
    return this.httpClient.post<any>(this.apiURL, postId);
  }

  public banUser(postId: string): Observable<any>{
    return this.httpClient.post<any>(this.apiURL, postId);
  }

  public getPosts(pageNo: number): Observable<any>{
    return of('');
  }  
}
