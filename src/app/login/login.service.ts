import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from '../global';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { GetRoleService } from './get-role.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private loginUserUrl = myGlobals.apiLink + '/authentication/noAuth/login';
  private logOutUrl = myGlobals.apiLink + '/authentication/logout';
  private httpClient = inject(HttpClient);
  private getRoleService = inject(GetRoleService);
  private router = inject(Router);

  loginUser(authString: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic ' + authString
    ); // Adding the Authorization header
    return this.httpClient.post<any>(
      this.loginUserUrl,
      {},
      { headers, observe: 'response' }
    );
  }

  logOut(): Observable<any> {
    this.getRoleService.setAuthStatus(false);
    this.router.navigate(['/']);
    return this.httpClient.delete<any>(this.logOutUrl);
  }
}
