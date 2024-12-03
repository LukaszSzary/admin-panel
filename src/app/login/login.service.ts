import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from '../global';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class LoginService {

  private url = myGlobals.apiLink + '/authentication/noAuth/login';
  private httpClient = inject(HttpClient);

  loginUser(authString: string): Observable<any>{
    const headers = new HttpHeaders()
    .set('Authorization','Basic ' + authString); // Adding the Authorization header
  return this.httpClient.post<any>(this.url, {} ,{ headers, observe: 'response' });
  }

 
}
