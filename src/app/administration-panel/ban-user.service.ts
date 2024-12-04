import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as globals from '../global'
import { BanUserRequestBody } from './ban-user-request-body';

@Injectable({
  providedIn: 'root'
})
export class BanUserService {
  
  private banUserURL: string = globals.apiLink  + "/admin/banUser";

  private httpClient = inject(HttpClient);

    public banUser(username: string): Observable<any>{
    return this.httpClient.patch<any>(this.banUserURL, new BanUserRequestBody(username));
  }
}