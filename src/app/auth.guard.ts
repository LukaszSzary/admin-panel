import { CanActivateChildFn, Router } from '@angular/router';
import { GetRoleService } from './login/get-role.service';
import { inject } from '@angular/core';



export const authGuard: CanActivateChildFn = async (childRoute, state) => {
  const getRoleService = inject(GetRoleService);
  const router = inject(Router);

  if( await getRoleService.ifAdminLogged()){
    console.log('ja')
    return true;
  }
  else{
    console.log('ni')
    router.navigate(['']);
    alert('implement call logout authGuard');
    return false;
  }

};
