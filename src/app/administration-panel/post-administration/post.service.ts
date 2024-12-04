import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ManageObjRequestBody } from '../manage-obj-request-body';
import { Observable} from 'rxjs';
import * as globals from '../../global'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private deletePostURL: string = globals.apiLink  + "/admin/deletePost";
  private discardReportURL: string = globals.apiLink  + "/admin/verifyPost";
  private getPostsURL: string = globals.apiLink  + "/admin/getReportedPosts";
  
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
    alert('postservice implement');
    return this.httpClient.get(this.getPostsURL,);
  }  
}
