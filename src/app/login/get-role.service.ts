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
  
  private getRoleINTERNAL(): Observable<any>{
    /*
    const headers = new HttpHeaders({
     // 'Content-Type': 'application/json',
      //'Authorization': 'Bearer your-token-if-applicable'
    });
    */

    return this.httpClient.get(this.whoAmIUrl, );
     
  }

  public async getRole(){
    try{
      const response = await firstValueFrom(this.getRoleINTERNAL());
     // console.log(response.user.role);
      
      return response.user.role 
    }
    catch (err){
      return false;
    }
  }

  public async ifAdminLogged() {
    try{
      const response = await firstValueFrom(this.getRoleINTERNAL());
     // console.log(response.user.role);
      
      return response.user.role !== "ADMIN";
    }
    catch (err){
      return false;
    }
  }

}
