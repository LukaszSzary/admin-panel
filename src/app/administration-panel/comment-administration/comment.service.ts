import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as globals from '../../global'
import { ManageObjRequestBody } from '../manage-obj-request-body';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private discardReportURL: string = globals.apiLink + "/admin/verifyComment";
  private deleteCommentURL: string = globals.apiLink + "/admin/deleteComment";
  private getCommentsURL: string = globals.apiLink + "/admin/getReportedComments";
  
  private httpClient = inject(HttpClient);

  public discardReport(commentId: string): Observable<any>{
    return this.httpClient.patch<any>(this.discardReportURL, new ManageObjRequestBody(null, commentId));
  }

  public deleteComment(commentId: string): Observable<any>{
    return this.httpClient.delete<any>(
      this.deleteCommentURL, 
      {body: new ManageObjRequestBody(null, commentId)}
     );
  }


  public getComments(pageNo: number): Observable<any>{
    alert('commentservice implement');
    return this.httpClient.get(this.getCommentsURL,);
  }
}
