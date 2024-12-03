import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as globals from '../global'

@Injectable({
  providedIn: 'root'
})
export class BanUserService {
  
  private deletePostURL: string = globals.apiLink  + "/post/deletePost";
  private apiURL: string = globals.apiLink + "";
  private httpClient = inject(HttpClient);

    public banUser(userId: string): Observable<any>{
    return this.httpClient.post<any>(this.apiURL, userId);
  }
}