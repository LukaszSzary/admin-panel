import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ManageObjRequestBody } from '../manage-obj-request-body';
import { Observable, of } from 'rxjs';
import * as globals from '../../global'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private deletePostURL: string = globals.apiLink  + "/post/deletePost";
  private discardReportURL: string = globals.apiLink  + "/post/verifyPost";
  private getPostsURL: string = globals.apiLink  + "/post/getReportedPosts";
  
  private httpClient = inject(HttpClient);


  public discardReport(postId: string): Observable<any>{
    return this.httpClient.patch<any>(this.discardReportURL, new ManageObjRequestBody(postId, null));
  }

  public deletePost(postId: string): Observable<any>{ 
    return this.httpClient.delete(
      this.deletePostURL, 
      {body: new ManageObjRequestBody(postId, null)});
  }


  public getPosts(pageNo: number): Observable<any>{
    return this.httpClient.get(this.getPostsURL);
  }  
}
