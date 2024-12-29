import { CanActivateChildFn, Router } from '@angular/router';
import { GetRoleService } from './login/get-role.service';
import { inject } from '@angular/core';
import { LoginService } from './login/login.service';
import { filter, map } from 'rxjs';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const getRoleService = inject(GetRoleService);
  const router = inject(Router);
  const loginService = inject(LoginService);

  getRoleService.isAuthenticated$.subscribe((isAuth) => {});
  return getRoleService.isAuthenticated$.pipe(
    filter((isAutheticated) => isAutheticated !== null),
    map((isAuthenticated) => {
    //  console.log('authGuard '+ isAuthenticated);
      if (isAuthenticated) {
        return true;
      }
      router.navigate(['/']);
      return false;
    })
  );
};
