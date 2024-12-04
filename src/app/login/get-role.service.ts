import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../global';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetRoleService {
  private whoAmIUrl: string = myGlobals.apiLink  + "/authentication/noAuth/whoAmI";

  private httpClient = inject(HttpClient);
  
  public async ifAdminLogged() {
    try{
      const response: any = await firstValueFrom(this.httpClient.get(this.whoAmIUrl, ));
      console.log(response.user.role);
      
      return response.user.role === "ADMIN";
    }
    catch (err){
      return false;
    }
  }

}
