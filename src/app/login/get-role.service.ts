import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../global';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetRoleService {
  private whoAmIUrl: string =
    myGlobals.apiLink + '/authentication/noAuth/whoAmI';
  private httpClient = inject(HttpClient);

  private isAuthenticatedSubject = new BehaviorSubject<boolean | null>(null);
  isAuthenticated$: Observable<boolean | null> =
    this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.updateAuthStatus();
  }

  public async ifAdminLogged() {
    try {
      const response: any = await firstValueFrom(
        this.httpClient.get(this.whoAmIUrl)
      );
      console.log(response.user.role);

      return response.user.role === 'ADMIN';
    } catch (err) {
      return false;
    }
  }

  updateAuthStatus() {
    this.checkAuthStatusFromApi().subscribe((res) => {
      console.log(res.user.role);
      this.isAuthenticatedSubject.next(res.user.role == 'ADMIN');
    });
  }

  setAuthStatus(isAuthenticated: boolean) {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  checkAuthStatusFromApi(): Observable<any> {
    return this.httpClient.get(this.whoAmIUrl);
  }
}
